 (function() {
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



 var database = firebase.database();

               function createSemester (){
                 // Create Link
                 var newItem = document.createElement("li");
                 var newLink = document.createElement("a");
                 var userInput = document.getElementById("userInput").value;    // Create a <a> node
                 var textnode = document.createTextNode(userInput);
                 newLink.href = "#" + userInput;
                 newLink.setAttribute("class", "item-link list-button" )                              // Create a text node with userInput
                 newLink.appendChild(textnode);                                // Append the text to <a>
                 newItem.appendChild(newLink);                                 // Append the Link to <li>
                 var semlist = document.getElementById("semesterlist");    // Get the <ul> element to insert a new node
                 semlist.insertBefore(newItem, semlist.childNodes[0]);  // Insert <li> before the first child of <ul>


               }


//document.getElementById("newsemadd").addEventListener("click", savedata);


});
