  (function() {
  Tweets = new Mongo.Collection("tweets");

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';


// This code only runs on the client
if (Meteor.isClient) {
  var img = 'img/smile.png';
  Meteor.subscribe('privateTweets');

  Template.body.helpers({
    tweets: function() {
      return Tweets.find({}, {
        sort: {
          createdAt: -1
        }
      });
    }
  })
  Template.body.events({
    'submit form': function(event) {
      event.preventDefault();
      var text = event.target.text.value;
      var username = Meteor.user().username;
      var img = 'img/smile.png';
      Meteor.call('tweetList', text);
      // Clear form
      event.target.text.value = "";
      var uid = this.userId;
      console.log(Tweets.find({
        userId: uid
      }));
    }
  });
  //UserNameでログインできるようにする
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
})();
