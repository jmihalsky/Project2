//LEARN MORE BUTTON
$(".button-learn").on("click", function (event) {
  event.preventDefault();
  var id = $(this).val();
  var url = "/post/" + id;
  window.location = url;
});

//LOGIN BUTTON
$(".login").on("click", function (event) {
  event.preventDefault();
  window.location = "/login";
});

//SIGNUP BUTTON
$(".signup").on("click", function (event) {
  event.preventDefault();
  window.location = "/signup";
});

//SEARCH BUTTON
$("#search").submit(function (event) {
  event.preventDefault();
  var zipState = false;
  var cityState = false;
  var searchParam = $("#search_text").val();

  if ($("#zip").is(":checked")) {
    zipState = true;
  }

  if ($("#city").is(":checked")) {
    cityState = true;
  }

  if (searchParam == "") {
    console.log("empty");
    alert("Please insert a City/Zip Code to search.");
    return;
  } else {
    checkSearch(zipState, cityState, searchParam);
  }
});

function checkSearch(zipState, cityState, searchParam) {
  console.log("zipState = " + zipState);
  console.log("cityState = " + cityState);
  console.log("searchParam = " + searchParam);

  if (zipState === true && cityState === true) {
    alert("Please only search by the Zip Code OR City.");
    console.log("both true");
  } else if (zipState === false && cityState === false) {
    alert("Please check either Zip Code or City to search.");
    console.log("both false");
  } else if (zipState === true) {
    var url = "/zip_search/" + searchParam;
    window.location = url;
  } else if (cityState === true) {
    var url = "/city_search/" + searchParam;
    window.location = url;
  } else {
    console.log("nothing worked");
  }
}

//DELETE COMMENT
$(".delete-com").on("click", function (event) {
  var id = $(this).data("id");
  console.log("deleting");

  $.ajax("/api/comments/" + id, {
    type: "DELETE"
  }).then(function () {
    console.log("deleted comment = ", id);
    // Reload the page to get the updated list
    location.reload();
  });
});

//ADD REVIEW (photo upload sent through /uploadcomment api call seperately)
$("#add-comm").submit(function (event) {
  event.preventDefault();

  var postID = Number($(this).attr("name"));
  var rating = 0;
  //Calculate rating
  if ($("#rate1").is(":checked")) {
    rating = 1;
  }
  if ($("#rate2").is(":checked")) {
    rating = 2;
  }
  if ($("#rate3").is(":checked")) {
    rating = 3;
  }
  if ($("#rate4").is(":checked")) {
    rating = 4;
  }
  if ($("#rate5").is(":checked")) {
    rating = 5;
  }

  var photo;

  if (document.getElementById("inputCommentPhoto").files[0] == undefined) {
    photo = "";
  } else {
    photo = "/assets/img/comment_img/" + document.getElementById("inputCommentPhoto").files[0].name;
  };

  //set up object ///need to change user id for future!
  var newComment = {
    PostID: postID,
    UserID: 1,
    CommentText: $("#com").val().trim(),
    CommentRating: rating,
    comment_image: photo
  };

  validateFormComment(newComment)

});

function validateFormComment(newComment) {
  var a = newComment.PostID;
  var b = newComment.UserID;
  var c = newComment.CommentText;
  var d = newComment.CommentRating;
  var e = newComment.comment_image;


  if ((a == "") || (b == "") || (c == "") || (d == "") || (e == "")) {
    alert("Please fill out the whole form!");
  } else {
    //Send the POST request.
    $.ajax("/api/comments/" + newComment.PostID, {
      type: "POST",
      data: newComment
    }).then(function () {
      console.log("posted new comment");
      // Reload the page
      location.reload();
    });
  }
};




//UPDATE Comment Form
$(".update-form").on("submit", function (event) {
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
  }).then(function () {
    console.log("updated comment");
    // Reload the page to get the updated list
    location.assign("/");
  });
});

