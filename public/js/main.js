var FakeRequest = function(opts) {
    this.ip = opts.ip;
    this.userAgent = opts.userAgent;
    this.referer = opts.referer;
    this.isValid = opts.isValid;
};

FakeRequest.prototype.makeRequest = function() {
    $.ajax({
        url: '/make-request',
        type: 'get'
    }).done(function() {
        console.log('done');
    }).fail(function() {
        console.log('fail');
    });
};

var fakeRequests = [];

$.ajax({
    url: '/train',
    type: 'get'
}).done(function(data) {
    _.each(data, function(element, index) {
        var opts = {
            ip: element[0],
            userAgent: element[1],
            referer: element[2],
            isValid: element[3]
        };

        fakeRequests.push(new FakeRequest(opts));
    });

    _.each(fakeRequests, function(element, index) {
        element.makeRequest();
    })
}).fail(function() {
    console.log('fail');
});