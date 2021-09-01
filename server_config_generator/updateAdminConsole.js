var database_data;
var settings_data;
var total_user_configs = 0;
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
          populateGeneratorContainer();
        },
        error:function(xhr, status, err){
          console.log("Error " + xhr.status);
        }
      });
    },
    error:function(xhr, status, err){
      console.log("Error " + xhr.status);
    }
  });
}

function populateGeneratorContainer(){
  $("#config_generator_container").empty();
  
  total_user_configs = Object.keys(settings_data).length;
  
  //General Layout
  var config_top_tabs = '';
  var i = 1;
  Object.keys(database_data).forEach(function(k){
    if(i === 1){var active = " active";}else{var active = "";}
    config_top_tabs += '<div class="config_top_tab' + active + '" onclick="switchTopButton(event)"><img src="../assets/icons/' + k + '.svg" draggable="false"><p>' + k + '</p></div>';
    i++;
  });
  
  var item = '<div id="config_left"></div>'
           + '<div id="config_right">'
           +   '<div id="config_top_tabs_container">'
           +     config_top_tabs
           +   '</div>'
           +   '<div id="config_main"></div>'
           + '</div>';
  
  $("#config_generator_container").append(item);
  
  //Left List
  refreshLeft(1);
  
  //Main Section
  refreshMainSection();
}

function switchLeftButton(e){
  $(".config_left_tab").removeClass("active");
  $(e.target).addClass("active");
  leftButtonIndex = $(e.target).prevAll().length;
  //refreshMainSection();
}
function switchTopButton(e){
  $(".config_top_tab").removeClass("active");
  $(e.target).addClass("active");
  topButtonIndex = $(e.target).prevAll().length;
  $(".config_page").addClass("hidden");
  $("#" + $(e.target).children(":nth-child(2)").html()).removeClass("hidden");
}


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

function refreshMainSection(){
  $("#config_main").empty();
  //Main
  Object.keys(database_data).forEach(function(m){
    if(m == $("#config_top_tabs_container").children(":nth-child(" + (leftButtonIndex + 1) + ")").children(":nth-child(2)").html()){
      var item = '<div id="' + m + '" class="config_page"></div>';
    }else{
      var item = '<div id="' + m + '" class="config_page hidden"></div>';
    }
    $("#config_main").append(item);
    Object.keys(database_data[m]).forEach(function(k){
      var item = processControlType(k, database_data[m][k], m);
      $("#" + m).append(item);
    });
  });
}

getAdminConsole();

function processControlType(label, object, parentKey){
  var type = object["type"];
  var options = (object["options"] == null ? "" : object["options"]);
  var placeholder = (object["placeholder"] == null ? "" : object["placeholder"]);
  var info = (object["info"] == null ? "" : object["info"]);
  
  if(type == "info"){ //Info
    var item = '<div class="config_option" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><p>' + info + '</p></div>';
    
  }else if(type == "warn"){ //Warn
    var item = '<div class="config_option config_note" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><p>' + info + '</p></div>';
    
  }else if(type == "string"){ //String
    var item = '<div class="config_option" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><input type="text" value="' + placeholder + '" onchange="handleInput(event)"></div>';
    
  }else if(type == "dropdown"){ //Dropdown
    var item = '<div class="config_option" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><form>'
             +   '<select>';
    
    options.forEach(function(h){
      //if(kdata == h){
      //  item +=    '<option value="' + h + '" selected>' + h + '</option>';
      //}else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      //}
    });
    
       item +=   '</select>'
             + '</form>';
    
  }else if(type == "time"){ //Time
    var item = '<div class="config_option" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><form>'
             +   '<select>';
    
    options.forEach(function(h){
      //if(kdata[0] == h){
      //  item +=    '<option value="' + h + '" selected>' + h + '</option>';
      //}else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      //}
    });
    
       item +=   '</select>'
             + '</form>'
             + '<label> &#11834; </label>'
             + '<form>'
             +   '<select>';
    
    options.forEach(function(h){
      //if(kdata[1] == h){
      //  item +=    '<option value="' + h + '" selected>' + h + '</option>';
      //}else{
        item +=    '<option value="' + h + '">' + h + '</option>';
      //}
    });
    
       item +=   '</select>'
             + '</form>';
    
  }else if(type == "toggle"){ //Checkbox
    var item = '<div class="config_option" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><div class="checkboxesOuterBound">';
    options.forEach(function(h){
      //if(kdata.includes(h)){
      //  item +=    '<div class="checkboxesInnerBound"><input type="checkbox" name="' + h + '" value="' + h + '" checked><label for="' + h + '">' + h + '</label></div>';
      //}else{
        item +=    '<div class="checkboxesInnerBound"><input type="checkbox" name="' + h + '" value="' + h + '" onchange="handleInput(event)"><label for="' + h + '">' + h + '</label></div>';
      //}
    });
       item += '</div></div>';
    
  }else if(type == "output"){ //Output
    var item = '<div class="config_option" id="' + parentKey + '-' + label + '"><p class="label">' + label.split("_").join(" ") + ':</p><textarea rows="30" cols="70">' + info + '</textarea></div>';
    
  }
  
  return item;
}


function newConfig(){
  total_user_configs++;
  settings_data["Config-" + total_user_configs] = {};
  refreshLeft(total_user_configs);
}

function refreshLeft(activeTab){
  $("#config_left").empty();
  var i = 1;
  Object.keys(settings_data).forEach(function(k){
    if(i === activeTab){var active = " active";}else{var active = "";}
    var item = '<div id="' + k + '" class="config_left_tab' + active + '" onclick="switchLeftButton(event)"><span></span><p>' + k + '</p></div>';
    $("#config_left").append(item);
    i++;
  });
  var item = '<div id="new_config_button" onclick="newConfig()"><img src="../assets/icons/add_acrylic_lightblue_24dp.svg" draggable="false"><p>New Config</p></div>';
  $("#config_left").append(item);
}




function handleInput(event){
  var currentTab = $("#config_top_tabs_container").children().filter(".active").children(":nth-child(2)").html();
  console.log(currentTab + " " + $(event.target).attr("name"));
  
  var output = $("#config_output").html();
  if(currentTab == "Maps"){
    output += "&#13;&#10;";
    output += "ServerSettings.MapRotation.add(Maps.CTF.ArxNovena)";
  }
  
  
  $("#config_output").html(output);
}