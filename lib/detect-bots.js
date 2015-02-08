// TODO: if any param is missing, auto-bot DONE
// TODO: if IP address is local, generally bot DONE
// TODO: if referrer is localhost, generally bot DONE
// TODO: ratings system that takes variety of criteria into consideration
// MAYBE: 300 status code???
// TODO: User Agent but no other info:
// TODO: LINUX: Flag User Agent
// TODO: BSD User agent
// TODO: BOT User Agent
// 127.0.0.1 referer
// Referers that may not be real i.e faceboook.com
// Repeated requests from the same IP, especially if other criteria is flagged
// Small point flag - foriegn referrer

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
    if (referrer.indexOf('localhost') > -1 || referrer.indexOf('127.0.0.1') > -1) {
        console.log('REQUEST FROM LOCALHOST');

        botPoints++;
    }
};

var checkUserAgentValidity = function(userAgent){
    if (userAgent.indexOf(')') > -1){
        testArray = userAgent.split(')')
     // test that userAgent 1 != nil
        if(testArray[1]){
            console.log("test some other shit")
        }else{
            botPoints++;
        }

    }else{
        botPoints++;
    }
};

module.exports = function(params) {
    console.log(params);

    checkForParams(params);

    filterLocalIps(params.ip);

    checkIfLocalhost(params.referer);

    checkUserAgentValidity(params.user_agent);

    if (botPoints < 3) {
        return 204;
    }
    else {
        return 403;
    }
};