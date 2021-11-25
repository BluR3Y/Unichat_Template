
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
    groupItem.setAttribute("onmouseenter","hiddenGroupInfoShow(this)");
    groupItem.setAttribute("onmouseleave","hiddenGroupInfoHide(this)");
    

    let groupImgCont = document.createElement("div");
    groupImgCont.setAttribute("class","groupImgCont");
    let groupImgObj = document.createElement("img");
    groupImgObj.setAttribute("src",`../uploads/${groupImg}`);
    groupImgCont.appendChild(groupImgObj);

    let groupHiddenCont = document.createElement("div");
    groupHiddenCont.setAttribute("class", "groupHiddenCont");
    let hiddenPointer = document.createElement("div");
    hiddenPointer.setAttribute("class","groupHiddenPointer");
    groupHiddenCont.appendChild(hiddenPointer);
    let hiddenInfo = document.createElement("div");
    hiddenInfo.setAttribute("class","groupHiddenInfo");
    let hiddenInfo_name = document.createElement("h1");
    hiddenInfo_name.setAttribute("class","groupNameHidden");
    let hiddenNameText = document.createTextNode(groupName);
    hiddenInfo_name.appendChild(hiddenNameText);
    hiddenInfo.appendChild(hiddenInfo_name);
    groupHiddenCont.appendChild(hiddenInfo);
    groupImgCont.appendChild(groupHiddenCont);


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

function hiddenGroupInfoShow(el){
    let sideNav = document.getElementsByClassName("sideNav")[0];
    let elHiddenCont = el.getElementsByClassName("groupHiddenCont")[0];
    let elPosition = el.getBoundingClientRect();
    let position_Y = elPosition.y;

    if(!sideNav.classList.contains("showSideNav")){
        elHiddenCont.style.top = `${position_Y - 120}px`;
        elHiddenCont.style.display = "flex";
    }
}

function hiddenGroupInfoHide(el){
    let elHiddenCont = el.getElementsByClassName("groupHiddenCont")[0];
    let sideNav = document.getElementsByClassName("sideNav")[0];

    if(!sideNav.classList.contains("showSideNav")){
        elHiddenCont.style.display = "none";
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

    friendItem.setAttribute("onclick","openDirectMessage()");

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

// const testObject = {
//     disabled : false,
//     hiddenInfo : (function(val){
//         if(!this.disabled){
//             printVal(val);
//         }
//     })
// };

// function printVal(val){
//     console.log(val);
// }

// testObject.hiddenInfo(4);
// testObject.disabled = true;
// testObject.hiddenInfo(6);
// testObject.disabled = false;
// testObject.hiddenInfo(9);


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

function dimPage(objectCaller){
    let pageDimmer = document.getElementsByClassName("pageDimmer")[0];

    pageDimmer.style.display = "block";
    pageDimmer.setAttribute("onclick",`dimmerClicked('${objectCaller}')`);
}
function undimPage(){
    let pageDimmer = document.getElementsByClassName("pageDimmer")[0];

    pageDimmer.style.display = "none";
    pageDimmer.removeAttribute("onclick");
}

function dimmerClicked(objectCaller){
    if(objectCaller === "addGroupForm"){
        closeAddGroupForm();
    }
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

function openAddGroupForm(){
    let form = document.getElementsByClassName("addGroupForm")[0];
    form.style.display = "flex";
    dimPage("addGroupForm");
}
function closeAddGroupForm(){
    let form = document.getElementsByClassName("addGroupForm")[0];
    form.style.display = "none";

    let createForm = document.getElementsByClassName("createGroupCont")[0];
    let selectionForm = document.getElementsByClassName("groupSelectionCont")[0];

    if(selectionForm.style.width !== "100%"){
        selectionForm.style.width = "100%";
    }
    if(createForm.style.width !== "0"){
        createForm.style.width = "0";
    }

    undimPage();
}

function createGroupForm(){
    let createForm = document.getElementsByClassName("createGroupCont")[0];
    let selectionForm = document.getElementsByClassName("groupSelectionCont")[0];

    selectionForm.style.width = "0";
    createForm.style.width = "100%";

    selectionForm.style.transition = "width 1s ease";
    createForm.style.transition = "width 1s ease";
}

function createUserGroup()
{
    let createForm = document.getElementsByClassName("createGroupCont")[0];
    let groupName = createForm.elements["createGroup_name"].value;

    if(groupName !== ""){
        let createGroup_data = new FormData();
        let createGroup_xhr = new XMLHttpRequest();

        createGroup_data.append("user_id", localStorage.getItem("user_id"));
        createGroup_data.append("group_name", groupName);

        createGroup_xhr.open("POST",'/createUserGroup',true);
        createGroup_xhr.onreadystatechange = function(){
            if(createGroup_xhr,this.readyState === 4){
                if(createGroup_xhr.status === 200){
                    var response = JSON.parse(createGroup_xhr.responseText);
                    // console.log(response.status, response.reason);
                    if(response.status === "success"){
                        createGroupItem(1,1,1,1);
                    }
                }
            }
        }
        createGroup_xhr.send(createGroup_data);

        closeAddGroupForm();
    }else{
        console.log("empty");
    }
}

function openDirectMessage(){
    
    let defaultDisplay = document.getElementsByClassName("defaultMainDisplay")[0];
    let directMessage = document.getElementsByClassName("directMessageDisplay")[0];

    defaultDisplay.style.display = "none";
    directMessage.style.display = "block";

    showSideNav();
}

function createDirectMessage(event){
    event.preventDefault();

    let inputElem = event.target.elements["inputTextDM"];

    console.log(inputElem.value);
}



// for(var i=0; i < 15; i++){
//     createGroupItem(`Test Group #${i}`,100,50,"https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg");
// }

// for(var i=0; i < 25; i++){
//     createFriendItem(`Name #${i}`,"https://media.istockphoto.com/photos/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a-picture-id1139459625?b=1&k=20&m=1139459625&s=170667a&w=0&h=zVpBlAmdwUDWIVf0Zxtb3idMCitol4nzII2qde8Ybag=");
// }