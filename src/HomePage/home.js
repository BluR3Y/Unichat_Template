
document.getElementsByClassName("sideNav")[0].onload = (()=>{
    let userImgCont = document.getElementsByClassName("userImgCont")[0];
    userImgCont.querySelector("img").setAttribute("src",`../uploads/${localStorage.getItem("user_img")}`);

    let userInfo = document.getElementsByClassName("userInfo")[0];
    userInfo.querySelector("h1").innerHTML = localStorage.getItem("user_name");
    userInfo.querySelector("h2").innerHTML = localStorage.getItem("user_tag");

})();


function showSideNav(){
    let sideNav = document.getElementsByClassName("sideNav")[0];

    if(sideNav.classList.contains("showSideNav")){
        sideNav.classList.remove("showSideNav");
    }else{
        sideNav.classList.add("showSideNav");
    }
}

function createGroupItem(groupData){
//groupId,groupName,groupMembers,groupOnline,groupImg

    let groupId = groupData[0];
    let groupName = groupData[2];
    let groupMembers = 100;
    let groupOnline = 50;
    let groupImg = groupData[4];

    let groupCont = document.getElementsByClassName("userGroups")[0];

    let groupItem = document.createElement("div");
    groupItem.setAttribute("class","userGroupItem");
    groupItem.setAttribute("onmouseenter","groupHiddenInfoShow(this.getBoundingClientRect())");
    groupItem.setAttribute("onmouseleave","groupHiddenInfoHide()");

    let groupImgCont = document.createElement("div");
    groupImgCont.setAttribute("class","groupImgCont");
    let groupImgObj = document.createElement("img");
    groupImgObj.setAttribute("src",`../uploads/${groupImg}`);
    groupImgCont.appendChild(groupImgObj);
    groupItem.appendChild(groupImgCont);

    let groupInfo = document.createElement("div");
    groupInfo.setAttribute("class","groupInfo");
    let groupNameObj = document.createElement("h1");
    groupNameObj.setAttribute("class","groupName");
    let groupNameText = document.createTextNode(groupName);
    groupNameObj.appendChild(groupNameText);
    groupInfo.appendChild(groupNameObj);

    let groupStats = document.createElement("div");
    groupStats.setAttribute("class","groupStats");
    let members = document.createElement("h1");
    members.setAttribute("class","groupMembers");
    let membersText = document.createTextNode("Members: ");
    let membersAmount = document.createElement("span");
    let membersAmountText = document.createTextNode(`${groupMembers}`);
    membersAmount.appendChild(membersAmountText);
    members.appendChild(membersText);
    members.appendChild(membersAmount);
    groupStats.appendChild(members);

    let membersOnline = document.createElement("h1");
    membersOnline.setAttribute("class","groupOnlineMembers");
    let onlineText = document.createTextNode("Online: ");
    let onlineAmount = document.createElement("span");
    let onlineAmountText = document.createTextNode(`${groupOnline}`);
    onlineAmount.appendChild(onlineAmountText);
    membersOnline.appendChild(onlineText);
    membersOnline.appendChild(onlineAmount);
    groupStats.appendChild(membersOnline);
    groupInfo.appendChild(groupStats);
    groupItem.appendChild(groupInfo);

    groupCont.appendChild(groupItem);
}

function groupHiddenInfoShow(elementInfo){
    let sideNav = document.getElementsByClassName("sideNav")[0];
    if(!sideNav.classList.contains("showSideNav")){
        let hiddenCont = document.getElementsByClassName("groupHiddenCont")[0];
        hiddenCont.style.top = `${elementInfo.top - 120}px`;
        hiddenCont.style.display = "flex";
    }
}
function groupHiddenInfoHide(){
    let sideNav = document.getElementsByClassName("sideNav")[0];

    if(!sideNav.classList.contains("showSideNav")){
        let hiddenCont = document.getElementsByClassName("groupHiddenCont")[0];
        hiddenCont.style.display = "none";
    }
}

function createFriendItem(friendData){
//friendName,friendImg

    let friendId = friendData[0];
    let friendName = friendData[1];
    let friendTag = friendData[2];
    let friendImg = friendData[3];

    let friendList = document.getElementsByClassName("userFriendsCont")[0];

    let friendItem = document.createElement("div");
    friendItem.setAttribute("class","userFriendItem");

    let friendImgCont = document.createElement("div");
    friendImgCont.setAttribute("class","friendImgCont");
    let friendImgObj = document.createElement("img");
    friendImgObj.setAttribute("src",`../uploads/${friendImg}`);
    friendImgCont.appendChild(friendImgObj);
    friendItem.appendChild(friendImgCont);

    let friendNameCont = document.createElement("div");
    friendNameCont.setAttribute("class","friendNameCont");
    let friendNameObj = document.createElement("h1");
    let friendNameText = document.createTextNode(friendName);
    friendNameObj.appendChild(friendNameText);
    friendNameCont.appendChild(friendNameObj);
    friendItem.appendChild(friendNameCont);

    friendList.appendChild(friendItem);
}

