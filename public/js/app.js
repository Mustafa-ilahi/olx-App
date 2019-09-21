
var emailRef = document.getElementById('email');
var passwordRef = document.getElementById('password');
var usernameRef = document.getElementById('username');
var phoneRef = document.getElementById('phone');
// var errorRef = document.getElementById('error');



function account() {
    location = "signup.html"
}


function signup() {
    let user = {
        email: emailRef.value,
        name: usernameRef.value,
        contact: phoneRef.value,

    }
    // location = "login.html"
    firebase.auth().createUserWithEmailAndPassword(emailRef.value, passwordRef.value)
        .then((success) => {
            firebase.database().ref(`users/${success.user.uid}`).set(user);
            // location = "signup.html"

        })
        .catch((error) => {
            console.error('something went wrong', error);

        })
}


function login() {
    var loginemail = document.getElementById("email");
    var loginPassword = document.getElementById("password");

    // if (loginemail == '' && loginPassword == '') {
    //     swal({
    //         title: "Please Fill Out This!",
    //         text: "You clicked the button!",
    //         icon: "success",
    //         button: "Aww yiss!",
    //       });


    console.log('login invoke', email.value, password.value);
    firebase.auth().signInWithEmailAndPassword(loginemail.value, loginPassword.value)
        .then((success) => {
            console.log('signin successfully', success.user);
            localStorage.setItem('currentUserUid', success.user.uid)
            location = './index.html';
        })
        .catch((error) => {
            console.log('something went wrong', error)
        })
}


function create() {
    location = "submitad.html"
}



function submitad() {
    var categoryRef = document.getElementById("category");
    var adtitleRef = document.getElementById("adtitle");
    var descriptionyRef = document.getElementById("description");
    var NameRef = document.getElementById("name");
    var PhoneNumberRef = document.getElementById("phone");
    var ProvinceRef = document.getElementById("province");
    var CityRef = document.getElementById("city");
    var galleryRef = document.getElementById("img");
    var modelRef = document.getElementById("model");
    var brandRef = document.getElementById("brand");
    var yearRef = document.getElementById("year");
    var priceRef = document.getElementById("price");
    // location = './index.html';
    var submitdata = {
        title: adtitleRef.value,
        category: categoryRef.value,
        description: descriptionyRef.value,
        name: NameRef.value,
        phone: PhoneNumberRef.value,
        province: ProvinceRef.value,
        city: CityRef.value,
        model: modelRef.value,
        brand: brandRef.value,
        year: yearRef.value,
        price: priceRef.value,
    }
    // console.log(submitdata)
    // var imgs = galleryRef.files[0];
    // let currentUserUid = localStorage.getItem('currentUserUid');
    // console.log(imgs);
    // if (imgs) {
    //     var file = imgs;
    //     console.log(file);
    //     // var imgType = 'image/jpeg'

    //     // var storageRef = 
    //     firebase.storage().ref().child('images').child(file.name).put(file)
    //         .then(function (snapshot) {
    //             // console.log(snapshot.ref.getDonwloadURL())
    //             snapshot.ref.then(function (downloadUrl) {
    //                 console.log(downloadUrl);
    //                 submitdata.imgUrl = downloadUrl;
    //                 firebase.database().ref(`categories/${submitdata.category}/${currentUserUid}/`).push(submitdata);
    //             });
    //         })
    // }

    var imgs = galleryRef.files[0];
    console.log(imgs);
    let currentUid = localStorage.getItem('currentUserUid');
    console.log(currentUid)
    if (imgs) {
        var file = imgs;
        firebase.storage().ref().child('images').child(file.name).put(file)
            .then(function (snapshot) {
                // console.log(snapshot);
                snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    //   console.log('File available at', downloadURL);
                    submitdata.imgUrl = downloadURL;
                    // console.log(submitdata)
                    firebase.database().ref(`categories/${submitdata.category}/${currentUid}/`).push(submitdata);

                });
            })
        adtitleRef.value = "";
        categoryRef.value = "";
        descriptionyRef.value = "";
        NameRef.value = "";
        PhoneNumberRef.value = "";
        ProvinceRef.value = "";
        CityRef.value = "";
        modelRef.value = "";
        brandRef.value = "";
        yearRef.value = "";
        yearRef.value = "";
        priceRef.value = "";
    }
}

