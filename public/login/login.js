$(".input-field").focusout(function(){
    if($(this).val() != ""){
        $(this).addClass("has-content");
    }else{
        $(this).removeClass("has-content");
    }
});

$(".label").on('click', function() {
    $(this).prev().focus();
});

$(document).ready(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyD7-tfxQ9oJ1NDjdQ1VbQINGQp9BKq_AuY",
        authDomain: "your-passwords-9900c.firebaseapp.com",
        databaseURL: "https://your-passwords-9900c-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "your-passwords-9900c",
        storageBucket: "your-passwords-9900c.appspot.com",
        messagingSenderId: "629253822029",
        appId: "1:629253822029:web:e30825465d68baeec5ae04"
    };
    
    firebase.initializeApp(firebaseConfig);
    
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


    $('#login-form').on('submit', function(e){
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                return user.getIdToken().then((idToken) => {
                    return axios.post('/login', {'token': idToken}, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                        }
                    })
                });
            })
            .then(() => {
                return firebase.auth().signOut();
            })
            .then(() => {
                window.location.assign("/");
            });
        return false;
    });

    $('#register-form').on('submit', function(e){
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                return user.getIdToken().then((idToken) => {
                    return axios.post('/login', {'token': idToken}, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                        }
                    })
                });
            })
            .then(() => {
                return firebase.auth().signOut();
            })
            .then(() => {
                axios.post('/register');
            })
            .then(() => {
                window.location.assign("/");
            });
        return false;
    });


});


