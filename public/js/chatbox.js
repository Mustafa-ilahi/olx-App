// For Chat //


var sendInputRef = document.getElementById("usermsg")
var currentName;
var ul = document.getElementById("chatRoom");
function sendNewMgs() {
    var currentuserUid = localStorage.getItem('currentUserUid');
    let currentAdId = localStorage.getItem('CurrentAd');
    var messageObject;
    var mgsNew = sendInputRef.value;
    firebase.auth().onAuthStateChanged(function (currentuser) {
        if (currentuser) {
            firebase.database().ref(`categories/`).on("child_added", function (data) {
                var categories = data.val();
                for (var adUid in categories) {
                    detailCategories = categories[adUid];
                    for (var addKey in detailCategories) {
                        if (addKey === currentAdId) {
                            // console.log(addKey)
                            firebase.database().ref("users/").once("value", (users) => {

                                var date = new Date();

                                messageObject = {
                                    senderId: currentuserUid,
                                    reciverId: adUid,
                                    message: mgsNew,
                                    time: date.getTime()
                                }

                                // console.log(messageObject)
                                firebase.database().ref(`users/chatRoom/`).push(messageObject);
                            })
                        }
                    }
                }
            })
            sendInputRef.value = '';
        }
    })
}

var senderName;

function chatData() {

    var nameRef = document.getElementById("chat")
    var currentuserUid = localStorage.getItem('currentUserUid');
    firebase.database().ref("users/chatRoom/").on("child_added", (users) => {
        var messageData = users.val();
        // console.log(messageData.senderId === currentuserUid);
        console.log(currentuserUid)
        console.log(messageData)

        if (messageData.reciverId === currentuserUid) {
            firebase.database().ref("users/").once("value", (users) => {
                var userData = users.val()
                for (var key in userData) {
                    var mgsSenderDetail = userData[key];
                    // for (var messge in mgsSenderDetail) {
                    //     var detail = mgsSenderDetail[messge];
                    // console.log(mgsSenderDetail[messge].senderId)
                    if (key === messageData.senderId) {
                        var x;
                        senderName = mgsSenderDetail.name;
                        var nameAnchor = document.createElement('a');
                        var newDiv = document.createElement('div')
                        var name = document.createTextNode(senderName);
                        nameAnchor.appendChild(name);
                        var bearkLine = document.createElement('br');
                        nameAnchor.href = 'chatbox.html';
                        nameAnchor.appendChild(bearkLine);
                        nameAnchor.onclick = function () {
                            var opponentUid = messageData.senderId;
                            localStorage.setItem("opponentUid", opponentUid)
                        }
                        if (x !== senderName) {
                            nameRef.appendChild(newDiv).appendChild(nameAnchor);
                        }
                    }
                    x = senderName;
                }
                // }
            })
        }
    })
}




function replyMgs() {
    var messageObj;
    var message = sendInputRef.value;
    firebase.database().ref("users/chatRoom/").on("child_added", (users) => {
        var currentuserUid = localStorage.getItem("currentUserUid");
        mgsArrFr = users.val();
        var date = new Date();
        // console.log(mgsArrFr);
        // console.log( mgsArrFr.reciverId)
        if (currentuserUid == mgsArrFr.reciverId) {
            messageObj = {
                senderId: currentuserUid,
                reciverId: mgsArrFr.senderId,
                message: message,
                time: date.getTime()
            }
            // console.log(messageObj)
        }
    })
    firebase.database().ref(`users/chatRoom/`).push(messageObj);
    sendInputRef.value = '';
}
