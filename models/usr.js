module.exports = function(sequelize, DataTypes){
    var Usr = sequelize.define("Usr",{
        usr_id: DataTypes.UUID,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        av_image: DataTypes.STRING
    });

    Usr.associate = function(models){
        models.Usr.hasMany(models.Posts);
    };
    return Usr;
;}