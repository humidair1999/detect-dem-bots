var FakeRequest = function(opts) {
    this.ip = opts.ip;
    this.userAgent = opts.userAgent;
    this.referer = opts.referer;
    this.isValid = opts.isValid;

    this.template = _.template($('#request-row-template').html());

    this.initialize();
};

FakeRequest.prototype.initialize = function() {
    this.$el = $(this.template({ request: {
        ip: this.ip,
        userAgent: this.userAgent,
        referer: this.referer,
        isValid: this.isValid
    }}));

    this.attachButtonHandler();
};

FakeRequest.prototype.attachButtonHandler = function() {
    var that = this;

    this.$el.find('.make-fake-request').on('click', function(evt) {
        that.makeRequest();
    });
};

FakeRequest.prototype.makeRequest = function() {
    $.ajax({
        url: '/fake-request?ip=' + this.ip + '&user_agent=' + this.userAgent + '&referer=' + this.referer,
        type: 'get'
    }).done(function(data) {
        console.log(data);
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

        if (index < 100) {
            fakeRequests.push(new FakeRequest(opts));
        }
    });

    _.each(fakeRequests, function(element, index) {
        $('#fake-requests').append(element.$el);
    })
}).fail(function() {
    console.log('fail');
});