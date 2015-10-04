var express = require('express');
var cors = require('cors');
var twitter = require('twitter');
var app = express();
var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKER_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKER_SECRET
});

app.set('port', (process.env.PORT || 5000));

app.get('/:q', cors(), function(req, response) {
    client.get('search/tweets', {
        q: '#' + req.params.q,
        count: 10,
    }, function(error, tweets, res) {
        response.send(tweets);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
