//Clicking a learn more button on a post
$(".button-learn").on("click", function(event) {
  event.preventDefault();
  var id = $(this).val();
  var url = "/post/" + id;
  window.location = url;
});

$(".login").on("click", function(event) {
  event.preventDefault();
  window.location = "/login";
});

//Search button
$("").on("click", function(event) {
  //if else statement to tell if the city or zip button is selected... run different ajax calls....
});
