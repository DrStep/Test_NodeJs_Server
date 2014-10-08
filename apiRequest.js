/**
 * Created by step on 15.09.14.
 */
var request = require('request');
var fs = require('fs');
var _ = require('underscore');
var Q = require('q');
Promise   = require("q").Promise;
var apiReq = require('./api-request');


var MongoClient = require('mongodb').MongoClient;
var collection;
var y = 0;

/*MongoClient.connect('mongodb://10.0.2.119/urlvisit', function(err, db) {
    if(err) throw err;
    collection = db.collection('domains');
});*/

function search(optionsFunc, apiKey, str, callback) {
    apiReq({
        resource: str,
        apiKey: apiKey,
        qs: optionsFunc
    }, callback);
}

function apiRequest(req, response, next) {
    var resultArray = [];
    var modelsIdArray = [];
    var offersIdArray = [];
    var shopsIdArray = [];
    var apiKey = "T9hQjm9W7BjYfWnsfkZZUwxRAKdklO";
    var paramStr = 'category/90616/models';
    var options = {
        geo_id : 213,
        page: 1,
        count: 30
    };
    //response.jsonp(0);
    Q.nfcall(search, {
        geo_id : 213,
        page: 1,
        count: 30
    }, apiKey, paramStr)
        /*.then(function(res) {   //90616
            console.log(paramStr);
            var pages = Math.ceil(res.models.total/30);
            var page;

            var promise = Q();
            for(var page = 1; page < pages; page++) {
                promise = promise.then((function (page) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: page,
                            count: 30
                        }, apiKey, paramStr).then(function (res) {
                                console.log("1: " + page);
                                for (var i = 0; i<30; i++) {
                                    if (res.models.items[i]) {
                                        modelsIdArray.push(res.models.items[i].id);
                                    }
                                }
                                return res;
                            });
                    }
                })(page));
            }

            return promise;
        })
        .then(function(res) {     //91148
            var paramStr1 = 'category/91148/models';
            var pages = Math.ceil(res.models.total/30);
            var page;

            var promise = Q();
            for(var page = 1; page < pages; page++) {
                console.log("02: " + page);
                promise = promise.then((function (page) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: page,
                            count: 30
                        }, apiKey, paramStr1).then(function (res) {
                                for (var i = 0; i<30; i++) {
                                    if (res.models.items[i]) {
                                        modelsIdArray.push(res.models.items[i].id);
                                    }
                                }
                                return res;
                            });
                    }
                })(page));
            }

            return promise;
        }).then(function(res) {     //90613
        var paramStr1 = 'category/90613/models';
        var pages = Math.ceil(res.models.total/30);
        var page;

        var promise = Q();
        for(var page = 1; page < pages; page++) {
            console.log("03: " + page);
            promise = promise.then((function (page) {
                return function () {
                    return Q.nfcall(search, {
                        geo_id: 213,
                        page: page,
                        count: 30
                    }, apiKey, paramStr1).then(function (res) {
                            for (var i = 0; i<30; i++) {
                                if (res.models.items[i]) {
                                    modelsIdArray.push(res.models.items[i].id);
                                }
                            }
                            return res;
                        });
                }
            })(page));
        }

        return promise;
    }).then(function(res) {     //90619
            var paramStr1 = 'category/90619/models';
            var pages = Math.ceil(res.models.total/30);
            var page;

            var promise = Q();
            for(var page = 1; page < pages; page++) {
                console.log("04: " + page);
                promise = promise.then((function (page) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: page,
                            count: 30
                        }, apiKey, paramStr1).then(function (res) {
                                for (var i = 0; i<30; i++) {
                                    if (res.models.items[i]) {
                                        modelsIdArray.push(res.models.items[i].id);
                                    }
                                }
                                return res;
                            });
                    }
                })(page));
            }

            return promise;
        }).then(function(res) {     //90635
            var paramStr1 = 'category/90635/models';
            var pages = Math.ceil(res.models.total/30);
            var page;

            var promise = Q();
            for(var page = 1; page < pages; page++) {
                console.log("05: " + page);
                promise = promise.then((function (page) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: page,
                            count: 30
                        }, apiKey, paramStr1).then(function (res) {
                                for (var i = 0; i<30; i++) {
                                    if (res.models.items[i]) {
                                        modelsIdArray.push(res.models.items[i].id);
                                    }
                                }
                                return res;
                            });
                    }
                })(page));
            }

            return promise;
        }).then(function(res) {     //90617
            var paramStr1 = 'category/90617/models';
            var pages = Math.ceil(res.models.total/30);
            var page;

            var promise = Q();
            for(var page = 1; page < pages; page++) {
                console.log("06: " + page);
                promise = promise.then((function (page) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: page,
                            count: 30
                        }, apiKey, paramStr1).then(function (res) {
                                for (var i = 0; i<30; i++) {
                                    if (res.models.items[i]) {
                                        modelsIdArray.push(res.models.items[i].id);
                                    }
                                }
                                return res;
                            });
                    }
                })(page));
            }

            return promise;
        }).then(function(res) {     //1596792
            var paramStr1 = 'category/1596792/models';
            var pages = Math.ceil(res.models.total/30);
            var page;

            var promise = Q();
            for(var page = 1; page < pages; page++) {
                console.log("07: " + page);
                promise = promise.then((function (page) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: page,
                            count: 30
                        }, apiKey, paramStr1).then(function (res) {
                                for (var i = 0; i<30; i++) {
                                    if (res.models.items[i]) {
                                        modelsIdArray.push(res.models.items[i].id);
                                    }
                                }
                                return res;
                            });
                    }
                })(page));
            }

            return promise;
        })

//---------------------------------------------------------------------------------
        //Analyse  of modelArray
        .then(function() {
            console.log("Number of elements in modelsIdArr:" + modelsIdArray.length);
            var paramStrOffers;             //modelsIdArr, need to create offersIdArr
            var promiseOffers = Q();
            for (var i = 0; i < modelsIdArray.length; i++) {
                console.log("2: " + i);
                promiseOffers = promiseOffers.then((function(i) {
                    return function() {
                        var offerId = modelsIdArray[i];
                        return Q.nfcall(search, {
                            geo_id: 213,
                            page: 1,
                            count: 30
                        }, apiKey, 'model/' + modelsIdArray[i] +'/offers')
                            .then(function(res) {
                                var offersPages = Math.ceil(res.offers.total/30);
                                var paramStrOffers = 'model/' + offerId +'/offers';
                                var innerPromise = Q();
                                console.log('ParamstrOffers: ' + paramStrOffers + ', Offerspagfe: ' + offersPages);
                                for(var page = 1; page <= offersPages; page++) {
                                    console.log("Inner: " + page);
                                    innerPromise = innerPromise.then((function (page) {
                                        return function () {
                                            return Q.nfcall(search, {
                                                geo_id: 213,
                                                page: page,
                                                count: 30
                                            }, apiKey, paramStrOffers).then(function (res) {
                                                    for (var i = 0; i<30; i++) {
                                                        if (res.offers.items[i]) {
                                                            fs.appendFile('text.txt', '"' + res.offers.items[i].id + '"' + '\n', function(){});
                                                            offersIdArray.push(res.offers.items[i].id);
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
            return promiseOffers;
        }).then(function(res) {
            console.log("Number of elements in offersIdArr:" + offersIdArray.length);
            var lastpromise = Q();
            for(var id = 0; id < offersIdArray.length; id++) {
                lastpromise = lastpromise.then((function (id) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213
                        }, apiKey, 'offer/' + offersIdArray[id]).then(function (res) {
                                if (res.offer.shopInfo.shopName) {
                                    if (!_.contains(resultArray, res.offer.shopInfo.shopName)) {
                                        resultArray.push(res.offer.shopInfo.shopName);
                                        fs.appendFileSync('result.csv', '"' + res.offer.items[id].id + '"' + '\n');
                                    }
                                }
                                return res;
                            });
                    }
                })(id));
            }

            return lastpromise;
        })*/
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
            console.log("ShopIdArray starts");
            for (shopId = 0; shopId<shopsIdArray.length; shopId++) {
                console.log("searchId Loop" + shopId);
                innerPromise = innerPromise.then((function (shopId) {
                    return function () {
                        return Q.nfcall(search, {
                            geo_id: 213
                        }, apiKey, 'shop/' + shopId).then(function (res) {
                                fs.appendFileSync('result.csv', res.shop.shopName);
                                return res;
                            });
                    }
                })(shopId));
            }
            return innerPromise;
        }).catch(function(e) {
            next(new Error('Probl: ' + e));
        })



    /*request({
        url: 'https://api.content.market.yandex.ru/v1/category/90611/children.json',
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
        response.jsonp(body);
    })*/



}

module.exports = apiRequest;