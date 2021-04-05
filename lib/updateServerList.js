function updateServerList(){
  Object.keys(rdata).forEach(function(k){
    var serverStatus = "Offline";
    var serverMap = "";
    var serverPlayers = 0;
    Object.keys(sdata["online_servers"]).forEach(function(c){
      if(k == c){
        serverStatus = "Online";
        serverMap = sdata["online_servers"][k]["map"];
        serverPlayers = sdata["online_servers"][k]["players"].length;
      }
    });
    
    var item = '<div class="serverItem" onclick="showPlayers(event)">'
             +   '<div class="serverItemInner">'
             +     '<div class="serverItemStatusIndicator ' + serverStatus + '" title="' + serverStatus + '"></div>'
             +     '<div class="serverItemInfo" title="Server Type">' + rdata[k]["mode"] + '</div>'
             +     '<div class="serverItemInfo" title="' + k + '">' + k + '</div>'
             +     '<div class="serverItemInfo" title="Game Mode">' + rdata[k]["type"] + '</div>'
             +     '<div class="serverItemInfo" title="Map">' + serverMap + '</div>'
             +     '<div class="serverItemInfo" title="Players"><p>' + serverPlayers + '</p><img src="../icons/list_black_24dp.svg" draggable="false"></div>'
             +   '</div>'
             + '</div>';
    
    $("#" + rdata[k]["owner"]).append(item);
    
    item = '<div class="playerList hidden">'
    if(serverPlayers > 0){
      sdata["online_servers"][k]["players"].forEach(function(p){
        item +=  '<div class="playerItem">'
             +     '<div class="playerItemInner"><img src="../icons/person_24dp.svg" draggable="false"><p>' + p + '</p></div>'
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
    $("#" + rdata[k]["owner"]).append(item);
  });
}

function showPlayers(e){
  if($(e.target).next().hasClass("hidden")){
    $(e.target).next().removeClass("hidden");
  }else{
    $(e.target).next().addClass("hidden");
  }
}

function updateCurrentlyOnline(){
  $(".alert").children(":nth-child(2)").html("Currently Online: " + sdata["online_players"]);
}