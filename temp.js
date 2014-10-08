/**
 * Created by step on 03.10.14.
 */
function apiRequest(req, response) {
    var resultArray = [];
    var apiKey = "igdgl9U50Z4lVU47aWvvrmN63x4fH0";
    var paramStr = 'category/90607/children';
    var x = null;
    var options = {
        geo_id : 213,
        page: 1,
        count: 30
    };
    var options2 = {
        geo_id : 213,
        page: 1,
        count: 30
    };

    function iter(arr) {
        var flag = true;
        var i = 0;
        while (i<arr.length) {
            var id = arr[i];
            paramStr = 'category/' + arr[i] +"/children";
            if (flag) {
                flag = false;
                console.log(paramStr);
                Q.nfcall(search, options, apiKey, paramStr) //запрос на подкатегории
                    .then(function(res) {
                        if (res.categories.total) {     //если есть ещё подкатегории
                            console.log("Bonus categoties exists");
                            var idArray = [];
                            res.categories.items.forEach(function(item) {
                                idArray.push(item.id);      //массив айдишников
                            })
                            iter(idArray);
                        } else {            //если нет подкатегорий выуживаем модели
                            paramStr = 'category/' + id +"/models";
                            console.log(paramStr);
                            var page = 1,
                                pages = 100;
                            while (page <= pages) {
                                options.page = page;
                                Q.nfcall(search, options, apiKey, paramStr)     //запрос на модели
                                    .then(function(res) {
                                        pages = res.models.total/30;
                                        pages = Math.floor(pages);
                                        var left = res.models.total - pages;
                                        if (left) {
                                            pages++;
                                        }
                                        var modelsIdArr = [];
                                        res.models.items.forEach(function(modelId) {
                                            modelsIdArr.push(modelId);          //массив айдишников модели
                                        })
                                        return modelsIdArr;
                                    }).then(function(modelsArr) {
                                        var flag2 = true;
                                        var j = 0;
                                        while (j < modelsArr.length) {
                                            var id = modelsArr[j];
                                            paramStr = 'model/' + modelsArr[j] +"/offers";
                                            if (flag2) {
                                                flag2 = false;
                                                var page2 = 1,
                                                    pages2 = 100;
                                                while (page2 <= pages2) {
                                                    options2.page = page2;
                                                    Q.nfcall(search, options, apiKey, paramStr)         //запрос на оферы модели
                                                        .then(function(res) {
                                                            pages2 = res.offers.total/30;
                                                            pages2 = Math.floor(pages);
                                                            var left = res.models.total - pages2;
                                                            if (left) {
                                                                pages2++;
                                                            }
                                                            var offersIdArr = [];
                                                            res.offers.items.forEach(function(offer) {
                                                                offersIdArr.push(offer);            //массив айдишников офера
                                                            })
                                                            return offersIdArr;
                                                        })
                                                        .then(function(offersArr) {
                                                            var flag3 = true;
                                                            var k = 0;
                                                            while (k < offersArr.length) {
                                                                var id = offersArr[k];
                                                                paramStr = 'offer/' + offersArr[k];
                                                                if (flag3) {
                                                                    flag3 = false;
                                                                    Q.nfcall(search, options, apiKey, paramStr)     //запрос на конкретные офферы
                                                                        .then(function(res) {
                                                                            if (!_.contains(resultArray, res.offer.shopInfo.url)) {
                                                                                resultArray.push(res.offer.shopInfo.url);
                                                                                fs.appendFile('resultsFinal.csv', '"' + res.offer.shopInfo.url + '"' + ',', function(){});
                                                                            }
                                                                            i++;
                                                                            j++;
                                                                            k++;
                                                                            flag = true;
                                                                            flag2 = true;
                                                                            flag3 = true;
                                                                        })
                                                                }
                                                            }
                                                        })
                                                    page2++;
                                                }
                                            }
                                        }
                                    })
                                page++;
                            }
                        }
                    })
            }
        }
    }

    Q.nfcall(search, options, apiKey, paramStr)
        .then(function(res) {
            //console.log(res);
            //response.jsonp(res);
            var idArray = [];
            res.categories.items.forEach(function(item) {
                idArray.push(item.id);
            })
            return idArray;
        })
        .then(function(idArray) {iter(idArray);})

    /*request({
     url: 'https://api.content.market.yandex.ru/v1/category/166068/models.json',
     qs: {
     geo_id : 213,
     page: 1,
     count: 30
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