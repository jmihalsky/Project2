var orm = require("../config/orm.js");

var slist = {
    all: function (qryres) {
        orm.all_posts(function (res) {
            qryres(res);
        });
    },
    city: function (qryres) {
        orm.city_search(function (res) {
            qryres(res);
        });
    },
    posts: function (post_id, qryres) {
        orm.post_info(post_id, function (res) {
            qryres(res);
        });
    }
};

module.exports = slist;