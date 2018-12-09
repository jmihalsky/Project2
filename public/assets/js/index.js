
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

  if ($("#zip").is(':checked')) {
    var zip = $("#search_text").val();
    var url = ("/zip_search/" + zip);
    window.location = url;

  } else if ($("#city").is(':checked')) {
    var city = $("#search_text").val();
    var url = ("/city_search/" + city);
    window.location = url;

  } else {
    alert("Please check Zip OR City box to search");
  };

});

