var loginWithGoogle = document.getElementById('loginWithGoogle');
var signUpBtn = document.getElementById('signUpBtn');
var nameBar = document.getElementById('nameBar');
var emailBar = document.getElementById('emailBar');
var passBar = document.getElementById('passBar');
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginBtn = document.getElementById('loginBtn');
var auth = firebase.auth();


// console.log(auth);


//get item from local storage
var authData = localStorage.getItem('auth');
authData = JSON.stringify(authData);

console.log(authData);

if (authData) {
    console.log('User sign in');
} else {
    console.log('Please Sign in first');
}



//Event Listners On buttons



loginBtn.addEventListener('click', (e) => {

    if (loginEmail.value === '') {
        return;
    }
    if (loginPassword.value === '') {
        return;
    }


    loginWithEmailAndPass(loginEmail.value, loginPassword.value);



    e.preventDefault();
});

loginWithGoogle.addEventListener('click', (e) => {
    loginWithGoogle();


    e.preventDefault();
});

signUpBtn.addEventListener('click', (e) => {


    // if (nameBar.value === '') {
    //     return;
    // }
    // if (emailBar.value === '') {
    //     return;
    // }
    // if (passBar.value === '') {
    //     return;
    // }

    signUP(nameBar.value, emailBar.value, passBar.value);

    e.preventDefault();
})



                                                                            //All Base Functions


//Login With Google
var loginWithGoogle = async () => {
    try {
        var provider = new firebase.auth.GoogleAuthProvider();
        let userData = await auth.signInWithPopup(provider);
        userData = userData.user;

        var myData = {
            image: userData.photoURL,
            email: userData.email,
            name: userData.displayName,
            uid: userData.uid
        }

        //Set item to local storage work
        localStorage.setItem('auth', JSON.stringify(myData));

        console.log(myData);
        return myData;

    } catch (error) {
        console.log(error)
    }

}

//Sign up 
var signUP = async (name, email, pass) => {
    try {
        var result = await auth.createUserWithEmailAndPassword(email, pass);

        var myData = {
            name: name,
            email: email
        }

        localStorage.setItem('auth1', JSON.stringify(myData));



        console.log(result);
    } catch (error) {
        console.log(error.code);
        if (error.code === "auth/invalid-email") {
            showAlert("enter a valid email", 'error', '430px')
        }
        if (error.code === "auth/weak-password") {
            showAlert("You Entered a week password", 'error', '430px')
        }
        if (error.code === "auth/email-already-in-use") {
            showAlert('Email already Exist', 'error', "430px")
        }
    }


}

//Login With Email & Password
var loginWithEmailAndPass = async (email, pass) => {
    try {
        var data = await auth.signInWithEmailAndPassword(email, pass);

        var myData = {
            email: email
        }

        localStorage.setItem('auth2', JSON.stringify(myData));

        console.log(data);

        location.assign("./CV-Builder/index.html")

    } catch (error) {
        console.log(error.code);
        if (error.code === "auth/user-not-found") {
            showAlert('No Such User Exist', 'error')
        }
        if (error.code === "auth/wrong-password") {
            showAlert("Wrong Password", 'error')
        }
    }
}

//SignOut Fucntion
var SignOut = async () => {
    try {
        var data = await auth.signOut();
        localStorage.removeItem('auth');
    } catch (error) {
        console.log(error)
    }
}


//Error Control UI Message Work
var showAlert = (message, className, left = "5px") => {
    //create Div
    const div = document.createElement('div');
    div.style.left = left;
    //add ClassName
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get Parent
    const container = document.getElementById('container');
    //get form
    const form = document.getElementById('form-content');
    //insert alert
    container.insertBefore(div, form);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}