var printdataRef = document.getElementById("printdata");
function fetchData() {
    // console.log("fetch");
    firebase.database().ref(`categories/`).on("child_added", function (data) {
        var printda = data.val();
        // console.log(printda);
        // var uidref = localStorage.getItem("currentUserUid");
        // console.log(uidref)
        for (var userKey in printda) {
            var printdata = printda[userKey];
            // console.log(printda[uidref]);
            for (var key in printdata) {
                // console.log(key)
                // console.log(printdata[key])
                var anchor = document.createElement('a')
                // console.log(anchor);
                anchor.href = "addprint.html"
                anchor.onclick = function () {
                    localStorage.setItem("CurrentAd", key);
                }
                var Vid1 = document.createElement('div');
                var Vid2 = document.createElement('div');
                var Vid3 = document.createElement('div');
                var sTag = document.createElement('span');
                // console.log(printdata[key].title)
                var titleNodetext = document.createTextNode(printdata[key].title);
                var image1 = document.createElement('img');

                Vid1.setAttribute('class', 'card');
                Vid2.setAttribute('class', 'thumbnail img');
                Vid3.setAttribute('class', 'text');
                image1.src = printdata[key].imgUrl;
                image1.setAttribute('ALT', `imgAds`);
                image1.setAttribute('id', 'img-size');
                anchor.appendChild(image1);
                Vid2.appendChild(anchor);
                Vid1.appendChild(Vid2);
                sTag.appendChild(titleNodetext);
                Vid3.appendChild(sTag);
                Vid1.appendChild(Vid3);
                printdataRef.appendChild(Vid1);
                // console.log( printdataRef[key])
            }
        }
    })

}

var singleDataRef = document.getElementById("single-data");
function fetchSingleAd() {

    var currentUser = localStorage.getItem("currentUserUid")

    let currentAdId = localStorage.getItem('CurrentAd');
    // console.log(currentUser)
    firebase.database().ref(`categories/`).on("child_added", function (data) {
        var categories = data.val();
        for (var userUid in categories) {
            // console.log(userUid)
            // console.log(userUid)
            var categoriesVal = categories[userUid]
            for (var key in categoriesVal) {
                if (key === currentAdId) {
                    singleDataRef.innerHTML = `
    <div class="adCard">
    <br>
   <br>
  <div class="adTittle">
    <span><b>${categoriesVal[key].title} </b></span>
   </div>
      
  </br>
    <div class="adImg">
    <img src="${categoriesVal[key].imgUrl}" alt="ads" height ="350px"width="450px">
 </div>
<br>

  </div>
   <table class="details fixed marginbott20 margintop5" width="609" cellpadding="0" cellspacing="0">
    <tbody>
    <tr class="brbottdashc8">
  <td class="" width="203">
 <div class="pding5_10">
    <i>  Brand: </i>
    <strong class="block">
     ${categoriesVal[key].brand}
     </strong>
    </div>
   </td>
    <td class="" width="203">
  <div class="pding5_10">
   <i> Model:</i>
   <strong class="block">
    <b> ${categoriesVal[key].model}</b>
     </strong>
     </div>
    </td>
      <td class="" width="203">
         <div class="pding5_10">
     <i> Year: </i>
       <strong class="block">
      ${categoriesVal[key].year}
       </strong>
    </td>
     </tr>
    </tbody>
        </table>
    </br>
       
 <div class="clr" id="textContent">
   <p class="pding10 large"><b>${categoriesVal[key].description}</b>
    </p>
    <br>
   <br>
    </div>
    <div class= "btns">
     <button onclick="addFav()" class="favourite">Add To Fav</button>
    <button onclick="chat()" class="msg">Message</button>
    </div>;`

                }
            }
        }
    });

}


