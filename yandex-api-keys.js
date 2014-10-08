var util = require('util');

var keys = {
    'default': 'igdgl9U50Z4lVU47aWvvrmN63x4fH0',
    'test2': 'oUMsN7s3P7q1PCKIURlKTo2qDCG3Vx',
    'crossrider': 'Uit44jGV622Q6IMVR9LDRwkCOXTCzh',
    'trioris': 'QuzfWp6fsY0B9TIlvep15YGHHSCf6P',
    'test': 'T9hQjm9W7BjYfWnsfkZZUwxRAKdklO',
    'dm': 'R9m9nrjss3SnOeMOOAl6bN9LlxNvcO',
    'yandex': 'bDNMR13Wknef4bEW7pVlUkdlWAyHOW'
};

var affiliateKeys = {
    1008: keys.test2, // default
    1000: keys.test2, // alawar
    1021: keys.dm, // ucoz
    //1012: keys.test, // friGate
    1037: keys.test,
    1006: keys.trioris, // trioris
    1002: keys.dm, // dm
    1004: keys.yandex, // yandex browser
    1020: keys.default,
    1031: keys.crossrider,
    1033: keys.trioris // SimilarWeb
};

var defaultAffiliate = 1008;

var defaultGlobalLimit = 10;

var defaultMethodLimits = {
    'search': 8,
    'model': 7,
    'modeldetails': 8,
    'modeloffers': 6,
    'modeloutlets': 6,
    'georegion': 8,
    'georegionsuggest': 8
};

var defaultMethodLimit = 100;

var keyGlobalLimits = {
    'igdgl9U50Z4lVU47aWvvrmN63x4fH0': 80,
    'T9hQjm9W7BjYfWnsfkZZUwxRAKdklO': 40,
    'oUMsN7s3P7q1PCKIURlKTo2qDCG3Vx': 40,
    'bDNMR13Wknef4bEW7pVlUkdlWAyHOW': 20
};

var keyMethodLimits = {
    'igdgl9U50Z4lVU47aWvvrmN63x4fH0': {
        'search': 60,
        'modeloffers': 24
    },
    'T9hQjm9W7BjYfWnsfkZZUwxRAKdklO': {
        'search': 30,
        'modeloffers': 20
    },
    'oUMsN7s3P7q1PCKIURlKTo2qDCG3Vx': {
        'search': 30,
        'modeloffers': 24
    },
    'bDNMR13Wknef4bEW7pVlUkdlWAyHO': {
        'search': 16,
        'modeloffers': 12
    }
};

function getKeyGlobalLimit(key) {
    return keyGlobalLimits[key] || defaultGlobalLimit;
}

function getKeyMethodLimit(key, method) {
    return (keyMethodLimits[key] ? (keyMethodLimits[key][method] || defaultMethodLimits[method]) : defaultMethodLimits[method]) || defaultMethodLimit;
}

function getKeySetByAffId(affId) {
    if (affId in affiliateKeys && affiliateKeys[affId]) {
        return affiliateKeys[affId];
    } else {
        return affiliateKeys[defaultAffiliate];
    }
}

function chooseApiKey(options) {
    var affId = defaultAffiliate;

    if(options.apiKeyOverride && keys[options.apiKeyOverride]) {
        return keys[options.apiKeyOverride];
    }

    if(options.affId) { // determine affiliate by affid parameter
        if(partnerNetwork.getAffiliateById(parseInt(options.affId, 10))) {
            affId = parseInt(options.affId, 10);
        }
    } else if(options.partner) {
        var affiliate = partnerNetwork.getAffiliateByName(options.partner);
        if(affiliate) {
            affId =  affiliate.id;
        }
    }

    var key = getKeySetByAffId(affId);

    console.log('Using key: %s', key);

    return key;
}

module.exports.chooseApiKey = chooseApiKey;
module.exports.getKeyGlobalLimit = getKeyGlobalLimit;
module.exports.getKeyMethodLimit = getKeyMethodLimit;