function scrollFriendList(scrollDirection){
    let friendList = document.getElementsByClassName("userFriendsCont")[0];
    if(scrollDirection < 0){
        friendList.scrollLeft += 30;
    }else{
        friendList.scrollLeft -= 30;
    }
}

function getUserGroups(){
    var selectedFilter = (()=>{
        if(document.getElementsByClassName('groupFilterItem')[0].classList.contains('selectedGroupFilter')){
            return 0;
        }else if(document.getElementsByClassName('groupFilterItem')[1].classList.contains('selectedGroupFilter')){
            return 1;
        }else if(document.getElementsByClassName('groupFilterItem')[2].classList.contains('selectedGroupFilter')){
            return 2;
        }else{
            console.log('error with selection');
        }
    })();

    var userGroups_data = new FormData();
    var userGroups_xhr = new XMLHttpRequest();

    userGroups_data.append('user_id', localStorage.getItem('user_id'));
    userGroups_data.append('filter',selectedFilter);
    clearUserGroups();
    // userGroupLoader_show();
    userGroups_xhr.open("POST", "/getUserGroups", true);
    userGroups_xhr.onreadystatechange = function(){
        if(userGroups_xhr.readyState === 4){
            if(userGroups_xhr.status === 200){
                var response = JSON.parse(userGroups_xhr.responseText);
                // userGroupLoader_hide();
                var userGroups = response.groups;
                if(userGroups !== null){
                    // userGroups.forEach(group => createGroupItem(group));
                    // console.log(userGroups);
                    // createGroupItems(userGroups);
                    userGroups.forEach(element => {
                        createGroupItem(element)
                    });
                }else{
                    console.log('empty');
                }
            }
        }
    }
    userGroups_xhr.send(userGroups_data);
    console.log(localStorage.getItem('user_id'));
}
function clearUserGroups(){
    document.getElementsByClassName('userGroups')[0].querySelectorAll('.userGroupItem').forEach(function(a){
        a.remove();
    })
}

function getUserFriends(){
    var selectedFilter = (()=>{
        if(document.getElementsByClassName('friendFilterItem')[0].classList.contains('selectedFriendFilter')){
            return 0;
        }else if(document.getElementsByClassName('friendFilterItem')[1].classList.contains('selectedFriendFilter')){
            return 1;
        }
    })();

    var userFriends_data = new FormData();
    var userFriends_xhr = new XMLHttpRequest();

    userFriends_data.append('user_id', localStorage.getItem('user_id'));
    userFriends_data.append('filter',selectedFilter);
    clearUserFriends();
    // userFriendLoader_show();
    userFriends_xhr.open("POST",'/getUserFriends',true);
    userFriends_xhr.onreadystatechange = function(){
        if(userFriends_xhr.readyState === 4){
            if(userFriends_xhr.status === 200){
                var response = JSON.parse(userFriends_xhr.responseText);
                // userFriendLoader_hide();
                var userFriends = response.friends;
                if(userFriends !== null){
                    // createFriendItems(userFriends);
                    userFriends.forEach(element =>{
                        createFriendItem(element);
                    });
                }else{
                    console.log('no friends :(');
                }
            }
        }
    }
    userFriends_xhr.send(userFriends_data);
}
function clearUserFriends(){
    document.getElementsByClassName('userFriendsCont')[0].querySelectorAll('.userFriendItem').forEach(function(a){
        a.remove();
    })
}

function setGroupFilter(index){
    var groupFilters = document.getElementsByClassName('groupFilterItem');
    for(var i=0; i < groupFilters.length; i++){
        if(groupFilters[i].classList.contains('selectedGroupFilter')){
            groupFilters[i].classList.remove('selectedGroupFilter');
        }
    }
    groupFilters[index].classList.add('selectedGroupFilter');
    getUserGroups();
}

function setFriendFilter(index){
    var friendFilter = document.getElementsByClassName('friendFilterItem');
    for(var i=0; i < friendFilter.length; i++){
        if(friendFilter[i].classList.contains('selectedFriendFilter')){
            friendFilter[i].classList.remove('selectedFriendFilter');
        }
    }
    friendFilter[index].classList.add('selectedFriendFilter');
    getUserFriends();
}

document.getElementsByClassName("groupCont")[0].onload = (()=>{
    getUserGroups();
})();
document.getElementsByClassName("userFriendsCont")[0].onload = (()=>{
    getUserFriends();
})();


function createGroupForm(){
    let createForm = document.getElementsByClassName("createGroupCont")[0];
    let selectionForm = document.getElementsByClassName("groupSelectionCont")[0];

    selectionForm.style.width = "0";
    createForm.style.width = "100%";

    selectionForm.style.transition = "width 1s ease";
    createForm.style.transition = "width 1s ease";
}

function joinGroupForm(){
    
}


// for(var i=0; i < 15; i++){
//     createGroupItem(`Test Group #${i}`,100,50,"https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg");
// }

// for(var i=0; i < 25; i++){
//     createFriendItem(`Name #${i}`,"https://media.istockphoto.com/photos/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a-picture-id1139459625?b=1&k=20&m=1139459625&s=170667a&w=0&h=zVpBlAmdwUDWIVf0Zxtb3idMCitol4nzII2qde8Ybag=");
// }