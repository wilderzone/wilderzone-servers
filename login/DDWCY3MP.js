function F4UZG5F3(){
  var GK9LXSCX = sha256($("#username")[0].value);
  var MBHZE2KH = sha256($("#password")[0].value);
  $.ajax({
    dataType: "json",
    url:"https://wilderzone-server-admin.s3.amazonaws.com/" + MBHZE2KH + ".json",
    success:function(OAMPKXZY){
      if(OAMPKXZY.b == MBHZE2KH){
        setCookie("arl", OAMPKXZY.c, 7);
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
        alertMsg = "Network Error: Please contact the site admin.";
      }
      $(".alert").children(":nth-child(2)").html(alertMsg);
      $(".alert").addClass("alert_error");
      $(".alert").removeClass("hidden");
    }
  });
}