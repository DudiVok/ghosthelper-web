//DOTS Projector; EMF Level 5; Fingerprints; Freezing Temperatures; Ghost Orb; Ghost Writing; Spirit Box

$(document).ready(function() {
  $("#resetButton").click(function() {
    $(".form-check-input").each(function(index, elem) {
      $(elem).prop("checked", false);
      $(elem).show();
    });
  })

  $(".row1switch").click(function() {
    if($(this).prop("checked"))
    {
      $("#cant"+$(this)[0].id.substring(5)).hide();
    }
    else
    {
      $("#cant"+$(this)[0].id.substring(5)).show();
    }
  })

  $(".row2switch").click(function() {
    if($(this).prop("checked"))
    {
      $("#found"+$(this)[0].id.substring(4)).hide();
    }
    else
    {
      $("#found"+$(this)[0].id.substring(4)).show();
    }
  })
});
