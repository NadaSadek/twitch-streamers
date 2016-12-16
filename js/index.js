var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var online=[];
var offline=[];
var out="";
$(function() {
  $("#all").attr('disabled', true);
 main(0); 
});

function showAll(){
  $("#all").attr('disabled', true);
  $("#online").attr('disabled', false);
  $("#offline").attr('disabled', false);

  main(0);
}
function showOnline(){
  $("#all").attr('disabled', false);
  $("#online").attr('disabled', true);
  $("#offline").attr('disabled', false);

  main(1);
}
function showOffline(){
  $("#all").attr('disabled', false);
  $("#online").attr('disabled', false);
  $("#offline").attr('disabled', true);

  main(2);
}
function main(p){
var i;
var getLink="";
out = '';
for(i = 0; i < streamers.length; i++){
   $.ajax({
 url: "https://api.twitch.tv/kraken/streams/" + streamers[i] + "?client_id=b5gjlq28sp45ygfjj19pcapm7qbjqlw?callback=?",
 headers: {
   'Client-ID': 'b5gjlq28sp45ygfjj19pcapm7qbjqlw'
 },
 error: function (jqXHR, textStatus, errorThrown) { 
   if(p == 0)
noAccount( jqXHR)
 },
success: function(data) {
  data.stream == null? (getLink = data._links.channel, p != 1 && offlineUsers(getLink.split('/').pop())): p != 2 && onlineUsers(data); 
          }
      });
    }
  }
function noAccount(data){
  var msg = JSON.parse(data.responseText).message;
  var name = msg.substring(msg.indexOf("'") + 1, msg.lastIndexOf("'"));
out += '<div class="row" id="result""><div class="col-xs-3 col-sm-4 col-md-5"><img src= "http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_PurpleonWhite.png" class="img-thumbnail img-responsive img-circle" alt="channel icon" width=80></div><div class="col-xs-9 col-sm-8 col-md-7">' + name + "<div style='color:red;'>Account doesn't exist</div></div></div></div></div>"; 
$("#users").html(out);
}
//offline -> stream = null
function offlineUsers(channel){
  $.ajax({
 url: "https://api.twitch.tv/kraken/channels/" + channel + "?client_id=b5gjlq28sp45ygfjj19pcapm7qbjqlw?callback=?",
 headers: {
   'Client-ID': 'b5gjlq28sp45ygfjj19pcapm7qbjqlw'
 },
 success: function(data) {
   out += '<div class="row" id="result"><div class="col-xs-3 col-sm-4 col-md-5"><img src='+ data.logo+' class="img-thumbnail img-responsive img-circle" alt="channel icon" width=80></div><div class="col-xs-9 col-sm-8 col-md-7">' + "<a target='_blank' href=" + data.url + ">" +  channel + "</a></br>" + "<div style='color:red;'>offline</div></div></div>"; 
$("#users").html(out);
}
   
}); 
}
// online
function onlineUsers(data){
  var url = data.stream.channel.url;
  var  streamingInfo = data.stream.game;
  var  name = data.stream.channel.name;
  var icon = data.stream.channel.logo;
  out += '<div class="row" id="result"><div class="col-xs-3 col-sm-4 col-md-5"><img src='+ icon+' class="img-thumbnail img-responsive img-circle" alt="channel icon" width=80></div><div class="col-xs-9 col-sm-8 col-md-7">' + "<a target='_blank' href=" + url + ">" +  name + "</a></br>" + "<div style='color:green;'>" + "streaming " + streamingInfo  + "</div></div></div>";
$("#users").html(out);
}