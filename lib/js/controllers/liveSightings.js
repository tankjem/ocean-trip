angular
  .module("OceanTripApp")
  .controller("LiveSightingsController", LiveSightingsController);

LiveSightingsController.$inject = ["$window"]
function LiveSightingsController($window){

  var socket = $window.io();

  socket.on("connect", function(){
    console.log("connected");
  });

  socket.on("tweets", function(tweet){
    $('#tweets-stream').prepend('<div class="tweet"><img src="' + tweet.user_profile_image + '" class="avatar pull-left"/><div class="names"><span class="full-name">' + tweet.name + ' </span></div><div class="contents"><span class="text">' + tweet.text + '</span></div></div>');

  });

}