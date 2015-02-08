// TODO: if any param is missing, auto-bot
// TODO: if IP address is local, generally bot
// TODO: if referrer is localhost, generally bot
// TODO: ratings system that takes variety of criteria into consideration

var botPoints = 0;

var checkForParams = function(params) {
    if (!params.user_agent) {
        console.log('NO USER AGENT');

        botPoints++;
    }

    if (!params.referer) {
        console.log('NO REFERRER');

        botPoints++;
    }
};

var filterLocalIps = function(ipAddress) {
    var ipArray = ipAddress.split('.'),
        ipRoot = ipArray[0];

    if (ipRoot === '192' || ipRoot === '193') {
        console.log('INVALID IP');

        botPoints++;
    }
};

var checkIfLocalhost = function(referrer) {
    if (referrer.indexOf('localhost') > -1) {
        console.log('REQUEST FROM LOCALHOST');
        
        botPoints++;
    }
};

module.exports = function(params) {
    console.log(params);

    checkForParams(params);

    filterLocalIps(params.ip);

    checkIfLocalhost(params.referer);

    if (botPoints < 3) {
        return 204;
    }
    else {
        return 403;
    }
};