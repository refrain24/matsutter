  (function() {
  Tweets = new Mongo.Collection("tweets");

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

// var img = 'img/001-happy-2.png';
// var img = 'img/004-happy-1.png';
// var img = 'img/005-happy.png';
// var img = 'img/003-sad.png';
// var img = 'img/002-shouting.png';

// var img = [
//   'img/004-happy-1.png','img/005-happy.png','img/003-sad.png'];
// var num = Math.floor(Math.random() * img.length);
// var usrimg = img[num];




// This code only runs on the client
if (Meteor.isClient) {
  Meteor.subscribe('privateTweets');

  Template.body.helpers({
    // img: img,
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
      // var img = img;
      Meteor.call('tweetList', text);
      // Clear form
      event.target.text.value = "";
      var uid = this.userId;
    }
  });
  //UserNameでログインできるようにする
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
})();
