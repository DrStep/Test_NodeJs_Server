var RateLimiter = require('limiter').RateLimiter;
var monitor = require('./monitor.js');
var request = require('request');
var getKeyGlobalLimit = require('./yandex-api-keys.js').getKeyGlobalLimit;
var getKeyMethodLimit = require('./yandex-api-keys.js').getKeyMethodLimit;
var fs = require('fs');

var apiBaseUrl = "https://api.content.market.yandex.ru/v1/";

var logFile = 'yandex-api.log';
var log = fs.createWriteStream(logFile, {'flags': 'a'});

/**
 * Object hash for rate limiters
 * here will be stored individual RateLimiters for each api key
 */
var limiters = {};

var methodLimiters = {};

/**
 * Choose global rate limiter depending on api key
 * @param {String} apiKey
 * @returns {RateLimiter}
 */
function getRateLimiter(apiKey) {
    limiters[apiKey] = limiters[apiKey] || new RateLimiter(getKeyGlobalLimit(apiKey), 'second', true);

    return limiters[apiKey];
}

/**
 * Choose method rate limiter depending on method and api key
 * @param {String} apiKey
 * @param {String} method
 * @returns {RateLimiter}
 */
function getMethodRateLimiter(apiKey, method) {
    methodLimiters[apiKey] = methodLimiters[apiKey] || {};
    methodLimiters[apiKey][method] = methodLimiters[apiKey][method] || new RateLimiter(getKeyMethodLimit(apiKey, method), 'second', true);

    return methodLimiters[apiKey][method];
}

/**
 * Send request to Yandex Market API
 * @param {Object} options
 * @param {String} options.resource API resource to request see http://api.yandex.ru/market/content/doc/dg/concepts/about.xml
 * @param {Object} options.qs Object with parameters for request
 * @param {String} options.apiKey Yandex market API key
 * @param {Function} callback
 */
function apiReq(options, callback) {

    var timeStart = Date.now();
    getRateLimiter(options.apiKey).removeTokens(1, function(err, remainingGlobalRequests) {
        if(err || remainingGlobalRequests < 0) {
            callback(new Error('Too many requests, global limit for key ' + options.apiKey + ' exceeded'));
            return;
        }

        var timeGlobalLimiter = Date.now();
        monitor.timing('yandexapi.' + options.apiKey + '.ratelimiter.wait', timeGlobalLimiter  - timeStart);

        getMethodRateLimiter(options.apiKey, makeResourceStringForLog(options.resource)).removeTokens(1, function(err, remainingMethodRequests) {
            if(err || remainingMethodRequests < 0) {
                callback(new Error('Too many requests, global limit for key ' + options.apiKey + ' exceeded'));
                return;
            }

            monitor.increment('yandexapi.' + options.apiKey + '.methods.' + makeResourceStringForLog(options.resource));
            monitor.increment('yandexapi.' + options.apiKey + '.requests');

            var timeRequestSent = Date.now();
            monitor.timing('yandexapi.' + options.apiKey + '.ratelimiter.' + makeResourceStringForLog(options.resource) + '.wait', timeRequestSent - timeGlobalLimiter);

            request({
                url: apiBaseUrl + options.resource + '.json',
                qs: options.qs,
                json: true,
                pool: false,
                //maxSockets: 5000,
                timeout: 20000,
                headers: {
                    'Authorization': options.apiKey
                }
            }, function(err, request, body) {
                var timeResponseReceived = Date.now();
                if(err) {
                    logRequest(this.href, options.apiKey, err.message, timeResponseReceived - timeRequestSent);
                    monitor.increment('yandexapi.' + options.apiKey + '.request.error.' + err.code || 'unknown');
                    callback(err);
                    return;
                }

                monitor.gauge('yandexapi.' + options.apiKey + '.limit.global.remaining', request.headers['x-ratelimit-global-remaining']);
                monitor.gauge('yandexapi.' + options.apiKey + '.limit.methods.' + makeResourceStringForLog(options.resource) + '.remaining', request.headers['x-ratelimit-method-remaining']);

                monitor.timing('yandexapi.' + options.apiKey + '.request.time', timeResponseReceived - timeRequestSent);

                logRequest(this.href, options.apiKey, request.statusCode, timeResponseReceived - timeRequestSent);

                if(request.statusCode !== 200) {
                    monitor.increment('yandexapi.' + options.apiKey + '.request.error.' + request.statusCode);
                    monitor.increment('yandexapi.' + options.apiKey + '.methods.' + makeResourceStringForLog(options.resource) + '.error.' + request.statusCode);
                    var error = (body && body.errors && body.errors.length) ? new Error(body.errors[0]) : new Error('Yandex API request error (' + request.statusCode + ')');
                    callback(error);
                } else {
                    callback(null, body);
                }
            });
        });
    });
}

/**
 * Make resource string for logging to graphite
 * e.g. 'model/12345678/offers' => 'modeloffers'
 * @param {String} resource
 */
function makeResourceStringForLog(resource) {
    return resource.replace(/model\/\d+\/?(details|offers|outlets)?/, 'model$1').replace('/','');
}

function logRequest(url, apiKey, result, timing) {
    var now = new Date();
    log.write(now + ' ' + url + ' ' + apiKey + ' ' + result + ' ' + timing + '\n');
}

module.exports = apiReq;