function searchData() {
    console.log("hello")
    var searchingDivRef = document.getElementById("printSearchData");
    var input, searchValue;
    input = document.getElementById("searchText");
    searchValue = input.value;
    console.log(searchValue);
    // location = "search-data.html"
    var searchValueLower = searchValue.toLowerCase();
    searchingDivRef.style.display = "none";
    // console.log(input.value);
    firebase.database().ref(`categories/`).on("value", function (data) {
        var categories = data.val();
        // console.log(categories)
        for (var key in categories) {
            for (var childKey in categories[key]) {
                var childKeyRef = categories[key][childKey];
                for (var grandChild in childKeyRef) {
                    var categoriesObject = childKeyRef[grandChild];
                    // console.log(categoriesObject)
                    var categoriesValue = categoriesObject.title;
                    var categoriesValueLower = categoriesValue.toLowerCase();
                    var searcVal = categoriesValueLower.indexOf(searchValueLower);
                    var categoriesValueToLOwer = key.toLowerCase();
                    printdataRef.style.display = "none";
                    console.log(searcVal)
                    if (searcVal !== -1) {
                        searchingDivRef.style.display = "block";
                        searchingDivRef.innerHTML += `<div class="span9">
   <div class="well well-small" id = "divSearch">
  <div class="row-fluid" >
   <div class="span2"  id="searchimgaeDiv">	
      <a href="product_details.html">    
     <img src="${categoriesObject.imgUrl}" alt="img" id="searchimage" height="300px" width="250px"> 
         </a>
  </div>
   <div class="span6">
    <h5>${categoriesObject.title}</h5>
   <p>
 <b> ${categoriesObject.description}</b>
     </p>
   </div>
     <div class="span4 alignR pull-right">
 <div class="form-horizontal qtyFrm">
   <h3><b>${categoriesObject.price}</b> PKR</h3>
   <br>
   <br>
    </div>
    </div>
   </div>
       </div>
      </div>`;
                    }
                    else if (searchValueLower === categoriesValueToLOwer) {
                        searchingDivRef.style.display = "block";
                        searchingDivRef.innerHTML += `<div class="span9">
       <div class="well well-small" id = "divSearch">
     <div class="row-fluid" >
    <div class="span2" id="searchimgaeDiv">	
     <a href="product_details.html">    
     <img src="${categoriesObject.imgUrl}" alt="img" id="searchimgae"> 
    </a>
 </div>
   <div class="span6">
     <h5>${categoriesObject.title}</h5>
  <p>
  ${categoriesObject.description}
 </p>
    </div>
 <div class="span4 alignR pull-right">
   <div class="form-horizontal qtyFrm">
    <h3>${categoriesObject.price} PKR</h3>
 </div>
    </div>
 </div>
 </div> ;`

                    }
                }
            }
        }
    })

}


function chat() {
    location = 'chat.html'
}

var senderName;
function chatData() {
    var mgsSeenRef = document.getElementById("chatData")
    db.ref("users/chatRoom/").on("child_added", (users) => {
        // var nameAnchor;
        var messageData = users.val();
        var currentuserUid = firebase.auth().currentUser.uid;
        if (messageData.reciverId === currentuserUid) {
            db.ref("users/").once("value", (users) => {
                var userData = users.val()
                for (var key in userData) {
                    var mgsSenderDetail = userData[key];
                    if (key === messageData.senderId) {
                        senderName = mgsSenderDetail.name;
                        var na;
                        var nameAnchor = document.createElement('a');
                        var newDiv = document.createElement('div');
                        var name = document.createTextNode(senderName);
                        nameAnchor.appendChild(name);
                        var breakLine = document.createElement('br');
                        nameAnchor.href = 'chatBox.html';
                        nameAnchor.appendChild(breakLine);
                        nameAnchor.onclick = function () {
                            opponentUid = messageData.senderId;
                            localStorage.setItem("opponentUid", opponentUid);
                        }
                        if (senderName !== na) {
                            mgsSeenRef.appendChild(newDiv).appendChild(nameAnchor)
                            console.log(mgsSeenRef)
                        }
                    }
                    na = senderName;
                }
            })

        }
    })
    justForHidden();
    hidenSubmitBtn();
    // return;
}

// fav ads//

function addFav() {
    // console.log(currentUserUid)
    var currentAdId = localStorage.getItem("CurrentAd");
    var currentUserUid = localStorage.getItem("currentUserUid");

    firebase.database().ref('categories/').on("child_added", (data) => {
        var categories = data.val();
        for (var key in categories) {
            var categoriesData = categories[key]
            for (var childKey in categoriesData) {
                // console.log(childKey)
                var childKeyRef = categoriesData[childKey];
                if (childKey === currentAdId) {
                    console.log(childKeyRef);

                    firebase.database().ref(`/users/${currentUserUid}/fav-Ads/${childKey}/`).set(childKeyRef)
                }
            }
        }

    })
    // localStorage.setItem("favAds", JSON.stringify(favAddCache))
}


