import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Tasks = new Mongo.Collection("tasks");
  // code to run on server at startup
});
if (Meteor.isServer) {
        Meteor.publish('privateTweets',function(){
                var uid=this.userId;
                return Tasks.find({userId:uid})
        });
        Meteor.publish('publicTweets',function(){
                var uid=this.userId;
                return Tasks.find({})
        });
}
