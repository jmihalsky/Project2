var express = require("express");
var session = require("express-session");
var PORT = process.env.PORT || 3000;
var app = express();
var env = require("dotenv").config();

var passport = require("./config/passport");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/slist_routes.js");

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, function () {
  console.log("Listening on port: http://localhost:" + PORT);
});