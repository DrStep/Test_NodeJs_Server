/**
 * Created by step on 15.09.14.
 */
var request = require('request');
var fs = require('fs');
var _ = require('underscore');
var Q = require('q');
Promise   = require("q").Promise;
var apiReq = require('./api-request');

function search(optionsFunc, apiKey, str, callback) {
    apiReq({
        resource: str,
        apiKey: apiKey,
        qs: optionsFunc
    }, callback);
}

function apiRequest() {
    var shopsIdArray = [];
    var finalArr = [];
    var apiKey = "T9hQjm9W7BjYfWnsfkZZUwxRAKdklO";
    var paramStr = 'category/90616/models';
    var temp = 0;

    Q.nfcall(search, {
        geo_id : 213,
        page: 1,
        count: 30
    }, apiKey, paramStr)
        .then(function() {

            var idForSearchArray = [90616,91156,994004,278370,91153,1009492,984940,984941,8442711,7766764,91148,90613,90610,90619,90635,
                90617,90615,1596792,90618,90614,10590810,179660];
            var searchOffer = Q();
            for (var i = 0; i < idForSearchArray.length; i++) {
                console.log("4: " + i);
                searchOffer = searchOffer.then((function(i) {
                    return function() {
                        var searchId = idForSearchArray[i];
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: 1,
                            count: 30,
                            text: 'photo',
                            category_id: searchId
                        }, apiKey, 'search')
                            .then(function(res) {
                                var searchPages = Math.ceil(res.searchResult.total/30);
                                var innerPromise = Q();
                                for(var page = 1; page <= searchPages; page++) {
                                    innerPromise = innerPromise.then((function (page) {
                                        return function () {
                                            return Q.nfcall(search, {
                                                geo_id: 213,
                                                page: page,
                                                count: 30,
                                                text: 'photo',
                                                category_id: searchId
                                            }, apiKey, 'search').then(function (res) {
                                                    console.log("Inner: " + page);
                                                    for (var i = 0; i<30; i++) {
                                                        if (res.searchResult.results[i] && res.searchResult.results[i].offer) {
                                                            if (!_.contains(shopsIdArray, res.searchResult.results[i].offer.shopInfo.id)) {
                                                                shopsIdArray.push(res.searchResult.results[i].offer.shopInfo.id);
                                                                fs.appendFileSync('shopsId1', res.searchResult.results[i].offer.shopInfo.id + ",\n");
                                                            }
                                                        }
                                                    }
                                                    return res;
                                                });
                                        }
                                    })(page));
                                }
                                return innerPromise;
                            })
                    }
                })(i))

            }
            return searchOffer;
        }).then(function() {
            var shopId;
            var innerPromise = Q();
            for (shopId = temp; shopId<shopsIdArray.length; shopId++) {
                innerPromise = innerPromise.then((function (shopId) {
                    var realShopId = shopsIdArray[shopId];
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213
                        }, apiKey, 'shop/' + realShopId).then(function (res) {
                                console.log(res);
                                var url;           //delete "http://"
                                if (res.shop.url) {
                                    url = res.shop.url;
                                    if (url.indexOf("http://")) {
                                        url = res.shop.url.substr(7);
                                    }
                                    if (url.substring(0, url.indexOf('/')))
                                        url = url.substring(0, url.indexOf('/'));
                                } else if (res.shop.shopName) {
                                    url = res.shop.shopName;
                                } else if (res.shop.name) {
                                    url = res.shop.name;
                                } else {
                                    url = "Unknown shop";
                                }
                               // fs.appendFileSync('result.csv', '"' + url + '"\n');
                                if (!_.contains(finalArr, url)) {
                                    finalArr.push(url);
                                    fs.appendFileSync('resultTest1.csv', '"' + url + '"\n');
                                }
                                return res;
                            });
                    }
                })(shopId));
            }
            return innerPromise;
        })
        .catch(function(e) {
            console.log(e);
            apiRequest();
        })



    /*request({
       url: 'https://api.content.market.yandex.ru/v1/shop/1613.json',
        qs: {
            geo_id : 213,
            page: 1,
            count: 30,
            text: 'photo',
            category_id: 90616
        },
        json: true,
        pool: false,
        headers: {
            'Authorization': 'igdgl9U50Z4lVU47aWvvrmN63x4fH0'
        }
    }, function(err, res, body) {
        console.log(body);
    })*/

}

module.exports = apiRequest;