var flagShow = false;
var favAdsobj = {};
var num = 0;
function fetchFavAds() {
    var favAddRef = document.getElementById('addFav');
    num = 0;
    var favAdsOfflineShow = [];
    var currentUid = localStorage.getItem("currentUserUid");
    firebase.database().ref(`/users/${currentUid}/fav-Ads/`).once("value", (data) => {
        var favAd = data.val();
        for (var key in favAd) {
            var favData = favAd[key];
            // // console.log(favData);
            favAdsOfflineShow[num] = favData;
            num++;
        }
        console.log(favAdsOfflineShow)
        localStorage.setItem('favouritAds', JSON.stringify(favAdsOfflineShow));
    })


    var favAdData = JSON.parse(localStorage.getItem("favouritAds"));
    console.log(favAdData);

    for (var i = 0; i < favAdData.length; i++) {
        console.log(favAdData[i].name)
        var databaseData = favAdStructure("a", "li", "div", "div", "p", "p", "strong", "img", favAdData[i].imgUrl, "br", favAdData[i].title, favAdData[i].phone, "h4", "a");
        favAddRef.appendChild(databaseData);
        console.log(databaseData)
    }
}


function favAdStructure(anchorTag, li, div1, div2, para1, para2, strongTag, imgTag, imgsUrl, lineBreak, titleText, addPrice, h4Tag, buttonAnchor) {
    var anchor = document.createElement(anchorTag);
    anchor.href = "addprint.html";
    anchor.onclick = function () {
        // localStorage.setItem("CurrentAd", addKey);
    }
    var liEl = document.createElement(li);
    var imageDiv = document.createElement(div1);
    var textDiv = document.createElement(div2);
    var title = document.createElement(para1);
    var lineBreakTag = document.createElement(lineBreak)
    var price = document.createElement(para2);
    var priceStrong = document.createElement(strongTag);
    var img1 = document.createElement(imgTag);
    var anchorbtn = document.createElement(buttonAnchor);
    var h4TagAnchorBtn = document.createElement(h4Tag);


    img1.src = imgsUrl;
    var titleTextNode = document.createTextNode(titleText);
    title.appendChild(titleTextNode);
    var priceStrongTextNode = document.createTextNode(`${addPrice} PKR`);
    priceStrong.appendChild(priceStrongTextNode);


    img1.setAttribute('alt', `imgAds `);
    img1.setAttribute('id', 'FavImage')
    anchorbtn.innerHTML = "Remove From Fav";
    anchorbtn.setAttribute("class", "shopBtn")
    anchorbtn.setAttribute("onclick", "removeFav()")
    liEl.setAttribute("class", "span3");
    imageDiv.setAttribute("class", "thumbnail");
    imageDiv.setAttribute("id", "mainDivFav");
    textDiv.setAttribute("id", "captionFav")
    textDiv.setAttribute("class", "caption cntr");
    title.setAttribute("id", "favTittle")
    price.setAttribute("id", "favPrices");

    anchor.appendChild(img1);
    textDiv.appendChild(title);
    textDiv.appendChild(lineBreakTag)
    price.appendChild(priceStrong)
    textDiv.appendChild(price);
    h4TagAnchorBtn.appendChild(anchorbtn)
    // textDiv.appendChild(h4TagAnchorBtn)
    imageDiv.appendChild(anchor);
    imageDiv.appendChild(textDiv)
    liEl.appendChild(imageDiv);
    return liEl;
}







// Progressive Web App//

if ("serviceWorker" in navigator) {
    console.log("Service Worker is supported");

    // if service worker supported then register my service worker
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (reg) {
            console.log("Successfully Register :^)", reg);

            reg.pushManager
                .subscribe({
                    userVisibleOnly: true
                })
                .then(function (subscription) {
                    console.log("subscription:", subscription.toJSON());
                    // GCM were used this endpoint
                    console.log("endpoint:", subscription.endpoint);
                });
        })
        .catch(function (error) {
            console.log("SW Registration Failed: :^(", error);
        });
}


