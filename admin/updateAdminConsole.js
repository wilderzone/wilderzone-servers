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
  $("#adminConsoleContainer").removeClass("loading");
  $("#adminConsoleContainer").removeClass("emptySection");
  
  var item = '<div id="adminLeft">'
           +   '<div class="adminLeftButton"><img src="../icons/dns_black_24dp.svg" draggable="false"><p>1</p></div>'
           +   '<div class="adminLeftButton"><img src="../icons/dns_black_24dp.svg" draggable="false"><p>2</p></div>'
           +   '<div class="adminLeftButton"><img src="../icons/dns_black_24dp.svg" draggable="false"><p>3</p></div>'
           +   '<div class="adminLeftButton"><img src="../icons/dns_black_24dp.svg" draggable="false"><p>4</p></div>'
           +   '<div class="adminLeftButton"><img src="../icons/dns_black_24dp.svg" draggable="false"><p>5</p></div>'
           + '</div>'
           + '<div id="adminRight">'
           +   '<div id="adminTop">'
           +     '<span>'
           +       '<div class="adminTopTitle"><p>AUS Pub Server 1</p></div>'
           +     '</span>'
           +     '<span>'
           +       '<div class="adminTopButton"><img src="../icons/visibility_24dp.svg" draggable="false"><p>Overview</p></div>'
           +       '<div class="adminTopButton"><img src="../icons/rules_24dp.svg" draggable="false"><p>Rules</p></div>'
           +       '<div class="adminTopButton"><img src="../icons/terrain_24dp.svg" draggable="false"><p>Maps</p></div>'
           +       '<div class="adminTopButton"><img src="../icons/shield_24dp.svg" draggable="false"><p>Classes</p></div>'
           +       '<div class="adminTopButton"><img src="../icons/double_arrow_24dp.svg" draggable="false"><p>Compute</p></div>'
           +       '<div class="adminTopButton"><img src="../icons/schedule_24dp.svg" draggable="false"><p>Schedule</p></div>'
           +       '<div class="adminTopButton"><img src="../icons/code_24dp.svg" draggable="false"><p>Output</p></div>'
           +     '</span>'
           +   '</div>'
           +   '<div id="adminMain">'
           +     '<div class="aboutSection"><img src="../icons/code_24dp.svg" draggable="false"><p>Info</p></div>'
           +     '<div class="aboutSection"><img src="../icons/code_24dp.svg" draggable="false"><p>Info</p></div>'
           +     '<div class="aboutSection"><img src="../icons/code_24dp.svg" draggable="false"><p>Info</p></div>'
           +     '<div class="aboutSection"><img src="../icons/code_24dp.svg" draggable="false"><p>Info</p></div>'
           +   '</div>'
           + '</div>';
  
  $("#adminConsoleContainer").append(item);
}

updateAdminConsole();