var Twitter = require('twitter');
var config = require('./config.js');
var meh = new Twitter(config);

(function() {
  var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
  }
  
  
  
  meh.get('search/tweets', params, function(err, data, response) {
    if(!err){
      // console.log(data)
    } else {
      console.log(err);
    }
  });
  
  setInterval(function() {
    meh.post('statuses/update', {status: 'I Love Twitter'})
    .then(function (tweet) {
      console.log(tweet);
    })
    .catch(function (error) {
      throw error;
    })
  }, 10000);
}())