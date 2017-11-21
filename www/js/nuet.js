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
