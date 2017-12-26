// Initialize your app
var planix = new Framework7({
  // Default title for modals
  modalTitle: 'PlaniX',

  // Hide and show indicator during ajax requests
  onAjaxStart: function (xhr) {
      planix.showIndicator();
  },
  onAjaxComplete: function (xhr) {
      planix.hideIndicator();
  },
  swipeBackPage: true,
  domCache: true

});

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = planix.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domCache: true
});




firebase.auth().onAuthStateChanged(function(user){
// Get elements
var semesterlist = document.getElementById("semesterlist");
var gradelist = document.getElementById("gradelist")

// Get User Infos
var user = firebase.auth().currentUser;

// Create Preferences
var db = firebase.database().ref()
var refUsers = db.child('Users')


// ---------------------------------
window.addEventListener('load', function() {
    if (user){
      var email, uid;
      if (user!= null){
        displayName = user.displayName
        email = user.email
        uid = user.uid
        planix.addNotification({
          title: 'PlaniX - Notification',
          message: 'Welcome to PlaniX. You are logged in as '+window.email+'.'
        });
        var user = {
          useremail: email
        }
        /*refUsers.once('value', function(snapshot) {
            if (!snapshot.hasChild(email)) {
                refUsers.child(email).set({ name: email });
            }
            else {
                alert("That user already exists");
            }
        });*/
        //refUsers.child(displayName).push(user);
      }
    }
});

//-----------------------------------------------
var refSemester = refUsers.child(user.displayName)

// PROMPT New Semester
$$('.prompt-newsem').on('click', function () {
    planix.prompt('New Semester', 'PlaniX', function (userInput) {
      if (userInput.match(/\s/g)){
          planix.addNotification({
            title: 'PlaniX - Notification',
            message: 'Please do not use spaces between the characters.'
          });
        }
      if (userInput == ""){
        planix.addNotification({
          title: 'PlaniX - Notification',
          message: 'An empty input is not allowed'
        });
      }
      else{
        // New Firebase Database Entry
        var data = {
          semname: userInput
        }
        refUsers.child(user.displayName).push(data).set(data);
      }

    });
});



// LIST sync after login
/*refSemester.once('value', snap => {

  semesterlist.innerHTML = ""


  var Semester = snap.val();
  var keys = Object.keys(Semester);
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var semname = Semester[k].semname;

  // CREATE LINK with Delete Swipeout
  var swipeout = document.createElement("li")
  var swipeoutcontent = document.createElement("div")
  swipeoutcontent.setAttribute("class", "swipeout-content")
  swipeout.setAttribute("class", "swipeout")
  swipeout.setAttribute("id", k)
  var newLink = document.createElement("a");  // Create a <a> node
  var textnode = document.createTextNode(semname);
  newLink.href = "#"+semname;
  newLink.setAttribute("class", "item-link list-button")
  newLink.setAttribute("id", semname);
  newLink.setAttribute("onClick", "createPage(this.id)");
  //newLink.setAttribute("onclick", "reply_click(this.id)")
  newLink.appendChild(textnode);
  swipeoutcontent.appendChild(newLink)
  var swiperight = document.createElement("div")
  swiperight.setAttribute("class", "swipeout-actions-right")
  var swiperightdelete = document.createElement("a")
  swiperightdelete.setAttribute("class", "swipeout-delete")
  swiperightdelete.setAttribute("data-confirm", "Are you sure want to delete this item?")
  swiperightdelete.setAttribute("data-confirm-title", "Delete?")
  swiperightdelete.setAttribute("data-close-on-cancel", "true")
  swiperightdelete.href = "#"
  swiperightdelete.innerHTML = "Delete"
  swiperight.appendChild(swiperightdelete)
  swipeout.appendChild(swiperight)
  swipeout.appendChild(swipeoutcontent);
  semesterlist.insertBefore(swipeout, semesterlist.childNodes[0])


}
});*/



// Sync list changes
refSemester.on('child_added', snap => {

  var Semester = snap.val()
  var semname  = Object.values(Semester)
//  var semname = Semester[key].semname;

  // CREATE LINK with Delete Swipeout
  var swipeout = document.createElement("li")
  var swipeoutcontent = document.createElement("div")
  swipeoutcontent.setAttribute("class", "swipeout-content")
  swipeout.setAttribute("class", "swipeout")
  swipeout.setAttribute("id", snap.key)
  var newLink = document.createElement("a");  // Create a <a> node
  var textnode = document.createTextNode(semname);
  newLink.href = "#"+semname;
  newLink.setAttribute("class", "item-link list-button")
  newLink.setAttribute("id", semname);
  newLink.setAttribute("onClick", "createPage(this.id)");
  //newLink.setAttribute("onclick", "reply_click(this.id)")
  newLink.appendChild(textnode);
  swipeoutcontent.appendChild(newLink)
  var swiperight = document.createElement("div")
  swiperight.setAttribute("class", "swipeout-actions-right")
  var swiperightdelete = document.createElement("a")
  swiperightdelete.setAttribute("class", "swipeout-delete")
  swiperightdelete.setAttribute("data-confirm", "Are you sure want to delete this item?")
  swiperightdelete.setAttribute("data-confirm-title", "Delete?")
  swiperightdelete.href = "#"
  swiperightdelete.innerHTML = "Delete"
  swiperight.appendChild(swiperightdelete)
  swipeout.appendChild(swiperight)
  swipeout.appendChild(swipeoutcontent);
  semesterlist.insertBefore(swipeout, semesterlist.childNodes[0])

})

  refSemester.on('child_removed', snap => {
    var semesterToRemove = document.getElementById(snap.key)
    console.log(snap.key)
    console.log(semesterToRemove.innerHTML+" has been deleted")
    semesterToRemove.remove()
  })

/*
  function addChild(data){
    var Semester = data.val();
    var keys = Object.keys(Semester);
    for (var i = 0; i < keys.length; i++){


      var swipeout = document.createElement("li")
      var swipeoutcontent = document.createElement("div")
      swipeoutcontent.setAttribute("class", "swipeout-content")
      swipeout.setAttribute("class", "swipeout")
      var newLink = document.createElement("a");  // Create a <a> node
      var textnode = document.createTextNode(semname);
      newLink.href = "#"+semname;
      newLink.setAttribute("class", "item-link list-button")
      newLink.setAttribute("id", semname);
      //newLink.setAttribute("onclick", "reply_click(this.id)")
      newLink.appendChild(textnode);
      swipeoutcontent.appendChild(newLink)
      var swiperight = document.createElement("div")
      swiperight.setAttribute("class", "swipeout-actions-right")
      var swiperightdelete = document.createElement("a")
      swiperightdelete.setAttribute("class", "swipeout-delete")
      swiperightdelete.setAttribute("data-confirm", "Are you sure want to delete this item?")
      swiperightdelete.setAttribute("data-confirm-title", "Delete?")
      swiperightdelete.href = "#"
      swiperightdelete.innerHTML = "Delete"
      swiperight.appendChild(swiperightdelete)
      swipeout.appendChild(swiperight)
      swipeout.appendChild(swipeoutcontent);
      semesterlist.insertBefore(swipeout, semesterlist.childNodes[0])
  }
}*/
});
