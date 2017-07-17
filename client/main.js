Tasks = new Mongo.Collection("tasks");

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './tab.js';

if (Meteor.isClient) {
  Meteor.subscribe('privateTweets');

  // This code only runs on the client
  Template.body.helpers({
  tasks: function () {
    return Tasks.find({}, {sort: {createdAt: -1}});
  }
})
Template.body.events({
  "submit form": function (event) {
    event.preventDefault();
    var text = event.target.text.value;
    var dateObj = new Date() ;
    // 日時の各情報を取得
    var year = dateObj.getFullYear() ;	// 年
    var month = dateObj.getMonth() + 1 ;	// 月
    var date = dateObj.getDate() ;	// 日
    var hour = dateObj.getHours() ;	// 時
    var minute = dateObj.getMinutes() ;	// 分
    // 表示用に組み立てる ( → 2016年7月2日 15時57分 )
    var date = year + "年" + month + "月" + date + "日  " + hour + "時" + minute + "分" ;
    Tasks.insert({
      text: text,
      createdAt: dateObj, // current time
      userId: Meteor.userId(),
      username: Meteor.user().username
    });
    event.target.text.value = "";
  }
})
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}
