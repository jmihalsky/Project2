DROP DATABASE IF EXISTS slist;
CREATE DATABASE slist;

USE DATABASE slist;

CREATE TABLE usr(
    usr_id integer NOT NULL auto_increment PRIMARY KEY,
    username varchar(40) NOT NULL,
    pword varchar(40),
    email varchar(40) NOT NULL,
    av_image VARCHAR(40)
);

CREATE TABLE posts(
    post_id integer NOT NULL auto_increment PRIMARY KEY,
    usr_id integer NOT NULL,
    LocationName varchar(50) NOT NULL,
    
);
