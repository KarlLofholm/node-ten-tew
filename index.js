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
var tweetList = [];
var tweetQuery = "Javascript";

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index', {
        tweetQuery: tweetQuery,
        tweets: tweetList
    });
});

client.get('search/tweets', {
    q: '#' + tweetQuery,
    count: 10,
}, function(error, tweets, res) {
    tweetList = tweets.statuses;
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
