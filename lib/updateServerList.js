function updateServerList(){
  $("#pageContent").empty();
  var item = '<div class="heading"><p>OOTB&nbsp;Servers:</p></div>'
           + '<div id="OOTB-SRVLST" class="contentSection noclick"></div>';
  $("#pageContent").append(item);
  var item = '<div class="heading"><p>GOTY&nbsp;Servers:</p></div>'
           + '<div id="GOTY-SRVLST" class="contentSection noclick"></div>';
  $("#pageContent").append(item);
  
  sdata["online_servers_list"].forEach(function(d){
    var serverStatus = "Online";
    var serverName = d["name"];
    var serverMap = d["map"];
    var serverPlayers = d["players"];
    
    var item = '<div class="serverItem" onclick="showPlayers(event)" title="' + d["mode"].toUpperCase() + " | " + serverName + " | " + d["type"] + " | " + serverMap + " | " + serverPlayers.length + (serverPlayers.length == 1 ? " player" : " players") + '">'
             +   '<div class="serverItemInner" >'
             +     '<div class="serverItemStatusIndicator ' + serverStatus + '" title="' + serverStatus + '"></div>'
             +     '<div class="serverItemInfo ' + d["mode"].toUpperCase() + '-MODE" title="Server Type">' + d["mode"].toUpperCase() + '</div>'
             +     '<div class="serverItemInfo" title="' + serverName + '">' + serverName + '</div>'
             +     '<div class="serverItemInfo" title="Game Mode">' + d["type"] + '</div>'
             +     '<div class="serverItemInfo" title="Map">' + serverMap + '</div>'
             +     '<div class="serverItemInfo" title="Players"><p>' + serverPlayers.length + '</p><img src="../assets/icons/list_black_24dp.svg" draggable="false"></div>'
             +   '</div>'
             + '</div>';
    
    $("#" + d["mode"].toUpperCase() + "-SRVLST").append(item); //Append to either the OOTB or GOTY list
    
    item = '<div class="playerList hidden">'
    if(serverPlayers.length > 0){
      d["players"].forEach(function(p){
        item +=  '<div class="playerItem">'
             +     '<div class="playerItemInner"><img src="../assets/icons/person_24dp.svg" draggable="false"><p>' + p + '</p></div>'
             +   '</div>';
      });
    }else{
      if(serverStatus == "Offline"){
        item +=  '<div class="playerItem">'
             +     '<div class="playerItemInner"><p><i>Server is offline.</i></p></div>'
             +   '</div>';
      }else{
        item +=  '<div class="playerItem">'
             +     '<div class="playerItemInner"><p><i>Server is empty.</i></p></div>'
             +   '</div>';
      }
    }
    item += '</div>';
    $("#" + d["mode"].toUpperCase() + "-SRVLST").append(item);
  });
  $(".contentSection").removeClass("noclick");
}

function showPlayers(e){
  if($(e.target).next().hasClass("hidden")){
    $(e.target).next().removeClass("hidden");
  }else{
    $(e.target).next().addClass("hidden");
  }
}

function updateCurrentlyOnline(){
  var n = 0;
  if(sdata["online_players_list"].indexOf("taserverbot") != -1){ //If the taserverbot is in the player list
    n = sdata["online_players_list"].length - 1;
  }else{
    n = sdata["online_players_list"].length;
  }
  $("#alert").children(":nth-child(2)").html("(Community) Currently Online: " + n);
  
  currentSteamPlayers = parseInt(hdata.response.player_count);
  if(currentSteamPlayers < 0){currentSteamPlayers = 0;} //Clamp min at 0
  $("#hirez").children(":nth-child(2)").html("(Hi-Rez) Currently Online: " + currentSteamPlayers);
}

function getListOfServerOwners(){
  var ownersList = [];
  Object.keys(rdata).forEach(function(k){
    var n = rdata[k]["owner"];
    if(!ownersList.includes(n)){
      ownersList.push(n);
    }
  });
  return ownersList;
}