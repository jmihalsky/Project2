var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes){
    var Usr = sequelize.define("Usr",{
        UserID: {
            type: DataTypes.INTEGER,
            PrimaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });
    Usr.removeAttribute('id');

    Usr.prototype.validPassword = function(pword){
        return bcrypt.compareSync(pword, this.pword);
    };

    Usr.hook("beforeCreate",function(usr){
        usr.pword = bcrypt.hashSync(usr.pword, bcrypt.genSaltSync(10),null);
    });
    
    return Usr;
};