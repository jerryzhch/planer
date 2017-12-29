document.getElementById("demopage").setAttribute("datapage", semname);
document.getElementById("demopage").setAttribute("id", semname);
var newPage = document.getElementById("temp").innerHTML;
pagelist.innerHTML += newPage;
// Get elements
var preObject = document.getElementById('semesters');
var ulList = document.getElementById('list');

// Create references
var dbRefObject = firebase.database().ref().child('semesters');
var dbRefList = dbRefObject.child('hobbies');

// Sync object changes
dbRefObject.on('value', snap =>{
   preObject.innerText = JSON.stringify(snap.val(), null, 3);
});

// Sync List changes
dbRefList.on('child_added', snap => {

  var li = document.createElement("li");
  li.innnerText = snap.val();
  li.id = snap.key;
  ulList.appendChild(li);

});


   dbRefList.on('child_changed', snap => {

     var liChanged = document.getElementById(snap.key);
     liChanged.innnerText = snap.val();

   });

   dbRefList.on('child_removed', snap => {

     var liToRemove = document.getElementById(snap.key);
     liToRemove.remove();

   });



     // Initialize Firebase
     var config = {
       apiKey: "AIzaSyD5MjBa0qzkpwzN0ThYAuvk8_pqXDG8Ibc",
       authDomain: "matur18-90b73.firebaseapp.com",
       databaseURL: "https://matur18-90b73.firebaseio.com",
       projectId: "matur18-90b73",
       storageBucket: "matur18-90b73.appspot.com",
       messagingSenderId: "268822264260"
     };
     firebase.initializeApp(config);
     var ref = firebase.database().ref().child("users").child(authData.uid);
     initApp = function() {
       firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           // User is signed in.
           var displayName = user.displayName;
           var email = user.email;
           var emailVerified = user.emailVerified;
           var photoURL = user.photoURL;
           var uid = user.uid;
           var phoneNumber = user.phoneNumber;
           var providerData = user.providerData;
           user.getIdToken().then(function(accessToken) {
             document.getElementById('sign-in-status').textContent = 'Signed in';
             document.getElementById('sign-in').textContent = 'Sign out';
             document.getElementById('account-details').textContent = JSON.stringify({
               displayName: displayName,
               email: email,
               emailVerified: emailVerified,
               phoneNumber: phoneNumber,
               photoURL: photoURL,
               uid: uid,
               accessToken: accessToken,
               providerData: providerData
             }, null, '  ');
               ref.onAuth(function(authData) {
                 if (authData && isNewUser) {
                   // save the user's profile into Firebase so we can list users,
                   // use them in Security and Firebase Rules, and show profiles
                   var user = {
                     provider: authData.provider,
                     name: getName(authData)
                     //some more user data
                     }
                   ref.push(user);
                   }
                 });
           });
         } else {
           // User is signed out.
           document.getElementById('sign-in-status').textContent = 'Signed out';
           document.getElementById('sign-in').textContent = 'Sign in';
           document.getElementById('account-details').textContent = 'null';
         }
       }, function(error) {
         console.log(error);
       });
     };

     window.addEventListener('load', function() {
       initApp()
     });


     var gradepage = '<div class="page cached" id="gradepage">'+
                       '<div class="accordion-list">'+
                       '<div class="content-block-title">Subjects</div>'+
                         '<div class="list-block inset accordion-list">'+
                           '<ul>'+
                           '</ul>'+
                         '</div>'+
                       '</div>'+

                       '<div class="toolbar tabbar tabbar-labels">'+
                         '<div class="toolbar-inner">'+
                           '<a href="#" class="tab-link back">'+
                             '<i class="f7-icons">rewind</i>'+
                             '<span class="tabbar-label">Back</span>'+
                           '</a>'+
                       '</div>'+
                     '</div>'+
                     '<a href="#" class="floating-button floating-button-to-popover open-popover color-purple" data-popup=".popup-menu">'+
                         '<i class="f7-icons">add</i>'+
                     '</a>'+
                     '<div class="popover demo-menu">'+
                       '<div class="popover-inner">'+
                         '<div class="list-block">'+
                           '<ul>'+
                             '<li>'+
                               '<a href="#" class="prompt-newsem item-content item-link add-subject" id="addSubject">'+
                                 '<div class="item-inner">'+
                                   '<div class="item-title">Add Subjects</div>'+
                                 '</div>'+
                               '</a>'+
                             '</li>'+
                             '<li>'+
                               '<a href="#" class="item-content item-link" id="deleteSubject">'+
                                 '<div class="item-inner">'+
                                   '<div class="item-title">Delete Subjects</div>'+
                                 '</div>'+
                               '</a>'+
                             '</li>'+
                           '</ul>'+
                         '</div>'+
                       '</div>'+
                     '</div>'+
                   '</div>';

                   var isNewUser = true;
                   var ref = firebase.database().ref();
                   ref.onAuth(function(authData) {
                     if (authData && isNewUser) {
                       // save the user's profile into the database so we can list users,
                       // use them in Security and Firebase Rules, and show profiles
                       ref.child("users").child(authData.uid).set({
                         provider: authData.provider,
                         name: getName(authData)
                       });
                     }
                   });


                     var Semester = data.val();
                     var keys = Object.keys(Semester);
                     for (var i = 0; i < keys.length; i++){
                       var k = keys[i];
                       var semname = Semester[k].semname;


                       var swipeout = document.createElement("li")
                       var swipeoutcontent = document.createElement("div")
                       swipeoutcontent.setAttribute("class", "swipeout-content")
                       swipeout.setAttribute("class", "swipeout")
                       var newItem = document.createElement("li");
                       var newLink = document.createElement("a");  // Create a <a> node
                       var textnode = document.createTextNode(semname);
                       newLink.href = "#"+semname;
                       newLink.setAttribute("class", "item-link list-button")
                       newLink.setAttribute("id", semname);
                       newLink.setAttribute("onclick", "reply_click(this.id)")
                       newLink.appendChild(textnode);
                       newItem.appendChild(newLink);
                       var semesterlist = document.getElementById("semesterlist");
                       semesterlist.insertBefore(newItem, semesterlist.childNodes[0])

                       $$('.create-popup').on('click', function () {
                         var popupHTML = '<div class="popup">'+
                                           '<div class="content-block">'+
                                           '<div class="content-block-title">Add Subject</div>'+
                                             '<div id="my-list" class="list-block inset">'+
                                               '<form id="my-form" class="list-block inset">'+
                                                   '<ul>'+
                                                   '<li>'+
                                                     '<label class="label-checkbox item-content">'+
                                                     '<input type="checkbox" name="Mathematik" value="Mathematik">'+
                                                     '<div class="item-media">'+
                                                       '<i class="icon icon-form-checkbox"></i>'+
                                                     '</div>'+
                                                     '<div class="item-inner">'+
                                                       '<div class="item-title">Mathematik</div>'+
                                                     '</div>'+
                                                     '</label>'+
                                                   '</li>'+
                                                   '<li>'+
                                                     '<label class="label-checkbox item-content">'+
                                                     '<input type="checkbox" name="Geometrie" value="Geometrie">'+
                                                     '<div class="item-media">'+
                                                       '<i class="icon icon-form-checkbox"></i>'+
                                                     '</div>'+
                                                     '<div class="item-inner">'+
                                                       '<div class="item-title">Geometrie</div>'+
                                                     '</div>'+
                                                     '</label>'+
                                                   '</li>'+
                                                   '</ul>'+
                                               '</form>'+
                                             '</div>'+
                                           '</div>'+
                                         '</div>'
                         planix.popup(popupHTML);});

                         if (userInput.match(/\s/g)){
                             planix.addNotification({
                               title: 'PlaniX - Notification',
                               message: 'Please do not use spaces between the characters.'
                             });
                           }
