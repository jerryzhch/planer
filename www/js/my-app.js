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
  swipeBackPage: true

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
  window.refUser = db.child(user.displayName)
  window.refSubject = refUser.child("Subjects")
  var refGrade = refUser.child('Grades')


  // ---------------------------------
      if (user){
        var email, uid;
        if (user!= null){
          displayName = user.displayName
          email = user.email
          uid = user.uid
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


  $$('.form-to-data').on('click', function(){
    var formData = plannix.formToData('#my-form');
    refGrade.push(formData)
  });


// -----------------------------------------------------

  // Sync list changes
  refSubject.on('child_added', snap => {

    var rand = palette[Math.floor(Math.random() * palette.length)]
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

    refGrade.on('child_added', snap => {
      var grade = snap.val().grade
      var name = snap.val().name
      console.log(name)
      console.log(grade)
    })

});
