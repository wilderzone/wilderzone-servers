function F4UZG5F3(){
  var GK9LXSCX = sha256($("#username")[0].value);
  var MBHZE2KH = sha256($("#password")[0].value);
  $.ajax({
    dataType: "json",
    url:"https://wilderzone-server-admin.s3.amazonaws.com/" + GK9LXSCX + ".json",
    success:function(OAMPKXZY){
      if(OAMPKXZY.b == MBHZE2KH){
        setCookie("arl", OAMPKXZY.c, 7);
        window.location.href = "../admin/";
      }else{
        console.log("Wrong Creds");
      }
    },
    error:function(xhr, status, err){
      console.log("Error " + xhr.status);
    }
  });
}