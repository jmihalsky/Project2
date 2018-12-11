var orm = require("../config/orm.js");

var slist = {
  all: function (qryres) {
    orm.all_posts(function (res) {
      qryres(res);
    });
  },
  city: function (srchcity, qryres) {
    orm.city_search(srchcity, function (res) {
      qryres(res);
    });
  },
  zip: function (srchzip, qryres) {
    orm.zip_search(srchzip, function (res) {
      qryres(res);
    });
  },
  posts: function (post_id, qryres) {
    orm.post_info(post_id, function (res) {
      qryres(res);
    });
  },
  comments: function (post_id, qryres) {
    orm.comment_info(post_id, function (res) {
      qryres(res);
    });
  },
  dlt_comments: function (condition, qryres) {
    orm.comment_dlt("Comments", condition, function (res) {
      qryres(res);
    });
  },
  createComment: function (col, vals, qryres) {
    orm.create_comment("Comments", col, vals, function (res) {
      qryres(res);
    });
  },
  createLocation: function (col, vals, qryres) {
    orm.create_location("Posts", col, vals, function (res) {
      qryres(res);
    });
  }
};

module.exports = slist;
