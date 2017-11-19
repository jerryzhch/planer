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
    // CREATE LINK
    var newItem = document.createElement("li");
    //newItem.class('gradeelements');
    var newLink = document.createElement("a");  // Create a <a> node
    var textnode = document.createTextNode(semname);
    newLink.href = "#" + semname;
    newLink.setAttribute("class", "item-link list-button group")
    newLink.setAttribute("id", semname)
    newLink.appendChild(textnode);
    newItem.appendChild(newLink);
    var semesterlist = document.getElementById("semesterlist");
    semesterlist.insertBefore(newItem, semesterlist.childNodes[0]);
    var textnode2 = document.createTextNode(gradepage);
    //textnode2.setAttribute("id", semname);
    document.getElementById("gradepagecontainer").innerHTML(textnode2);

    /*mainView.router.load({
    content: gradepage,
    animatePages: false
  });*/

  }
}

function errData(data){
  console.log('Error!');
  console.log(err);

}


$$('a').hasClass('group'); //-> true
