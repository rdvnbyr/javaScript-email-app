let emails = JSON.parse(localStorage.getItem('emails'));

if (!emails) {
    emails = [];
}


let personData = JSON.parse(localStorage.getItem('personData'));

if (!personData) {
    personData = [];
}


//// ---------------  Sign Up Part ---------------////

let showModal_signUp = () => {
    $('#modalLogin').css('display', 'none');
    $('#modalSignUp').css('display', 'block');
    $('#username_inputSignUp').focus();
}

var userNameSignUp, emailSignUp, passwordSignUp, repeatPasswordSignUp;

let getValueSignUp = (event) => {

    if (event.name === 'username') {
        userNameSignUp = event.value.toLowerCase();

    } else if (event.name === 'email') {
        emailSignUp = event.value;

    } else if (event.name === 'password') {
        passwordSignUp = event.value;

    } else if (event.name === 'repeatPassword') {
        repeatPasswordSignUp = event.value;
    }
}

// Sign Up submit.
function formSignUp_submit() {

    console.log(personData)

    let personInfo = {
        userNameSignUp,
        emailSignUp,
        passwordSignUp
    };

    if (passwordSignUp !== repeatPasswordSignUp) {

        alert('Please check your password!');
        $('#password_inputSignUp').val('');
        $('#repeatPassword_inputSignUp').val('');
    }

    
    let emailCheck = personData.findIndex( el => el.emailSignUp == emailSignUp )
    
    if (emailCheck === -1) {
        personData.push(personInfo);
        localStorage.setItem('personData', JSON.stringify(personData));
        alert('Your account has been successfully created.');
        $('#modalSignUp').hide();

    } else {
        alert("HATA - Bu Mail ile kayit yapilmistir. Baska bir Mail ile tekrar deneyiniz...");
        return;
    }
 
}


// ======== Login Part =========//

var username, password;

var show_ModalLoginForm = () => {
    $('#modalLogin').css('display', 'block');
    $('#userName_inputLogin').focus();
}

var getValueLogin = (event) => {

    if (event.name === 'username') {
        username = event.value.toLowerCase();

    } else if (event.name === 'password') {
        password = event.value;
    }
}

// Login submit.
var formLogin_submit = () => {

    let userData = JSON.parse(localStorage.getItem('personData'));

    if (!userData) {
        alert('You need to register before you can login.')
        return
    }

    userData.map((val, index) => {
        // console.log(val); // this is OBJ.

        if (val.userNameSignUp === username && val.passwordSignUp === password) {

            $('#home').addClass('active');
            $('#about').removeClass('active');
            $('#sendMail').removeClass('active');
            $('#inbox').removeClass('active');

            $('#homePage').show();
            $('#aboutPage').hide();
            $('#sendMailPage').hide();
            $('#inboxPage').hide();
            // ------------- //
            $('#inbox').css( 'display', 'block');           
            $('#sendMail').css( 'display', 'block');           
            $('#homePageText').remove();
            $('#homePage').append(`<h1 onclick="showPersonData(${index})">Welcome Mr/Mrs ${val.userNameSignUp.toUpperCase()}</h1>`).addClass('animationClass');
            $('#userEmail').append(`<span id="userEmailAppend">${val.emailSignUp}<span>`); // Profil Acoount

            $('#modalLogin').hide();
            $('#loginButton').hide();
            $('#logoutButton').show();

        } else {
            $('#userName_inputLogin').val('');
            $('#password_inputLogin').val('');
        }

    })

}

// -------- SEND EMAIL PART -------- //

function sendEmailToInbox(userMail) {

    document.getElementById("userEmail").textContent = userMail;

    if (userMail) {
        var sender = userMail;

        let to = $('#to').val();
        let cc = $('#cc').val();
        let subject = $('#subject').val();
        let message = $('#message').val();
    
        let sendEmail = {
            sender,
            to,
            cc,
            subject,
            message
        };
        emails.push(sendEmail);
        console.log(emails);
        localStorage.setItem('emails', JSON.stringify(emails));
    } else {
        show_ModalLoginForm()
    }



}


