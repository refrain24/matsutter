import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
  Tweets = new Mongo.Collection("tweets");
});
// code to run on server at startup
if (Meteor.isServer) {
  Meteor.publish('privateTweets', function() {
    var uid = this.userId;
    return Tweets.find({})
  });
  Meteor.methods({
    'tweetList': function(text) {
      var uid = this.userId;

      // 感情分析api呼び出し
      var url = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + process.env.API_KEY;
      var result = HTTP.call('POST', url, {
        data: {
          "encodingType": "UTF8",
          "document": {
            "type": "PLAIN_TEXT",
            "content": text
          }
        }
      }, function(error, result) {
        Tweets.insert({
          text: text,
          userId: Meteor.userId(),
          username: Meteor.user().username,
          createdAt: new Date(),
          score: result.data.documentSentiment.score
        });
      });
    }
  });
}
