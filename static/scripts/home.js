$(document).ready(function(){

  HandlePlayer();

  $("#signupBtn").click(function(){SubmitClicked();});

  $(".teamer-group").click(function(e){
    $(".teamer-writeup").css("display", "none");
    $myWriteup = $(this).find(".teamer-writeup");
    //$($myWriteup).css("display", "block");
    $($myWriteup).slideDown("slow");

    e.stopPropagation();
  });

  $("#team-block").click(function(){
    $(".teamer-writeup").css("display", "none");
  });

  CheckScroller();

  $(window).scroll(function () { CheckScroller(); } );
  $(window).resize(function() { CheckScroller(); } );

});

function CheckScroller()
{
  totalHeight = $(document).height() - $(window).height() - $(".footer").outerHeight();
  scrollHeight = $(window).scrollTop();

  if(scrollHeight < totalHeight)
  {
    $("#downarrow").css("display", "block");
  }
  else
  {
    $("#downarrow").css("display", "none");
  }
}

function HandlePlayer()
{
  var iframe = document.querySelector('iframe');
  var player = new Vimeo.Player(iframe);

  player.on('play', function() {
    ga('send', {
          hitType: 'event',
          eventCategory: 'Videos',
          eventAction: 'Play',
          eventLabel: 'Started Jane - Data Science'
      });
  });
  player.on("pause", function(){
    ga('send', {
          hitType: 'event',
          eventCategory: 'Videos',
          eventAction: 'Pause',
          eventLabel: 'Paused Jane - Data Science'
      });
  });
  player.on("ended", function(){
    ga('send', {
          hitType: 'event',
          eventCategory: 'Videos',
          eventAction: 'Play',
          eventLabel: 'Finished Jane - Data Science'
      });
  });
  // player.getVideoTitle().then(function(title) {
  //     console.log('title:', title);
  // });
}

function SubmitClicked()
{
  $("#signupBtn").prop("disabled",true);

  email = $("#emailForm").val();
  name = $("#firstForm").val();
  reason = $("#whyForm").val();
  if(ValidateEmail(email))
  {
    ga('send', {
          hitType: 'event',
          eventCategory: 'Signup',
          eventAction: 'SignedUp',
          eventLabel: 'Signup - Data Science'
    });

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