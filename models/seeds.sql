-- User Seeds

INSERT INTO Usr (username, pword, email, av_image) VALUES ("anonymous", "logmein", "gmail@gmail.com", "/assets/img/profile_img/caroline.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Rick Sanchez", "signmeinbroh", "getschwifty47@gmail.com", "/assets/img/profile_img/male1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Donald Trump", "magalogin", "dtrump@maga.com", "/assets/img/profile_img/drumpf.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("The Dude", "signthedudein", "thedude@yahoo.com", "/assets/img/profile_img/thedude.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Mike Aguirre", "signmikein", "maguirre@sh!tlist.com", "/assets/img/profile_img/male2.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Jeff Mihalsky", "signjeffin", "jeffmihalsky@sh!tlist.com", "/assets/img/profile_img/male1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("David Lara", "signdavidin", "dlara@sh!tlist.com", "/assets/img/profile_img/male1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Caroline Sekercan", "signcarolinein", "csekercan@sh!tlist.com", "/assets/img/profile_img/caroline.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Alex Perkinson", "signalexin", "aperkinson@sh!tlist.com", "/assets/img/profile_img/male2.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Joe Smith", "signjoein", "jsmith@yahoo.com", "/assets/img/profile_img/male1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Alicia Davis", "signaliciain", "adavis@sbcglobal.com", "/assets/img/profile_img/female2.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Beverly Williams", "signbevin", "bevwilliams@aol.com", "/assets/img/profile_img/female1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Alyssa Berg", "signalyssain", "alyssaberg@yahoo.com", "/assets/img/profile_img/female2.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Stan Hollingsworth", "signstanin", "shollingsworth@gmail.com", "/assets/img/profile_img/male1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Jane Anderson", "signjanein", "janeanderson@hotmail.com", "/assets/img/profile_img/female2.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Adam Long", "signadamin", "adamlong@yahoo.com", "/assets/img/profile_img/male1.png");

INSERT INTO Usr (username, pword, email, av_image) VALUES ("Beth Smith", "signmein", "bethsmith@sbcglobal.com", "/assets/img/profile_img/female2.png");

-- Post Seeds

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (2 , "The Lone Toilet", "5400 Sears Point Rd", "Sonoma", "CA", 95476, "In the middle of nowhere in Sonoma, there is this outhouse with a very clean toilet. It is not near any kind of facility, camping ground, or anything else.", 5 , "/assets/img/post_img/lone.jpg");

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (3 , "Trump's Golden Toilet", "725 5th Avenue", "New York", "NY", 10022, "I had always heard rumors about the golden throne Donald Trump kept in his tower, and decided to try it out for myself.  Very clean, but very cold, and security was very rude", 4 , "/assets/img/post_img/golden.jpg");

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (4 , "Restroom in the Ace of Spades", "1417 R Street", "Sacramento", "CA", 95811, "The restroom here is well maintained overall, but it is always crowded during soundcheck.  Would advise you do your business at less busy times.", 3 , "/assets/img/post_img/aceofspades.png");

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (5 , "Folsom Point Public Bathroom", "Folsom Lake", "Folsom", "CA", 95630, "I was very pleasantly surprised at how well kept this restroom was, typically public area restrooms are not managed well and run out of the essentials very quickly.", 4 , "/assets/img/post_img/folsom.jpg");

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (6 , "Wadsworth Rest Stop Westbound", "I-80", "Reno", "NV", 89510, "I would not recommend this place to my worst enemy. Absolutely foul inside, no toiletries to be found, toilet paper was a half step up from a leaf off the ground, except the leaf would be more pleasant. NEVER COME HERE.", 1 , "/assets/img/post_img/wadsworth.jpg");

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (7 , "Sacramento Greyhound Station", "420 Richards Blvd", "Sacramento", "CA", 95811, "While Greyhound has great prices on all your travel needs, it seems the customer pays a price in bathroom quality. Much like lots of bus station bathrooms, this one had lots of disturbing artwork, and was rather dirty.  The only real saving grace this location has is that there are many that are worse than it is.", 2 , "/assets/img/post_img/greyhound.jpg");

INSERT INTO Posts (userID, LocationName, LocAddr, City, State, Zip, PostText, PostRating, post_image) VALUES (8 , "Sacramento International Airport", "6900 Airport Blvd", "Sacramento", "CA", 95837, "This was the most strangely positive experience I have had with a public restroom. It was absolutely immaculate, smelled as if it had been recently cleaned (and looked it too!) and  seemed to have plenty of toilet paper in each stall. If that wasn't enough, this little slice of restroom heaven comes equipped with a bidet (if you like that sort of thing). Would definitely recommend!", 5 , "/assets/img/post_img/sacairport.jpg");

-- Comment Seeds
    
    -- comments on Lone Toilet Post
INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (1, 1 , "Super Clean. Its nice to be in the outdoors and wave at cars as they go by.", 5, "/assets/img/comment_img/SonomaReview.png");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (1, 2 , "Being out in the fresh air is so liberating! Highly recommend this location to anyone who loves to be in the outdoors!", 4, "/assets/img/comment_img/SonomaReview.png");

    -- Comments on Golden Toilet Post
INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (2, 3 , "This is the greatest toilet in the world. No other toilet comes close. This toilet. Is. YUUUUGE.", 1, "/assets/img/comment_img/golden.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (2, 3 , "This toilet is going to make America great again.", 1, "/assets/img/comment_img/golden.jpg");

    -- Comments on Ace of Spades Restroom
INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (3, 2 , "Always crowded, but they do put up posters for upcoming events as reading material, so that is cool.", 3, "/assets/img/comment_img/aceofspades.png");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (3, 1 , "I hate how loud it is in this bathroom!", 1, "/assets/img/comment_img/aceofspades.png");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (3, 5 , "The dude abides man.", 5, "/assets/img/comment_img/aceofspades.png");

    -- Comments on Folsom Point Restroom

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (4, 2 , "Beats going in the lake...", 5, "/assets/img/comment_img/folsom.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (4, 8 , "I dunno, going in the lake is quite fun, but having toilet paper is also pretty cool.", 3, "/assets/img/comment_img/folsom.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (4, 6 , "MORE PEOPLE NEED TO KNOW ABOUT THIS TOILET, I AM SICK OF SEEING PEOPLE GO IN THE LAKE.", 5, "/assets/img/comment_img/folsom.jpg");

    -- Comments on Wadsworth Rest Area

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (5, 6 , "I really had to go, took one step into this place, and walked straight out. Absolutely horrifying place.", 5, "/assets/img/comment_img/wadsworth.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (5, 10 , "When I went, the place was very clean and well stocked. I have no idea why everyone is complaining so much.", 1, "/assets/img/comment_img/wadsworth.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (5, 12 , "This place haunts my memory.", 5, "/assets/img/comment_img/wadsworth.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (5, 17 , "I cannot believe the horror that awaited me here. I have been to many rest areas, but this is by far the worst I have ever seen.", 5, "/assets/img/comment_img/wadsworth.jpg");

    -- Comments on Sac Greyhound

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (6, 10 , "This is the only bus station restroom I will use.", 5, "/assets/img/comment_img/wadsworth.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (6, 15 , "I came here once, and I have to say it was mediocre at best.", 2, "/assets/img/comment_img/wadsworth.jpg");

    -- Comments on Sac International

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (7, 4 , "The restroom here was so pleasant and inviting, I almost missed my flight just hanging out in there!", 5, "/assets/img/comment_img/sacairport.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (7, 7 , "So clean! I swear it is cleaner than my bathroom at home.", 1, "/assets/img/comment_img/sacairport.jpg");

INSERT INTO Comments (PostID, UserID, CommentText, CommentRating, comment_image) VALUES (7, 10 , "You might want to clean your bathroom dude ^^^.", 3, "/assets/img/comment_img/sacairport.jpg");