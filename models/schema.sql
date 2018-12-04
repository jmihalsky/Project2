DROP DATABASE IF EXISTS slist;
CREATE DATABASE slist;

USE slist;

CREATE TABLE usr (
    UserID int NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL,
    pword varchar(40) NOT NULL,
    email varchar(40) NOT NULL,
    av_image varchar(50),
    PRIMARY KEY (UserID)
);

CREATE TABLE posts (
    PostID int NOT NULL AUTO_INCREMENT,
	UserID int NOT NULL,
    LocationName varchar(60) NOT NULL,
    PostText text NOT NULL,
    PostRating int NOT NULL,
    post_image varchar(50),
    PRIMARY KEY (PostID, UserID)
);

CREATE TABLE comments (
    CommentID int NOT NULL AUTO_INCREMENT,
    PostID int NOT NULL,
    UserID int NOT NULL,
    CommentText text NOT NULL,
    CommentRating int NOT NULL,
    av_image varchar(50),
    PRIMARY KEY (CommentID, PostID, UserID)
);