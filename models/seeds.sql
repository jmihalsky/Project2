
INSERT INTO Usr (username, pword, email, av_image) VALUES ("casekercan", "logmein", "casekercan@gmail.com", "/assets/img/profile_img/caroline.png");

INSERT INTO Posts (userID, LocationName, LocAddr, City, Zip, PostText, PostRating, post_image) VALUES (1 , "The Lone Toilet", "5400 Sears Point Rd", "Sonoma", 95476, "In the middle of nowhere in Sonoma, there is this outhouse with a very clean toilet. It is not near any kind of facility, camping ground, or anything else.", 4 , "/assets/img/post_img/lone.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating) VALUES (1, 1 , "Super Clean. Its nice to be in the outdoors and wave at cars as they go by.", 5);
