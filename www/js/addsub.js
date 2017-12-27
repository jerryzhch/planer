// Initialize your app
var planix = new Framework7({
  // Default title for modals
  modalTitle: 'PlaniX',

  pushState: true,
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
    domCache: false
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
  var refSemester = refUsers.child(user.displayName)
  var refSubjects = db.child('Subjects')

  $$('.form-to-data').on('click', function() {
    var formData = planix.formToData('#my-form');
    refSubjects.set(formData)

  });
  refSubjects.on('child_added', snap => {
    console.log(snap.key)
  });
});
