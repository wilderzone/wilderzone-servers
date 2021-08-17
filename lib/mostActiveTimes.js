var hdata;
var currentDate;
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var monthsLong = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getCurrentDate(){
  currentDate = new Date();
  currentDate = currentDate.toUTCString().substr(5,11).split(" ");
  currentDate = currentDate[0] + "/" + (months.indexOf(currentDate[1]) + 1);
}
getCurrentDate();

function getHistogramData(){
  var item = '<tr>'
           +   '<th>Server</th>'
           +   '<th>Currently</th>'
           +   '<th>Times (GMT)</th>'
           + '</tr>';
  $("#scheduleTable").children().first().append(item);
  
  $.ajax({
    dataType:"json",
    url:"../histogram.json",
    success:function(data1){
      hdata = data1;
      cnv_enable = 1;
      $("#plotTitle").html("Player Count History (" + monthsLong[parseInt(Object.keys(hdata)[0].substr(5,2)) - 1] + " " + Object.keys(hdata)[0].substr(0,4) + " to " +  monthsLong[parseInt(Object.keys(hdata)[Object.keys(hdata).length - 1].substr(5,2)) - 1] + " " + Object.keys(hdata)[Object.keys(hdata).length - 1].substr(0,4) + ")")
    },
    error:function(xhr, status, err){
      console.log("Error " + xhr.status);
      cnv_enable = 0;
      var item = '<h2 style="margin-top:100px;text-align:center;">Schedule data couldn&#39;t be retrieved. Please try again later.</h2>';
      $("#pageContent").append(item);
      var alertMsg = "Error " + xhr.status;
      $(".alert").children(":nth-child(2)").html(alertMsg);
      $(".alert").addClass("alert_error");
      $(".alert").removeClass("hidden");
    }
  });
}

getHistogramData();