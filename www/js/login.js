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

	// Get elememts
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp= document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');


 }());
