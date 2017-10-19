var Twit = require('twit');
// var config = {
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token: process.env.ACCESS_TOKEN,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET
// }
var config = require('./config');
var client = new Twit(config);
var oldFollowers = 0;

// process.env.NODE_ENV=production
//also can do track: ['bananas', 'oranges', 'strawberries']
// var stream = client.stream('statuses/filter', {track: 'Development'});
var userStream = client.stream('user');


// stream.on('tweet', function (tweet) {
//  console.log(tweet.text)
// });

// userStream.on('follow', function(msg) {
//   console.log(msg.source.screen_name);
//   client.post('statuses/update', { status: `Thanks for the follow ${msg.source.screen_name}` }, function(err, data, response) {
//     console.log(data)
//   })
// })

/* Sends a messsage every 12 hours */
setInterval(function() {
  var time = new Date();
  client.get('followers/ids', { screen_name: 'CeejayBarber' },  function (err, data, response) {
    //TODO trim back of string before posting
    if (err) console.log(err);
    console.log(data.ids.length);
    client.post('direct_messages/new', {user: 'CeejayBarber', text: `${time.toString()} \nCurrent followers: ${data.ids.length}\nDifference: ${data.ids.length - oldFollowers}`}, function(err) {
      if (err) console.log(err);
      oldFollowers = data.ids.length;
    })
  })
}, 1000 * 60 * 60 * 12);







// userStream.on('unfollow', function(msg) {
//   console.log(msg);
// })

// T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
//   console.log(data)
// })

// post a tweet with media
//
// var b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' })

// // first we must post the media to Twitter
// T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//   // now we can assign alt text to the media, for use by screen readers and
//   // other text-based presentations and interpreters
//   var mediaIdStr = data.media_id_string
//   var altText = "Small flowers in a planter on a sunny balcony, blossoming."
//   var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

//   T.post('media/metadata/create', meta_params, function (err, data, response) {
//     if (!err) {
//       // now we can reference the media and post a tweet (media will attach to the tweet)
//       var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

//       T.post('statuses/update', params, function (err, data, response) {
//         console.log(data)
//       })
//     }
//   })
// })



//Based on Location

// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

// var stream = T.stream('statuses/filter', { locations: sanFrancisco })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })