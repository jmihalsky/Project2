
//Clicking a learn more button on a post
$(".button-learn").on("click", function (event) {
  event.preventDefault();
  var id = $(this).val();
  var url = ("/post/" + id)
  window.location = url;
});


$(".login").on("click", function (event) {
  event.preventDefault();
  window.location = "/login";
})


//Search button
$("#search").submit(function (event) {
  event.preventDefault();
  var zipState = false;
  var cityState = false;
  var searchParam = $("#search_text").val();

  if ($("#zip").is(":checked")) {
    zipState = true;
  };

  if ($("#city").is(":checked")) {
    cityState = true;
  };

  if (searchParam == "") {
    console.log("empty");
    alert("Please insert a City/Zip Code to search.")
    return;
  } else {
    checkSearch(zipState, cityState, searchParam);
  };

});

function checkSearch(zipState, cityState, searchParam) {
  console.log("zipState = " + zipState);
  console.log("cityState = " + cityState);
  console.log("searchParam = " + searchParam);

  if ((zipState === true) && (cityState === true)) {
    alert("Please only search by the Zip Code OR City.");
    console.log("both true");
  } else if ((zipState === false) && (cityState === false)) {
    alert("Please check either Zip Code or City to search.");
    console.log("both false");

  } else if (zipState === true) {
    var url = ("/zip_search/" + searchParam);
    window.location = url;
  } else if (cityState === true) {
    var url = ("/city_search/" + searchParam);
    window.location = url;
  } else {
    console.log("nothing worked");
  }
};


$(".delcomment").on("click", function(event) {
  var id = $(this).val();
  console.log("deleting");
  // Send the DELETE request.
  $.ajax("/api/comments/" + id, {
    type: "DELETE"
  }).then(function(response){
    console.log("maybe do something");
  });
});

$("input[name=rating]").on("click", function() {
  console.log("click");
  $("#ratings").val($(this).attr("value"));
});


$("#add-comm").submit(function(event){
  event.preventDefault();
  console.log("button working");
});


$(".update-form").on("submit", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  var updatedComment = {
    CommentRating: $("#ratings")
      .val()
      .trim(),
    CommentText: $("#com")
      .val()
      .trim()
  };

  var id = $(this).data("id");

  // Send the POST request.
  $.ajax("/api/comments/" + id, {
    type: "PUT",
    data: updatedComment
  }).then(function() {
    console.log("updated comment");
    // Reload the page to get the updated list
    location.assign("/");
  });
});