$(document).ready(function(){
  $("#signupBtn").click(function(){SubmitClicked();});
});

function SubmitClicked()
{
  $("#signupBtn").prop("disabled",true);
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
      console.log("SUCCESS");
      //console.log(response);
      //Do everything else after report-back to server is complete.
      alert("thank you for signing up!");
      $("#signupBtn").prop("disabled",false);
    },
    error: function(error) {
      alert("Shit");
      console.log("ERROR");
      console.log(error);
      $("#signupBtn").prop("disabled",false);
    }
  }); //Closing Ajax 
}