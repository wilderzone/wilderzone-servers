var database_data;
var settings_data;
var leftButtonIndex = 0;
var topButtonIndex = 0;

function getAdminConsole(){
  $.ajax({
    dataType:"json",
    url:"database.json",
    cache:false,
    success:function(data1){
      database_data = data1;
      $.ajax({
        dataType:"json",
        url:"settings.json",
        cache:false,
        success:function(data2){
          settings_data = data2;
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
           + '</div>'
           + '<div id="adminRight">'
           +   '<div id="adminTop">'
           +     '<span>'
           +       '<div class="adminTopTitle"><p>AUS Pub Server 1</p></div>'
           +     '</span>'
           +     '<span>'
           +     '</span>'
           +   '</div>'
           +   '<div id="adminMain">'
           +   '</div>'
           + '</div>';
  
  $("#adminConsoleContainer").append(item);
  
  //Left List
  var i = 1;
  Object.keys(settings_data).forEach(function(k){
    if(i === 1){var active = " active";}else{var active = "";}
    var item = '<div id="' + k + '" class="adminLeftButton' + active + '" onclick="switchLeftButton(event)"><img src="../icons/dns_black_24dp.svg" draggable="false"><p>' + i + '</p></div>';
    $("#adminLeft").append(item);
    i++;
  });
  
  //Top List
  var i = 1;
  Object.keys(settings_data["server" + (leftButtonIndex + 1)]).forEach(function(k){
    if(i === 1){var active = " active";}else{var active = "";}
    var item = '<div class="adminTopButton' + active + '" onclick="switchTopButton(event)"><img src="../icons/' + k + '.svg" draggable="false"><p>' + k + '</p></div>';
    $("#adminTop").children(":nth-child(2)").append(item);
    i++;
  });
  
  updateMain();
}

function updateMain(){
  $("#adminMain").empty();
  //Main
  Object.keys(settings_data["server" + (leftButtonIndex + 1)][$(".adminTopButton").filter(".active").children(":nth-child(2)").html()]).forEach(function(k){
    var item = processControlType(settings_data["server" + (leftButtonIndex + 1)][$(".adminTopButton").filter(".active").children(":nth-child(2)").html()][k], k);
    $("#adminMain").append(item);
  });
}

getAdminConsole();

function switchLeftButton(e){
  $(".adminLeftButton").removeClass("active");
  $(e.target).addClass("active");
  leftButtonIndex = $(e.target).prevAll().length;
  updateMain();
}
function switchTopButton(e){
  $(".adminTopButton").removeClass("active");
  $(e.target).addClass("active");
  topButtonIndex = $(e.target).prevAll().length;
  updateMain();
}

function processControlType(kdata, k){ //Compare the settings_data values to the database_data values to determine the range of a control
  if(typeof kdata == "string"){ //String
    var item = '<div class="adminControl"><p>' + k.split("_").join(" ") + ':</p><input type="text" id="Overview-' + k + '" name="' + k.split("_").join(" ") + '" value="' + kdata + '"></div>';
  }else if(typeof kdata == "object"){ //Array
    var item = '<div class="adminControl"><p>' + k.split("_").join(" ") + ':</p><form id="Overview-' + k + '">'
             +   '<select>';
    
    var i = 0;
    kdata.forEach(function(h){
      if(i === 0){
        item +=    '<option value="' + h + '" selected>' + h + '</option>';
      }else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      }
      i++;
    });
    
       item +=   '</select>'
             + '</form>';
  }
  
  return item;
}