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
        var imgScore = function(scoreInt) {
          // if (scoreInt > 0.5) {
          //   return 'img/001-happy-2.png';
          // } else if (0.5 > scoreInt > 0.2) {
          //   return 'img/004-happy-1.png';
          // } else if (0.2 > scoreInt > -0.2) {
          //   return 'img/005-happy.png'
          // } else if (-0.2 > scoreInt > -0.5) {
          //   return 'img/003-sad.png'
          // } else {
          //   return 'img/002-shouting.png';
          // }
          switch (scoreInt) {
            case 1.0:
            case 0.9:
             case 0.8:
             case 0.7:
               return 'img/001-happy-2.png';
             case 0.6:
             case 0.5:
             case 0.4:
             case 0.3:
             case 0.2:
               return 'img/004-happy-1.png';
             case 0.1:
             case 0:
             case -0.1:
               return 'img/005-happy.png';
             case -0.2:
             case -0.3:
             case -0.4:
             case -0.5:
               return 'img/003-sad.png';
             case -0.6:
             case -0.7:
             case -0.8:
             case -0.9:
             case -1.0:
               return 'img/002-shouting.png'
             default:
               return 'img/005-happy.png'
          }
        };
        Tweets.insert({
          text: text,
          userId: Meteor.userId(),
          username: Meteor.user().username,
          createdAt: new Date(),
          score: result.data.documentSentiment.score,
          imgScore: imgScore(parseFloat(result.data.documentSentiment.score))
        });
      });
    }
  });
}
