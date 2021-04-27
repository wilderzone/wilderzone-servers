function updateServerList(){
  $("#pageContent").empty();
  var item = '<div class="heading">OOTB Servers:</div>'
           + '<div id="OOTB-SRVLST" class="contentSection noclick"></div>';
  $("#pageContent").append(item);
  var item = '<div class="heading">GOTY Servers:</div>'
           + '<div id="GOTY-SRVLST" class="contentSection noclick"></div>';
  $("#pageContent").append(item);
  
  sdata["online_servers_list"].forEach(function(d){
    var serverStatus = "Online";
    var serverMap = d["map"];
    var serverPlayers = d["players"];
    
    var item = '<div class="serverItem" onclick="showPlayers(event)">'
             +   '<div class="serverItemInner">'
             +     '<div class="serverItemStatusIndicator ' + serverStatus + '" title="' + serverStatus + '"></div>'
             //+     '<div class="serverItemInfo" title="Server Type">' + d["mode"] + '</div>'
             +     '<div class="serverItemInfo" title="' + d["name"] + '">' + d["name"] + '</div>'
             +     '<div class="serverItemInfo" title="Game Mode">' + d["type"] + '</div>'
             +     '<div class="serverItemInfo" title="Map">' + serverMap + '</div>'
             +     '<div class="serverItemInfo" title="Players"><p>' + serverPlayers.length + '</p><img src="../icons/list_black_24dp.svg" draggable="false"></div>'
             +   '</div>'
             + '</div>';
    
    $("#" + d["mode"] + "-SRVLST").append(item); //Append to either the OOTB or GOTY list
    
    item = '<div class="playerList hidden">'
    if(serverPlayers.length > 0){
      d["players"].forEach(function(p){
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
    $("#" + d["mode"] + "-SRVLST").append(item);
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
  $(".alert").children(":nth-child(2)").html("Currently Online: " + sdata["online_players_list"].length);
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