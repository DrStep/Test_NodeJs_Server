var http = require('http');
var os = require('os');
var _ = require('underscore');

var StatsD = require('node-statsd').StatsD,
    statsd = new StatsD({
        host: '192.168.1.90',
        prefix: 'api.suggest.' + os.hostname() + '.',
        globalize: true
    });

var ticks = [];
setInterval(function() {
    ticks.push(Date.now());
}, 10);

setInterval(function() {
    if(ticks.length < 2) {
        return;
    }

    var intervals =  [];

    for(var i = 0; i < ticks.length-1; i++) {
        intervals[i] = ticks[i+1]-ticks[i];
    }

    var avg = intervals.reduce(function(memo, num){ return memo + num/ticks.length; }, 0);
    var max = _.max(intervals);
    var p90t = intervals[Math.floor(intervals.length*0.9)];

    statsd.timing('performance.responsiveness.avg', avg);
    statsd.timing('performance.responsiveness.p90t', p90t);
    statsd.timing('performance.responsiveness.max', max);

    ticks.length=0;
}, 1000);

module.exports = statsd;