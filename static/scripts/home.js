$(document).ready(function(){
  $("#signupBtn").click(function(){SubmitClicked();});
});

function SubmitClicked()
{
  $("#signupBtn").prop("disabled",true);
  $("#form-overlay").css("display", "block");



  email = $("#emailForm").val();
  name = $("#firstForm").val();
  reason = $("#whyForm").val();
  dataSource = {"email": email, "name": name, "reason": reason};
  $.ajax({
    url: '/passback',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(dataSource),
    type: 'POST',
    success: function(response) {
      //console.log(response);
      //Do everything else after report-back to server is complete.
      $("#signupBtn").prop("disabled",false);
      $("#form-overlay").html("Thanks so much!<br /><br />To show our appreciation, as soon as we launch, you'll get Premium Access for 1 year!");
    },
    error: function(error) {
      console.log("ERROR");
      console.log(error);
      $("#signupBtn").prop("disabled",false);
      $("#form-overlay").html("I'm so embarrassed.<br/><br/>It looks like something went wrong...");
      $("#form-overlay").css("display", "none");
    }
  }); //Closing Ajax 
}