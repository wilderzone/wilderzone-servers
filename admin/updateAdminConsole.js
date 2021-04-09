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
          $(".alert").children(":nth-child(2)").html("Error " + xhr.status);
          $(".alert").addClass("alert_error");
          $("#adminConsoleContainer").addClass("hidden");
          $(".alert").removeClass("hidden");
          var item = '<h2 style="margin-top:100px;text-align:center;">Console data couldn&#39;t be retrieved. Please try again later.</h2>';
          $("#pageContent").append(item);
        }
      });
    },
    error:function(xhr, status, err){
      console.log("Error " + xhr.status);
      $(".alert").children(":nth-child(2)").html("Error " + xhr.status);
      $(".alert").addClass("alert_error");
      $("#adminConsoleContainer").addClass("hidden");
      $(".alert").removeClass("hidden");
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
           +       '<div class="adminTopTitle"><p>' + settings_data["server" + (leftButtonIndex + 1)]["Overview"]["Name"] + '</p></div>'
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
  
  refreshMain();
}

function refreshMain(){
  $("#adminMain").empty();
  //Main
  Object.keys(settings_data["server" + (leftButtonIndex + 1)]).forEach(function(m){
    if(m == $("#adminTop").children(":nth-child(2)").children(":nth-child(" + (leftButtonIndex + 1) + ")").children(":nth-child(2)").html()){
      var item = '<div id="' + m + '" class="adminPage"></div>';
    }else{
      var item = '<div id="' + m + '" class="adminPage hidden"></div>';
    }
    $("#adminMain").append(item);
    Object.keys(settings_data["server" + (leftButtonIndex + 1)][m]).forEach(function(k){
      var item = processControlType(settings_data["server" + (leftButtonIndex + 1)][m][k], m, k);
      $("#" + m).append(item);
    });
  });
}

getAdminConsole();

function switchLeftButton(e){
  $(".adminLeftButton").removeClass("active");
  $(e.target).addClass("active");
  leftButtonIndex = $(e.target).prevAll().length;
  refreshMain();
}
function switchTopButton(e){
  $(".adminTopButton").removeClass("active");
  $(e.target).addClass("active");
  topButtonIndex = $(e.target).prevAll().length;
  $(".adminPage").addClass("hidden");
  $("#" + $(e.target).children(":nth-child(2)").html()).removeClass("hidden");
}

function processControlType(kdata, o, k){ //Compare the settings_data values to the database_data values to determine the range of a control
  if(database_data[o][k]["type"] == "info"){ //Info
    var item = '<div class="adminControl" id="' + o + '-' + k + '"><p>' + k.split("_").join(" ") + ':</p><p>' + kdata + '</p></div>';
    
  }else if(database_data[o][k]["type"] == "string"){ //String
    var item = '<div class="adminControl" id="' + o + '-' + k + '"><p>' + k.split("_").join(" ") + ':</p><input type="text" value="' + kdata + '"></div>';
    
  }else if(database_data[o][k]["type"] == "dropdown"){ //Dropdown
    var item = '<div class="adminControl" id="' + o + '-' + k + '"><p>' + k.split("_").join(" ") + ':</p><form>'
             +   '<select>';
    
    database_data[o][k]["options"].forEach(function(h){
      if(kdata == h){
        item +=    '<option value="' + h + '" selected>' + h + '</option>';
      }else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      }
    });
    
       item +=   '</select>'
             + '</form>';
    
  }else if(database_data[o][k]["type"] == "time"){ //Time
    var item = '<div class="adminControl" id="' + o + '-' + k + '"><p>' + k.split("_").join(" ") + ':</p><form>'
             +   '<select>';
    
    database_data[o][k]["options"].forEach(function(h){
      if(kdata[0] == h){
        item +=    '<option value="' + h + '" selected>' + h + '</option>';
      }else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      }
    });
    
       item +=   '</select>'
             + '</form>'
             + '<label> &#11834; </label>'
             + '<form>'
             +   '<select>';
    
    database_data[o][k]["options"].forEach(function(h){
      if(kdata[1] == h){
        item +=    '<option value="' + h + '" selected>' + h + '</option>';
      }else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      }
    });
    
       item +=   '</select>'
             + '</form>';
    
  }else if(database_data[o][k]["type"] == "checkbox"){ //Checkbox
    var item = '<div class="adminControl" id="' + o + '-' + k + '"><p>' + k.split("_").join(" ") + ':</p><div class="checkboxesOuterBound">';
    database_data[o][k]["options"].forEach(function(h){
      if(kdata.includes(h)){
        item +=    '<div class="checkboxesInnerBound"><input type="checkbox" name="' + h + '" value="' + h + '" checked><label for="' + h + '">' + h + '</label></div>';
      }else{
        item +=    '<div class="checkboxesInnerBound"><input type="checkbox" name="' + h + '" value="' + h + '"><label for="' + h + '">' + h + '</label></div>';
      }
    });
       item += '</div></div>';
    
  }else if(database_data[o][k]["type"] == "output"){ //Output
    var item = '<div class="adminControl" id="' + o + '-' + k + '"><p>' + k.split("_").join(" ") + ':</p><textarea rows="30" cols="70">' + kdata + '</textarea></div>';
    
  }
  
  return item;
}