//ADD POST (photo upload sent through /upload api call seperately)
$("#add").submit(function (event) {
  event.preventDefault();
  //determines rating
  var rating = 0;
  if ($("#rate1").is(":checked")) {
    rating = 1;
  }
  if ($("#rate2").is(":checked")) {
    rating = 2;
  }
  if ($("#rate3").is(":checked")) {
    rating = 3;
  }
  if ($("#rate4").is(":checked")) {
    rating = 4;
  }
  if ($("#rate5").is(":checked")) {
    rating = 5;
  }

  var zipNum = Number(
    $("#inputZip").val().trim()
  );

  var photo;

  if (document.getElementById("inputPhoto").files[0] == undefined) {
    photo = "";
  } else {
    photo = "/assets/img/post_img/" + document.getElementById("inputPhoto").files[0].name;
  };


  //set up object ///need to change user id for future!
  var newLocation = {
    UserID: 1,
    LocationName: $("#inputLocation").val().trim(),
    LocAddr: $("#inputAddress").val().trim(),
    City: $("#inputCity").val().trim(),
    State: $("#inputState").val().trim(),
    Zip: zipNum,
    PostText: $("#inputDescription").val().trim(),
    PostRating: rating,
    post_image: photo
  };

  validateForm(newLocation)
});

function validateForm(newLocation) {
  var a = newLocation.UserId;
  var b = newLocation.LocationName;
  var c = newLocation.LocAddr;
  var d = newLocation.City;
  var e = newLocation.State;
  var f = newLocation.Zip;
  var g = newLocation.PostText;
  var h = newLocation.PostRating;
  var i = newLocation.post_image;

  if ((a == "") || (b == "") || (c == "") || (d == "") || (e == "") || (f == "") || (g == "") || (h == "") || (i == "")) {
    alert("Please fill out the whole form!");
  } else {
    //Send the POST request.
    $.ajax("/newlocation", {
      type: "POST",
      data: newLocation
    }).then(function () {
      console.log("posted new location");
      // Reload the page
      location.reload();
    });
  }
};

// MAP SCRIPT
var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
  var sac = { lat: 38.5727318, lng: -121.4679379 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: sac,
    zoom: 11,
    mapTypeId: "roadmap",
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  });
  infoWindow = new google.maps.InfoWindow();

  searchButton = document.getElementById(
    "searchButton"
  ).onclick = searchLocations;

  locationSelect = document.getElementById("locationSelect");
  locationSelect.onchange = function () {
    var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
    if (markerNum != "none") {
      google.maps.event.trigger(markers[markerNum], "click");
    }
  };
}

function searchLocations() {
  var address = document.getElementById("addressInput").value;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      searchLocationsNear(results[0].geometry.location);
    } else {
      alert(address + " not found");
    }
  });
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;

  locationSelect.innerHTML = "";
  var option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "See all results:";
  locationSelect.appendChild(option);
}

function searchLocationsNear(center) {
  clearLocations();

  var radius = document.getElementById("radiusSelect").value;
  var searchUrl =
    "storelocator.php?lat=" +
    center.lat() +
    "&lng=" +
    center.lng() +
    "&radius=" +
    radius;
  downloadUrl(searchUrl, function (data) {
    var xml = parseXml(data);
    var markerNodes = xml.documentElement.getElementsByTagName("marker");
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markerNodes.length; i++) {
      var id = markerNodes[i].getAttribute("id");
      var name = markerNodes[i].getAttribute("name");
      var address = markerNodes[i].getAttribute("address");
      var distance = parseFloat(markerNodes[i].getAttribute("distance"));
      var latlng = new google.maps.LatLng(
        parseFloat(markerNodes[i].getAttribute("lat")),
        parseFloat(markerNodes[i].getAttribute("lng"))
      );

      createOption(name, distance, i);
      createMarker(latlng, name, address);
      bounds.extend(latlng);
    }
    map.fitBounds(bounds);
    locationSelect.style.visibility = "visible";
    locationSelect.onchange = function () {
      var markerNum =
        locationSelect.options[locationSelect.selectedIndex].value;
      google.maps.event.trigger(markers[markerNum], "click");
    };
  });
}

function createMarker(latlng, name, address) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

function createOption(name, distance, num) {
  var option = document.createElement("option");
  option.value = num;
  option.innerHTML = name;
  locationSelect.appendChild(option);
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject
    ? new ActiveXObject("Microsoft.XMLHTTP")
    : new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  request.open("GET", url, true);
  request.send(null);
}

function parseXml(str) {
  if (window.ActiveXObject) {
    var doc = new ActiveXObject("Microsoft.XMLDOM");
    doc.loadXML(str);
    return doc;
  } else if (window.DOMParser) {
    return new DOMParser().parseFromString(str, "text/xml");
  }
}

function doNothing() { }
