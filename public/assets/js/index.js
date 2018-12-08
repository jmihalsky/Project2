
//Clicking a learn more button on a post
$(".button-learn").on("click", function (event) {
  var id = $(this).data("id");

  $.ajax("/post/" + id, {
    type: "GET"
  }).then(
    function () {
      console.log("Clicked learn more on post Id: ", id);
      location.reload();
    }
  );
});


