import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
  Tweets = new Mongo.Collection("tweets");
  // code to run on server at startup
});
if (Meteor.isServer) {
        Meteor.publish('privateTweets',function(){
                var uid=this.userId;
                return Tweets.find({})
        });
        // Meteor.publish('publicTweets',function(){
        //         var uid=this.userId;
        //         return Tweets.find({})
        // });
        Meteor.methods({
          'tweetList': function(text) {
            var uid = this.userId;

            // 感情分析api呼び出し
            var result = HTTP.call('POST', 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=env.API_KEY', {
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
                score: result.data.documentSentiment.score
              });
            });
          }
        });

        // Meteor.publish("privateTweets", function (filter) {
        //     // クライアントから送信された検索条件に応じて，処理が変わる
        //     // 検索条件の指定なし
        //     if (!filter) {
        //         return Tweets.find(); // everything
        //     }
        //     var minAge = parseInt(filter);
        //     var uid=this.userId;
        //     switch (minAge) {
        //     // 60歳以上
        //     case 60:
        //         return Tweets.find({userId:uid});
        //     default:
        //         return Tweets.find({userId:uid});
        //     }
        // });
}
