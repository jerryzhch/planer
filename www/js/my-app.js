// Initialize your app
var planix = new Framework7({
  // Default title for modals
  modalTitle: 'PlaniX',

  // If it is webapp, we can enable hash navigation:
  pushState: true,

  // Hide and show indicator during ajax requests
onAjaxStart: function (xhr) {
    planix.showIndicator();
},
onAjaxComplete: function (xhr) {
    planix.hideIndicator();
},
swipeBackPage: true

});
//userstate();

writeUserData();

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = planix.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domCache: true
});


// Get elements
var semesterlist = document.getElementById("semesterlist");
var gradelist = document.getElementById("gradelist")

// Create Preferences
var refUsers = firebase.database().ref().child('Users')
var refSemester = firebase.database().ref().child('Users').child('Semester');
var refGradelist =  firebase.database().ref().child('Users').child('Semester').child('Gradeslist');

function writeUserData(){
  refUsers.set({
    user: email,
    uid: uid
  })
}
/*function userstate(){
  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      /*var user = firebase.auth().currentUser;
      var name, email, uid, emailVerified;
      if (user!= null){
        name = user.displayName
        email = user.email
        emailVerified = user.emailVerified;
        uid = user.uid
        console.log(name, email, emailVerified, uid);
        var users = {
          user: email,
          uid: uid
        }
        refUsers.push(users)
      }
    }
  })
}*/


// PROMPT New Semester
$$('.prompt-newsem').on('click', function () {
    planix.prompt('New Semester', 'PlaniX', function (userInput) {
      if (userInput.match(/\s/g)){
          planix.addNotification({
            title: 'PlaniX - Notification',
            message: 'Please do not use spaces between the characters. Use a dash (-) for example'
          });
        }
      else{
        // New Firebase Database Entry
        var data = {
          semname: userInput
        }
        refSemester.push(data);
      }

    });
});

refSemester.on('value', gotData);

function gotData(data){

  var list = document.getElementById('semesterlist');
  list.innerHTML = "";

  //console.log(data.val());
  var Semester = data.val();
  var keys = Object.keys(Semester);
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var semname = Users[k].semname;

    /*CREATE PAGE
    var newPage = document.createElement("div")
    newPage.setAttribute("class", "page cached")
    newPage.setAttribute("datapage", semname)
    newPage.setAttribute("id", semname)
    var itm   = document.getElementById("demopage").innerHTML;
    newPage.innerHTML = itm
    var container = document.getElementById("gradepagecontainer")
    container.insertBefore(newPage, container.childNodes[0]);*/

    // CREATE LINK
    var newItem = document.createElement("li");
    var newLink = document.createElement("a");  // Create a <a> node
    var textnode = document.createTextNode(semname);
    newLink.href = "#" + semname;
    newLink.setAttribute("class", "item-link list-button group")
    newLink.setAttribute("id", semname);
    newLink.setAttribute("onclick", "loadPage(this, "+semname+")")
    newLink.appendChild(textnode);
    newItem.appendChild(newLink);
    var semesterlist = document.getElementById("semesterlist");
    semesterlist.insertBefore(newItem, semesterlist.childNodes[0]);
    }
}


// Sync list changes
refGradelist.on('child_added', addChild)

  function addChild(data){
    var Semester = data.val();
    var keys = Object.keys(Semester);
    for (var i = 0; i < keys.length; i++){
      var toRemove = document.createElement('div');
      var newItem = document.createElement("li");
      var newLink = document.createElement("a");
      var textnode = document.createTextNode(userInput);
      newLink.setAttribute("class", "item-link list-button" )
      newLink.setAttribute("id", userInput)
      newLink.appendChild(textnode);
      newItem.appendChild(newLink);
      toRemove.appendChild(newItem);
      var semesterlist = document.getElementById("semesterlist");
      semesterlist.insertBefore(toRemove, semesterlist.childNodes[0]);
  }
}

//document.getElementById("myBtn").addEventListener("click", addsubjects);

  function addsubjects (){

  }
