$(document).ready(function() {
  $('#shortLine').click(function(event) {
    var currentURL = window.location;
    var voteButton = $('#shortLine').val();
    var userData = {
      line_length: voteButton
    };
    $.post(currentURL, userData, function(response, status) {
      console.log(response);
    });
    swal({title: "Thanks for voting!",   text: "Your feedback has been saved.",   type: "success", confirmButtonColor: "#9e9e9e",   confirmButtonText: "Close",   closeOnConfirm: true });
    return false;
  });

  $('#mediumLine').click(function(event) {
    var currentURL = window.location;
    var voteButton = $('#mediumLine').val();
    var userData = {
      line_length: voteButton
    };
    $.post(currentURL, userData, function(response, status) {
      console.log(response);
    });
    swal({title: "Thanks for voting!",   text: "Your feedback has been saved.",   type: "success", confirmButtonColor: "#9e9e9e",   confirmButtonText: "Close",   closeOnConfirm: true });
    return false;
  });

  $('#longLine').click(function() {
    var currentURL = window.location;
    var voteButton = $('#longLine').val();
    var userData = {
      line_length: voteButton
    };
    $.post(currentURL, userData, function(response, status) {
      console.log(response);
    });
    swal({title: "Thanks for voting!",   text: "Your feedback has been saved.",   type: "success", confirmButtonColor: "#9e9e9e",   confirmButtonText: "Close",   closeOnConfirm: true });
    return false;
  });
});
