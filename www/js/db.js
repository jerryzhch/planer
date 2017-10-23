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

   // *** LOGIN ***
	// Get elememts
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp= document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	// Add login event
	btnLogin.addEventListener('click', e => {
		//Get Email and pass
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// Sign In
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => planix.alert(e.message));
	});

	// Add signup event
	btnSignUp.addEventListener('click', e => {
		//Get Email and pass
		// TODO: CHECK 4 REAL EMAIL
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// Sign In
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise
			.catch(e => planix.alert(e.message));
	});


	// Add a realtime Listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			planix.alert("You are logged in as "+ txtEmail.value);
		}else{
			planix.alert('not logged in');
		}
	});

document.getElementById("newsemadd").addEventListener("click", savedata);
function savedata () {
  var data = {
    username: txtEmail.value,
    semlistItem: userInput
  }
  /*ref.push(data);
  var ref = database.ref("users");
  console.log(data);*/

}

});
