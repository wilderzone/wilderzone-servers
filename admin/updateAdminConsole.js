function getAdminConsole(){
  var ddata;
  var sdata;
  $.ajax({
    dataType:"json",
    url:"database.json",
    cache:false,
    success:function(data1){
      ddata = data1;
      $.ajax({
        dataType:"json",
        url:"settings.json",
        cache:false,
        success:function(data2){
          sdata = data2;
          updateAdminConsole();
          
        },
        error:function(xhr, status, err){
          console.log("Error " + xhr.status);
          $("#pageContent").empty();
          var item = '<h2 style="margin-top:100px;text-align:center;">Console data couldn&#39;t be retrieved. Please try again later.</h2>';
          $("#pageContent").append(item);
        }
      });
    },
    error:function(xhr, status, err){
      console.log("Error " + xhr.status);
      $("#pageContent").empty();
      var item = '<h2 style="margin-top:100px;text-align:center;">Console data couldn&#39;t be retrieved. Please try again later.</h2>';
      $("#pageContent").append(item);
    }
  });
}

function updateAdminConsole(){
  $("#adminConsoleContainer").empty();
  $("adminConsoleContainer").removeClass("loading");
}