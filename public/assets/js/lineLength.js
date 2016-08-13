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
    alert('Thank you for voting');
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
    alert('Thank you for voting');
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
    alert('Thank you for voting');
    return false;
  });
});
