var express = require("express.io");
var app = express();
app.http().io();
var port = 3000;

console.log("server started on port: " + port);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.io.route('ready', function(req){
	req.io.join(req.data);
	app.io.room(req.data).broadcast('announce',{
		message: 'New Client in the ' + req.data + ' room.'
	})
})

app.io.route('send', function(req){
	app.io.room(req.data.room).broadcast('message', {
		message: req.data.message,
		author: req.data.author
	});
})




app.listen(port);