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
  swipeBackPage: true

});

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = planix.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domCache: true
});

// Color palette
var palette = ['92B558', '79C753', '66ff00', 'C48F65', '98B4D4', 'FAE03C', 'DD4124', '9C9A40', '4F84C4', 'D2691E', '55B4B0', '95DEE3']

firebase.auth().onAuthStateChanged(function(user){
  // Get elements
  var semesterlist = document.getElementById("semesterlist");
  var subjectslist = document.getElementById("subjectslist")

  // Get User Infos
  var user = firebase.auth().currentUser;

  // Create references
  var db = firebase.database().ref()
  var refUsers = db.child('Users')
  var refSemester = refUsers.child(user.displayName)
  var refSubjects = db.child('Subjects').child(user.displayName)


  // ---------------------------------
      if (user){
        var email, uid;
        if (user!= null){
          displayName = user.displayName
          email = user.email
          uid = user.uid
          planix.addNotification({
            title: 'PlaniX - Notification',
            message: 'Welcome to PlaniX. You are logged in as '+email+'.'
          });
          var user = {
            useremail: email
          }
        }
      }

  //-----------------------------------------------


  // PROMPT New Semester
  $$('.prompt-newsem').on('click', function () {
      planix.prompt('New Semester', 'PlaniX', function (userInput) {
        if (userInput == ""){
          planix.addNotification({
            title: 'PlaniX - Notification',
            message: 'An empty input is not allowed'
          });
        }
        else{
          // New Firebase Database Entry
          var sem = {
            SemesterName: userInput
          }
          refSemester.push(sem).set(sem);
        }

      });
  });

  $$('.prompt-newsub').on('click', function () {
      planix.prompt('New Subject', 'PlaniX', function (userInput) {
        if (userInput == ""){
          planix.addNotification({
            title: 'PlaniX - Notification',
            message: 'An empty input is not allowed'
          });
        }
        else{
          // New Firebase Database Entry
          var sub = {
            SubjectName: userInput
          }
          refSubjects.push(sub);
        }
      });
  });

	$$('.accordion-item').on('accordion:opened', function () {
	  alert('Accordion item opened');
	}); 
	 
	$$('.accordion-item').on('accordion:closed', function (e) {
	  alert('Accordion item closed');
	});    




  // Sync list changes
  refSemester.on('child_added', snap => {

    var Semester = snap.val()
    var semname  = Object.values(Semester)

    // CREATE LINK with Delete Swipeout
    var swipeout = document.createElement("li")
    var swipeoutcontent = document.createElement("div")
    swipeoutcontent.setAttribute("class", "swipeout-content")
    swipeout.setAttribute("class", "swipeout")
    swipeout.setAttribute("id", snap.key)
    var newLink = document.createElement("a");  // Create a <a> node
    var textnode = document.createTextNode(semname);
    newLink.href = "#subjects";
    newLink.setAttribute("class", "item-link list-button")
    newLink.setAttribute("id", semname);
    //newLink.setAttribute("onClick", "nav(this.id)");
    newLink.appendChild(textnode);
    swipeoutcontent.appendChild(newLink)
    var swiperight = document.createElement("div")
    swiperight.setAttribute("class", "swipeout-actions-right")
    var swiperightdelete = document.createElement("a")
    swiperightdelete.setAttribute("class", "swipeout-delete")
    swiperightdelete.href = "#"
    swiperightdelete.innerHTML = "Delete"
    swiperight.appendChild(swiperightdelete)
    swipeout.appendChild(swiperight)
    swipeout.appendChild(swipeoutcontent);
    semesterlist.insertBefore(swipeout, semesterlist.childNodes[0])

  });

  refSemester.on('child_removed', snap => {
    var semesterToRemove = document.getElementById(snap.key)
    console.log(snap.key)
    console.log(semesterToRemove.innerHTML+" has been deleted")
    semesterToRemove.remove()
  });

  // Sync list changes
  refSubjects.on('child_added', snap => {

    var rand = palette[Math.floor(Math.random() * palette.length)];
    console.log(rand)

    var subname = snap.val().SubjectName

    // CREATE LINK with Delete Swipeout
    var newItem = document.createElement("li")
    newItem.setAttribute("class", "accordion-item")
    newItem.setAttribute("id", snap.key)
    newItem.setAttribute("style", "background-color:#"+rand+";")
    var newLink = document.createElement("a")
    newLink.href = "#"
    newLink.setAttribute("class", "item-content item-link")
    var itemInner = document.createElement("div")
    itemInner.setAttribute("class", "item-inner")
    var itemTitle = document.createElement("div")
    itemTitle.setAttribute("class", "item-title")
    itemTitle.innerHTML = subname
    itemInner.appendChild(itemTitle)
    newLink.appendChild(itemInner)
    newItem.appendChild(newLink)
    var newItemcontent = document.createElement("div")
    newItemcontent.setAttribute("class", "accordion-item-content")
    var card = document.createElement("div")
    card.setAttribute("class", "data-table card")
    var contentblock = document.createElement("div")
    contentblock.setAttribute("class", "content-block")
    var table = document.createElement("table")
    var thead = document.createElement("thead")
    var tr = document.createElement("tr")
    tr.innerHTML = "<th class='label-cell'>Exam</th><th class='numeric-cell'>Grade</th>"
    thead.appendChild(tr)
    table.appendChild(thead)
    card.appendChild(table)
    contentblock.appendChild(card)
    newItemcontent.appendChild(contentblock)
    newItem.appendChild(newItemcontent)
    subjectslist.insertBefore(newItem, subjectslist.childNodes[0])


  });
  refSubjects.on('child_removed', snap => {
    var subjectToRemove = document.getElementById(snap.key)
    console.log(snap.key)
    console.log(subjectToRemove.innerHTML+" has been deleted")
    subjectToRemove.remove()
  });













});
