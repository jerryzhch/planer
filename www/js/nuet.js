// Get elements
var preObject = document.getElementById('semesters');
var ulList = document.getElementById('list');

// Create references
var dbRefObject = firebase.database().ref().child('semesters');
var dbRefList = dbRefObject.child('hobbies');

// Sync object changes
dbRefObject.on('value', snap =>{
   preObject.innerText = JSON.stringify(snap.val(), null, 3);
});

// Sync List changes
dbRefList.on('child_added', snap => {

  var li = document.createElement("li");
  li.innnerText = snap.val();
  li.id = snap.key;
  ulList.appendChild(li);

});


   dbRefList.on('child_changed', snap => {

     var liChanged = document.getElementById(snap.key);
     liChanged.innnerText = snap.val();

   });

   dbRefList.on('child_removed', snap => {

     var liToRemove = document.getElementById(snap.key);
     liToRemove.remove();

   });
