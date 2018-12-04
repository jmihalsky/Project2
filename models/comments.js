module.exports = function(sequelize, DataTypes){
    var Comments = sequelize.define("Comments",{
        comment_id: DataTypes.UUID,
        post_id: DataTypes.INTEGER,
        usr_id: DataTypes.INTEGER,
        CommentText: DataTypes.STRING,
        CommentRating: DataTypes.INTEGER
    });

    return Comments;
};