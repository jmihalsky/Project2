var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/slist_routes.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("Listening on port: http://localhost:" + PORT);
});

// Passport Usage
var passport = require("passport");

var session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
  })
);

var localStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new localStrategy(
    {
      passReqToCallback: true,
      usernameField: "username"
    },
    function(req, username, password, done) {
      console.log("called local");
      pg.connect(
        connectionString,
        function(err, client) {
          console.log("called local - pg");

          var user = {};

          var query = client.query("SELECT * FROM users WHERE username = $1", [
            username
          ]);

          query.on("row", function(row) {
            console.log("User obj", row);
            console.log("Password", password);
            user = row;
            if (password == user.password) {
              console.log("match!");
              done(null, user);
            } else {
              done(null, false, {
                message: "Incorrect username and password."
              });
            }
          });

          // After all data is returned, close connection and return results
          query.on("end", function() {
            client.end();
          });

          // Handle Errors
          if (err) {
            console.log(err);
          }
        }
      );
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("called deserializeUser");
  pg.connect(
    connection,
    function(err, client) {
      var user = {};
      console.log("called deserializeUser - pg");
      var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

      query.on("row", function(row) {
        console.log("User row", row);
        user = row;
        done(null, user);
      });

      // After all data is returned, close connection and return results
      query.on("end", function() {
        client.end();
      });

      // Handle Errors
      if (err) {
        console.log(err);
      }
    }
  );
});
