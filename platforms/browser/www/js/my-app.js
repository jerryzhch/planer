// Initialize your app
var plannix = new Framework7({
  // Default title for modals
  modalTitle: 'PlanniX - Notification',

  pushState: true,

  // Hide and show indicator during ajax requests
  onAjaxStart: function (xhr) {
      plannix.showIndicator();
  },
  onAjaxComplete: function (xhr) {
      plannix.hideIndicator();
  },
  swipeBackPage: false

});

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = plannix.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domCache: true
});


// Color palette
var palette = ['92B558', '79C753', '66ff00', 'C48F65', '98B4D4', 'FAE03C', 'DD4124', '9C9A40', '4F84C4', 'D2691E', '55B4B0', '95DEE3']
// Get elements
var subjectlist = document.getElementById("subjectlist");
var btn = document.getElementById("addsubject")


firebase.auth().onAuthStateChanged(function(user){

  // Get User Infos
  var user = firebase.auth().currentUser;

  // Create references
  var db = firebase.database().ref()
  var refUser = db.child(user.displayName)
  window.refSubject = refUser.child("Subjects")
  window.refGrade = refUser.child('Grades')


  // ---------------------------------
  // Notify user which email account he is using
      if (user){
        var email, uid;
        if (user!= null){
          email = user.email
          plannix.addNotification({
            title: 'PlanniX - Notification',
            message: 'Welcome to plannix. You are logged in as '+email+'.'
          });
          var user = {
            useremail: email
          }
        }
      }

  //-----------------------------------------------

  // PROMPT New Subject
  $$('.prompt-newsub').on('click', function () {
      plannix.prompt('New Subject', 'PlanniX', function (userInput) {
        if (userInput == ""){
          plannix.alert('An empty input is not allowed')
        }
        else{
          // New Firebase Database Entry
          var sub = {
            SubjectName: userInput
          }
              refSubject.push(sub)
            }
        })

      });

// Push grade information to Firebase
  $$('.form-to-data').on('click', function(){
    var formData = plannix.formToData('#my-form');
    refGrade.child(window.subID).push(formData)
  });

// On router back to Subject page, empty Grade list
  $$('.back').on('click', function(){
    var insertGrade = document.getElementById("insertGrade")
    insertGrade.innerHTML = ""
  });


// -----------------------------------------------------

  // Sync list changes
  refSubject.on('child_added', snap => {

    var Subject = snap.val()
    var subname  = Object.values(Subject)

      // CREATE LINK with Delete Swipeout
      var newsubject = document.createElement("li")
      var swipeoutcontent = document.createElement("div")
      swipeoutcontent.setAttribute("class", "swipeout-content")
      newsubject.setAttribute("class", "swipeout")
      newsubject.setAttribute("id", snap.key)
      var newLink = document.createElement("a");  // Create a <a> node
      var textnode = document.createTextNode(subname);
      newLink.href = "#grades";
      newLink.setAttribute("class", "item-link list-button")
      newLink.setAttribute("id", subname);
      newLink.setAttribute("onClick", "nav(this.id)");
      newLink.appendChild(textnode);
      swipeoutcontent.appendChild(newLink)
      var swiperight = document.createElement("div")
      swiperight.setAttribute("class", "swipeout-actions-right")
      var swiperightdelete = document.createElement("a")
      swiperightdelete.setAttribute("class", "swipeout-delete")
      swiperightdelete.href = "#"
      swiperightdelete.innerHTML = "Delete"
      swiperightdelete.setAttribute("id", snap.key)
      swiperightdelete.setAttribute("onClick", "del(this.id)");
      swiperight.appendChild(swiperightdelete)
      newsubject.appendChild(swiperight)
      newsubject.appendChild(swipeoutcontent);
      subjectlist.insertBefore(newsubject, subjectlist.childNodes[0])


  });

    refSubject.on('child_removed', snap => {
      var subjectToRemove = document.getElementById(snap.key)
      console.log(snap.key)
      console.log(subjectToRemove.innerHTML+" has been deleted")
      subjectToRemove.remove()

    });

});
