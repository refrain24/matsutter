  (function() {
  Tweets = new Mongo.Collection("tweets");

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';
import './tab.js';

if (Meteor.isClient) {
   Meteor.subscribe('privateTweets');

  // 'change #filter': function(e, template) {
  //     var selected = e.target.options[e.target.selectedIndex].value;
  //     // (1) セッションに選択値をセット
  //     Session.set('filter', selected);
  // },
  // Meteor.autorun(function() {
  //   Meteor.subscribe('privateTweets', Session.get('filter'));
  // });
  // テンプレート内のemployeesという変数の値を返す
  // Template.employeeList.tweets = function() {
  //     // コレクション内の全データを返す
  //     var cursor = Tweets.find();
  //     // カーソルの状態を監視してログを残す
  //     cursor.observe({
  //         // 検索結果が増やされた
  //         added: function(document, beforeIndex) {
  //             console.log('added(追加された位置:' + beforeIndex + ')');
  //         },
  //         // 検索結果が変更された
  //         changed: function(newDocument, atIndex, oldDocument) {
  //             console.log('changed(位置:' + atIndex + ')');
  //         },
  //         // 検索結果内でオブジェクトのインデックスが変わった
  //         moved: function(document, oldIndex, newIndex) {
  //             console.log('moved(前の位置:' + oldIndex + ' 後の位置:' + newIndex + ')');
  //         },
  //         // 検索結果からオブジェクトが減った
  //         removed: function(oldDocument, atIndex) {
  //             console.log('removed(位置:' + atIndex + ')');
  //         }
  //     });
  //     return cursor;
  // };

//   Template.tweet.events = {
//       'change #filter': function(e, template) {
//           var selected = e.target.options[e.target.selectedIndex].value;
//           Session.set('filter', selected);
//       },
// }

  // This code only runs on the client
  Template.body.helpers({
    tweets: function() {
      return Tweets.find({}, {
        sort: {
          createdAt: -1
        }
      });
    }
  })
  // Template.tweet.helpers({
  //   'tweet': function () {
  //       var uid = Meteor.userId();
  //       return ChatComments.find()
  //   }
  // });
  Template.body.events({
    'submit form': function (event) {
        event.preventDefault();
        var text = event.target.text.value;
        var username = Meteor.user().username;
        Meteor.call('tweetList',text);
        // Clear form
        event.target.text.value = "";
    }
  });
  //UserNameでログインできるようにする
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
})();