function getEmails() {

    $("#mailList").html('');

    console.log(emails);

    var personLogIn = document.getElementById('userEmail').textContent;
    console.log(personLogIn);

    if ( emails && personLogIn !== '' ) {

        emails.map((item, index) => {

            if (item.sender === personLogIn || item.to === personLogIn || item.cc === personLogIn) {
                $('#mailList').append(`
                <li><button type="button" class="btn" onclick="show_ModalBadge(${index})"><span>${item.subject}</span>
                <span class="badge badge-light">${item.to}</span> <span class="badge badge-light">${item.cc}</span>
                </button></li>`)
            }
        })
    }
}

// Activate the Screen //
function switchScreen(reqScreen) {

    if (reqScreen == 'home') {

        $('#home').addClass('active');
        $('#about').removeClass('active');
        $('#sendMail').removeClass('active');
        $('#inbox').removeClass('active');

        $('#homePage').show();
        $('#aboutPage').hide();
        $('#sendMailPage').hide();
        $('#inboxPage').hide();

    } else if (reqScreen == 'about') {

        $('#about').addClass('active');
        $('#home').removeClass('active');
        $('#sendMail').removeClass('active');
        $('#inbox').removeClass('active');

        $('#homePage').hide();
        $('#aboutPage').show();
        $('#sendMailPage').hide();
        $('#inboxPage').hide();

    } else if (reqScreen === 'sendMail') {
        $('#home').removeClass('active');
        $('#about').removeClass('active');
        $('#sendMail').addClass('active');
        $('#inbox').removeClass('active');

        $('#homePage').hide();
        $('#aboutPage').hide();
        $('#sendMailPage').show();
        $('#inboxPage').hide();

    } else if (reqScreen === 'inbox') {
        $('#home').removeClass('active');
        $('#about').removeClass('active');
        $('#sendMail').removeClass('active');
        $('#inbox').addClass('active');

        $('#homePage').hide();
        $('#aboutPage').hide();
        $('#sendMailPage').hide();
        $('#inboxPage').show();

        getEmails();

    } else {
        alert("There's a problem. Please contact with support service");
    }

}



// Show Terms & Privacy.
function showTerms() {

    $('#modalSignUp').css('display', 'none');

    $('#about').addClass('active');
    $('#home').removeClass('active');
    $('#sendMail').removeClass('active');
    $('#inbox').removeClass('active');

    $('#homePage').hide();
    $('#aboutPage').show();
    $('#sendMailPage').hide();
    $('#inboxPage').hide();
}




// -- Close to the Modals with Icon-- //
var hideModal = () => {
    $('#modalSignUp').css('display', 'none');
    $('#modalLogin').css('display', 'none');
    $('#modalBadge').css('display', 'none');
}



// when the user clicks anywhere outside of the modal, close the modal
window.onclick = function (event) {
    // this.console.log(event);

    var modal_login = document.getElementById('modalLogin');
    var modal_signUp = document.getElementById('modalSignUp');
    var modal_badge = document.getElementById('modalBadge');

    if (event.target == modal_login) {
        modal_login.style.display = 'none';

    } else if (event.target == modal_signUp) {
        modal_signUp.style.display = 'none';
    } else if (event.target == modal_badge) {
        modal_badge.style.display = 'none';
    }
}

//Click to show person data on Home Page
function showPersonData(index) {

    $('#personInfo_div')
    .toggle()
    .html('')
    .append(
        `<p><span>USER NAME:</span>  ${personData[index].userNameSignUp}</p>
        <p><span>EMAIL:</span>  ${personData[index].emailSignUp}</p>
        <p><span>PASSWORD:</span>  ${personData[index].passwordSignUp}</p>`
    );

}

var show_ModalBadge = (i) => {
    $('#modalBadge').css('display', 'block');

    $('#mailFrom').html(`from:${emails[i].sender}`);
    $('#mailTo').html(`To:${emails[i].to}`);
    $('#mailCc').html(`CC:${emails[i].cc}`);
    $('#mailSubject').html(`Subject:${emails[i].subject}`);
    $('#mailMessage').html(`Message:${emails[i].message}`);

}

// logout Func.
let logoutFunc = () => {
    return window.location.reload(true);
}

// Password Toggle Func
let passwordToggle = () => {

    let password = document.getElementById('password_inputLogin');
    let toggle = document.getElementById('toggleIcon')

    if ( password.type === "password" ) {

        password.setAttribute('type', 'text');
        toggle.classList.remove('fa-lock');
        toggle.classList.add('fa-lock-open');

        
    } else {

        password.setAttribute('type', 'password');
        toggle.classList.remove('fa-lock-open');
        toggle.classList.add('fa-lock');
    }
}
