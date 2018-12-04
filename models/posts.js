module.exports = function(sequelize, DataTypes){
    var Posts = sequelize.define("Posts",{
        post_id: DataTypes.UUID,
        usr_id: DataTypes.INTEGER,
        LocationName: DataTypes.STRING,
        PostText: DataTypes.STRING,
        PostRating: DataTypes.INTEGER,
        Post_Image: DataTypes.STRING
    });

    return Posts;
};