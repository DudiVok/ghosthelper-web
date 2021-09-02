//DOTS Projector; EMF Level 5; Fingerprints; Freezing Temperatures; Ghost Orb; Ghost Writing; Spirit Box

$(document).ready(function() {
  $("#resetButton").click(function() {
    $(".form-check-input").each(function(index, elem) {
      $(elem).prop("checked", false);
      $(elem).fadeIn("100");
    });
  })

  $(".row1switch").click(function() {
    $("#cant" + $(this)[0].id.substring(5)).fadeToggle(150);
  })

  $(".row2switch").click(function() {
    $("#found" + $(this)[0].id.substring(4)).fadeToggle(150);
  })
});