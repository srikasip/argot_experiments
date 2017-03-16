$(document).ready(function(){
  $("#signupBtn").click(function(){SubmitClicked();});
});

function SubmitClicked()
{
  $("#signupBtn").prop("disabled",true);

  email = $("#emailForm").val();
  name = $("#firstForm").val();
  reason = $("#whyForm").val();
  if(ValidateEmail(email))
  {
    dataSource = {"Email": email, "FirstName": name, "Reason": reason};
    $("#form-overlay").css("display", "block");
    $.ajax({
      url: '/passback',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(dataSource),
      type: 'POST',
      success: function(response) {
        //console.log(response);
        //Do everything else after report-back to server is complete.
        $("#signupBtn").prop("disabled",false);
        console.log(response);
        if (response["status"] == "Success"){
          $("#form-overlay").html("Thanks so much!<br /><br />To show our appreciation, as soon as we launch, you'll get Premium Access for 1 year!");
        }
        else{
          $("#form-overlay").html("I'm so embarrassed.<br/><br/>It looks like something went wrong...");
        }
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
  else
  {
    $("#signupBtn").prop("disabled",false);
    email = "<invalid email>  " + email;
    $("#emailForm").val(email);
  }
}


function ValidateEmail(mail)
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  return (false)
}