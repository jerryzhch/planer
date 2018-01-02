// Initialize your app
var planix = new Framework7({
  // Default title for modals
  modalTitle: 'PlaniX - Notification',

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
  var subjectslist = document.getElementById("subjectslist");
  var subjectlist = [];
  var btn = document.getElementById("addsubject")


  // Get User Infos
  var user = firebase.auth().currentUser;

  // Create references
  var db = firebase.database().ref()
  var refUser = db.child(user.displayName)
  var refSemester = refUser.child("Semesters")
  var refSubject = refUser.child("Subjects")
  var refGrade = refUser.child('Grades')


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
          planix.planix('An empty input is not allowed')
        }
        else{
          // New Firebase Database Entry
          var sem = {
            SemesterName: userInput
          }
          refUser.child(userInput).set(userInput)
        }

      });
  });
    // PROMPT New Semester
    $$('.prompt-newsub').on('click', function () {
        planix.prompt('New Subject', 'PlaniX', function (userInput) {
          if (userInput == ""){
            planix.planix('An empty input is not allowed')
          }
          else{
            // New Firebase Database Entry
            var sub = {
              SubjectName: userInput
            }
                refUser.child(window.id).push(sub)
              }
          })

        });


  $$('.form-to-data').on('click', function(){
    var formData = planix.formToData('#my-form');
    refGrade.push(formData)
  });
// -----------------------------------------------------

  // Sync list changes
  refUser.on('child_added', snap => {

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
      newLink.setAttribute("onClick", "nav(this.id)");
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


  // Sync list changes SUBJECTS
  refSubject.on('child_added', snap => {

      var rand = palette[Math.floor(Math.random() * palette.length)];
      var Subject = snap.val()
      var subname = Object.values(Subject)

      // CREATE LINK
      var newItem = document.createElement("li")
      newItem.setAttribute("class", "accordion-item")
      newItem.setAttribute("title", subname)
      newItem.setAttribute("id", snap.key)
      newItem.setAttribute("style", "background-color:#"+rand+";")
      newItem.setAttribute("onClick", "addsubject(this.id)");
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
      var tbody = document.createElement("tbody")
      tbody.setAttribute("id", "+subname")
      var tr = document.createElement("tr")
      tr.innerHTML = "<th class='label-cell'>Exam</th><th class='numeric-cell'>Grade</th>"
      thead.appendChild(tr)
      table.appendChild(thead)
      table.appendChild(tbody)
      card.appendChild(table)
      contentblock.appendChild(card)
      newItemcontent.appendChild(contentblock)
      newItem.appendChild(newItemcontent)
      subjectslist.insertBefore(newItem, subjectslist.childNodes[0])

  });


  refSubject.on('child_removed', snap => {
    var subjectToRemove = document.getElementById(snap.key)
    console.log(snap.key)
    console.log(subjectToRemove.innerHTML+" has been deleted")
    subjectToRemove.remove()

  });

  refGrade.on('child_added', snap =>{
    var Grade = snap.val()
    var grade = snap.val().grade
    var name  = snap.val().name
    var tbody = document.getElementById("+subname")
    var th = document.createElement("th")
    th.setAttribute("class", "label-cell")
    var th2 = document.createElement("th")
    th2.setAttribute("class", "numeric-cell")
    th.innerHTML = name
    th2.innerHTML = grade
    var tr = document.createElement("tr")
    tr.appendChild(th)
    tr.appendChild(th2)
    tbody.appendChild(tr)


  })











});
