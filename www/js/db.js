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
firebase.initializeApp(config);

//var database = firebase.database();

// Get elements
var semesterlist = document.getElementById("semesterlist");

// Create Preferences
var refSemester = firebase.database().ref().child('Semester');
var refGradelist = refSemester.child('Gradeslist');


$$('.prompt-new').on('click', function () {
    planix.prompt('New Semester', 'PlaniX', function (userInput) {

        // New Firebase Database Entry
        var data = {
          semname: userInput
        }
        console.log(data);
        refSemester.push(data);
    });
});

// Sync lsit changes
refGradelist.on('child_added', addChild)

  function addChild(data){
    var Semester = data.val();
    var keys = Object.keys(Semester);
    for (var i = 0; i < keys.length; i++){
      var toRemove = document.createElement('div');
      var newItem = document.createElement("li");
      var newLink = document.createElement("a")
      var textnode = document.createTextNode(userInput);
      newLink.setAttribute("class", "item-link list-button" )
      newLink.setAttribute("id", userInput)
      newLink.appendChild(textnode);
      newItem.appendChild(newLink);
      toRemove.appendChild(newItem);
      var semesterlist = document.getElementById("semesterlist");
      semesterlist.insertBefore(toRemove, semesterlist.childNodes[0]);
  };
};
refSemester.on('value', gotData, errData);

function gotData(data){

  var list = document.getElementById('semesterlist');
  list.innerHTML = "";

  //console.log(data.val());
  var Semester = data.val();
  var keys = Object.keys(Semester);
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var semname = Semester[k].semname;
    //console.log(semname);
    var newItem = document.createElement("li");
    //newItem.class('gradeelements');
    var newLink = document.createElement("a");  // Create a <a> node
    var textnode = document.createTextNode(semname);v
    newLink.href = "#" + semname;
    newLink.setAttribute("class", "item-link list-button group" )
    newLink.setAttribute("id", "sem+"+semname)
    newLink.appendChild(textnode);
    newItem.appendChild(newLink);
    var semesterlist = document.getElementById("semesterlist");
    semesterlist.insertBefore(newItem, semesterlist.childNodes[0]);


  }
}

function errData(data){
  console.log('Error!');
  console.log(err);

}


$$('a').hasClass('group'); //-> true
