var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

// points to directories that contain static pages. 
app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.static('js'));
var names = ["testname", "testname2"];
var usernames = ["test","test2"];
var passwords = ["test","test2"];
var emails = ["test@test.com","test2@test.com"];
var addresses = ["test address", "test address 2"];
var levels = ["3","2"];
var subscibed = ["true", "false"]

app.get('/login', function (req, res) {
		var username = req.query.username;
		var password = req.query.password;
		var usernameIndex = usernames.indexOf(username);
		var passwordIndex = passwords.indexOf(password);
		var email = emails[usernameIndex];
		// res.send(usernames[usernames.length - 1]);
		if(usernameIndex  > -1 && usernameIndex === passwordIndex){
			
			$ = cheerio.load(fs.readFileSync('public/userpage.html'));
		    $('p.username').text(username);
		    $('p.email').text(email);
		    fs.writeFileSync(path.join(process.cwd(), 'public/userpage.html'), $.html(), {'encoding': 'utf-8'});

		    $ = cheerio.load(fs.readFileSync('public/header.html'));
		    var loginHeader = $('<header><a href="http://facebook.com"><img src="img/fb_logo.png" height="20" width="20" class="left"></a><a href="http://twitter.com"><img src="img/twitter_logo.png" height="20" width="20" class="left"></a><div class="right"><form id="login_out" action="/logout" method="GET"><div class="left"><p for="name">Welcome <p class="username"></p></p></div><div class="left"><button type="submit" id="login_form_button">Logout</button></div></form></div></header>')
		    $("header").replaceWith(loginHeader);
		    $("p.username").text(username + " ");
		    fs.writeFileSync(path.join(process.cwd(), 'public/header.html'), $.html(), {'encoding': 'utf-8'});
			console.log("success");
			console.log(username);
			console.log(password);
			res.redirect('/userpage.html');
		}else{
			console.log("login failed");
			console.log(username);
			console.log(password);
	    	res.redirect('back');
		}

})

app.get('/logout', function (req, res) {
	$ = cheerio.load(fs.readFileSync('public/header.html'));
	var loginHeader = $('<header><a href="http://facebook.com"><img src="img/fb_logo.png" height="20" width="20" class="left"></a><a href="http://twitter.com"><img src="img/twitter_logo.png" height="20" width="20" class="left"></a><div class="right"><form id="login_form" action="/login" method="GET"><div class="left"><label for="name">Username:</label><input type="text" id="login_username" size="10" name="username"></div><div class="left"><label for="password">&#xA0; Password:</label><input type="password" id="login_password" size="10" name="password"></div><div class="left"><button type="submit" id="login_form_button">Login</button></div><p class="right"><a href="/register.html">&#xA0; Register.</a></p></form></div></header>');
	$("header").replaceWith(loginHeader);
	fs.writeFileSync(path.join(process.cwd(), 'public/header.html'), $.html(), {'encoding': 'utf-8'});
	res.redirect('/index.html');
})


app.get('/register', function (req, res) {
		var name = req.query.name;
		var username = req.query.username;
		var password = req.query.password;
		var email = req.query.email;
		var index = usernames.indexOf(username);
		var emailIndex = emails.indexOf(email);
		if(index > -1 || emailIndex > -1){
		console.log("fail");
		res.redirect('/register.html');

	}else{
		names.push(name);
		usernames.push(username);
		passwords.push(password);
		emails.push(email);
		console.log(username);
		console.log(index);
		console.log(email);
		console.log(emailIndex);
		$ = cheerio.load(fs.readFileSync('public/userpage.html'));
	    $('p.username').text(username);
	    $('p.email').text(email);
	    fs.writeFileSync(path.join(process.cwd(), 'public/userpage.html'), $.html(), {'encoding': 'utf-8'});
	    res.redirect('/userpage.html');
	}


})


app.get('/contact', function (req, res) {
	var firstName = req.query.firstname;
	var lastName = req.query.lastname;
	var email = req.query.Email;
	var message = req.query.message;
 	$ = cheerio.load(fs.readFileSync('public/contactDisplay.html'));
    $('p.name').text(firstName + " " + lastName);
    $('p.email').text(email);
    $('p.message').text(message);
    $.html();
    console.log("cheerio ran");
    fs.writeFileSync(path.join(process.cwd(), 'public/contactDisplay.html'), $.html(), {'encoding': 'utf-8'});
    res.redirect('/contactDisplay.html');
    console.log("finished");
    console.log(message);
})

app.get('/subscibe', function (req, res) {
	var name = req.query.name;
	var email = req.query.email;
	var subLevel = req.query.subscriptionLevel;
	var address = req.query.addLine1 + " "+ req.query.addLine2 + " " + req.query.county + " " + req.query.addLine1 + " " + req.query.postcode;
	var paymentMethod = req.query.paymentMethod;
	var cardNumber = req.query.cardNumber;
	var cardCode = req.query.cardCode;


 	$ = cheerio.load(fs.readFileSync('public/orderInfo.html'));
    $('p.username').text(name);
    $('p.email').text(email);
    $('p.address').text(address);
    $('p.level').text(subLevel);
    $('p.cardNumber').text(cardNumber);
    $.html();
    console.log("cheerio ran");
    fs.writeFileSync(path.join(process.cwd(), 'public/orderInfo.html'), $.html(), {'encoding': 'utf-8'});
    res.redirect('/orderInfo.html');
    console.log("finished");
})

// set up the express server to listen on port 8081
var server = app.listen(8081, function () {
  // extract address and port for logging (not functional)
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  //-------------------------------------
})