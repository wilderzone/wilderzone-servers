function F4UZG5F3(){
  var GK9LXSCX = sha256($("#username")[0].value);
  var MBHZE2KH = sha256($("#password")[0].value);
  $.ajax({
    dataType: "json",
    url:"https://wilderzone-server-admin.s3.amazonaws.com/" + sha256(MBHZE2KH) + ".json",
    success:function(OAMPKXZY){
      if(OAMPKXZY.a == GK9LXSCX && OAMPKXZY.b == MBHZE2KH){
        $(".alert").children(":nth-child(2)").html("Login Successful");
        $(".alert").children(":nth-child(1)").attr("src", "../icons/check_circle_24dp.svg");
        $(".alert").addClass("alert_success");
        $(".alert").removeClass("hidden");
        setCookie("arl", OAMPKXZY.c + "-" + sha256(MBHZE2KH), 1);
        window.location.href = "../admin/";
      }else{
        $(".alert").children(":nth-child(2)").html("Incorrect Credentials");
        $(".alert").removeClass("hidden");
      }
    },
    error:function(xhr, status, err){
      console.log("Error " + xhr.status);
      var alertMsg = "";
      if(xhr.status == 404){
        alertMsg = "Incorrect Credentials";
      }else{
        alertMsg = "Internal Error: Please contact the site admin.";
      }
      $(".alert").children(":nth-child(2)").html(alertMsg);
      $(".alert").addClass("alert_error");
      $(".alert").removeClass("hidden");
    }
  });
}