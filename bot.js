//Require pulls from github repositories
var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(Hello)|(Hi)/

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(true);
    this.res.end();
  }else {
    console.log("You don't own me");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(flag) {
  var botResponse, options, body, botReq, quoteBank;

  quoteBank = [];

  var quote = quoteBank[Math.floor(Math.random() * quoteBank.length)];

  botResponse = quote;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
  console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
