var connection = require("./connection.js");

var orm = {
    all_posts: function(qryres){
        var qrystrg = "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID";
        connection.query(qrystrng,function(err,res){
            if(err) throw err;
            qryres(res);
        });
    }
}; 

module.exports = orm;