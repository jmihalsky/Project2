var connection = require("./connection.js");

var orm = {
    all_posts: function (qryres) {
        var qrystrg = "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID";
        connection.query(qrystrg, function (err, res) {
            if (err) throw err;

            qryres(res);
        });
    },
    city_search: function (schcity, qryres) {
        var qrystrg = "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID where Posts.City like '%" + schcity + "%'";
        connection.query(qrystrg, function (err, res) {
            if (eff) throw err;
            qryres(res);
        });
    },
    zip_search: function (schzip, qryres) {
        var qrystrg = "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID where Posts.Zip = " + schzip;
        connection.query(qrystrg, function (err, res) {
            if (eff) throw err;
            qryres(res);
        });
    },
    post_info: function (post_id, qryres) {
        var qrystrg = "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID where Posts.PostID = " + post_id;
        connection.query(qrystrg, function (err, res) {
            if (err) throw err;
            qryres(res);
        });
    }
};

module.exports = orm;