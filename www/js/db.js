var $$ = Dom7;
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD5MjBa0qzkpwzN0ThYAuvk8_pqXDG8Ibc",
  authDomain: "matur18-90b73.firebaseapp.com",
  databaseURL: "https://matur18-90b73.firebaseio.com",
  projectId: "matur18-90b73",
  storageBucket: "matur18-90b73.appspot.com",
  messagingSenderId: "268822264260"
};

// Get elements
var semesterlist = document.getElementById("semesterlist");
var gradelist = document.getElementById("gradelist")

// Create Preferences
var refSemester = firebase.database().ref().child('Semester');
var refGradelist = refSemester.child('Gradeslist');


var gradepage  =


$$('.prompt-new').on('click', function () {
    planix.prompt('New Semester', 'PlaniX', function (userInput) {

        // New Firebase Database Entry
        var data = {
          semname: userInput
        }
        refSemester.push(data);

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
    var semname = Semester[k].semname;

    // CREATE LINK
    var newItem = document.createElement("li");
    var newLink = document.createElement("a");  // Create a <a> node
    var textnode = document.createTextNode(semname);
    newLink.href = "#" + semname;
    newLink.setAttribute("class", "item-link list-button group")
    newLink.setAttribute("id", semname);
    newLink.appendChild(textnode);
    newItem.appendChild(newLink);
    var semesterlist = document.getElementById("semesterlist");
    semesterlist.insertBefore(newItem, semesterlist.childNodes[0]);

    //CREATE PAGE
    var newPage = document.createElement("div");
    newPage.setAttribute("class", "page-cached");
    newPage.setAttribute("id", semname);
    newPage.setAttribute("datapage", semname);
    var container = document.getElementById("gradepagecontainer");
    var itm = document.getElementById("template").innerHTML;
    var itmNode = document.createTextNode(itm);
    var cln = itmNode.cloneNode(true);
    newPage.appendChild(cln);
    container.insertBefore(newPage, container.childNodes[0]);
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
