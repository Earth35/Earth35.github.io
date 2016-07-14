$(document).ready(function () {
  // load thumbnails
  for (n=lowerLimit; n<=upperLimit; n++) {
    var identifier = padId(n)
    $(".contents").append('<img src="' + thumbSource + identifier + '.jpg' + '" class="thumbnail">');
  }
  
  // gallery navigation
  $(".thumbnail").on('click', function () {
    openPopup(this, source);
  });
  
  $("#cross").on('click', function() {
    $(".overlay").fadeOut();
  });
  
  $("#prev").on('click', function () {
    previousImage();
  });
  
  $("#next").on('click', function () {
    nextImage();
  });
  
  // keypress support
  $(document).on('keyup', function(e) {
    var popupStatus = $(".overlay").css("display");
    if (popupStatus === "block") {
      switch (e.which) {
        case 37:
          // left arrow
          if (currentPhoto !== lowerLimit) {
            previousImage();
          }
          break;
        case 39:
          // right arrow
          if (currentPhoto !== upperLimit) {
            nextImage();
          }
          break;
        case 27:
          // escape
          $(".overlay").fadeOut();
          break;
      }
    }
  });
  
  // tooltip event
  $(".close").on('click', function() {
    $(".tooltip").fadeOut(1500);
  });
});

function openPopup (image) {
  var fileIdentifier = $(image).attr('src').split(/\//).slice(-1)[0];
  var path = source + fileIdentifier;
  $("#big-img").attr('src', path);
  currentPhoto = parseInt(fileIdentifier);
  setArrowVisibility();
  $(".overlay").fadeIn();
}

function setArrowVisibility () {
  if (currentPhoto === lowerLimit) {
    $("#prev").css("visibility", "hidden");
  }
  else {
    $("#prev").css("visibility", "visible");
  }
  
  if (currentPhoto === upperLimit) {
    $("#next").css("visibility", "hidden");
  }
  else {
    $("#next").css("visibility", "visible");
  }
}

function previousImage () {
  fadePhotoOut();
  currentPhoto -= 1;
  window.setTimeout(swapPhoto, 245);
  setArrowVisibility();
  window.setTimeout(fadePhotoIn, 400);
}

function nextImage () {
  fadePhotoOut();
  currentPhoto += 1;
  window.setTimeout(swapPhoto, 245);
  setArrowVisibility();
  window.setTimeout(fadePhotoIn, 400);
}

function fadePhotoOut () {
  $("#big-img").fadeOut(250);
}

function fadePhotoIn () {
  $("#big-img").fadeIn(250);
}

function padId (identifier) {
  if (identifier < 10) {
    return "00" + identifier.toString();
  }
  else {
    return "0" + identifier.toString();
  }
}

function swapPhoto () {
  var paddedId = padId(currentPhoto);
  var newSource = source + paddedId + ".jpg";
  $("#big-img").attr('src', newSource);
}