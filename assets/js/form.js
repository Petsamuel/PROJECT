const loginform = document.getElementById("login");
const otpverify = document.getElementById("verifyOtp");
const phoneNum = document.getElementById("phoneNumber");
const Submitbtn = document.getElementById("sign-in-button");
const comfirmOtp = document.getElementById("loginsubmmit");
const innerInfo = document.getElementById("container");
const svg1 = document.getElementById("svg");

const form = document.getElementById("formID");

//mobile login form
const navlogin = document.querySelector("#mlogin");
navlogin.addEventListener("click", () => {
  svg1.classList.add("hidden");
  form.classList.remove("hidden");
});

const registerform = document.querySelector("#register");
registerform.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginform.classList.add("hidden");
});

const registerBtn = document.querySelector("#printIcon");
registerBtn.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginform.classList.add("hidden");
});

const loginbtn = document.querySelector("#loginbtn");
loginbtn.addEventListener("click", () => {
  registerform.classList.add("hidden");
});
const output = document.getElementById("message");
function Output(text) {
  const currentText = output.innerHTML;
  var newLine = text;
  output.innerHTML = newLine;
}

//EVERYTHING FIREBASE Auth
// -STEP1 SETTING RECAPTCHA
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "sign-in-button",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log("onload");
      onSignInSubmit();
    },
    defaultCountry: "NG",
  }
);

// DISPLAYING THE RECAPTURE WIDGET
recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

function isvalid() {
  const isValid = Validity.includes(phoneNum.value);
  console.log(isValid);
  return;
}

//functionn to verify if num exists
function verifynum() {
  // init fb
  // get the doc - users
  // find the object with phoneNum
  const valid = data.includes(phoneNum.value);
  console.log(valid);
  return valid;
}

function onSignInSubmit(event) {
  event.preventDefault();
  //verify phone number by calling api

  //if num is verified proceed and get
  if (verifynum() == true) {
    const phoneNumber = "+234" + phoneNum.value;
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber);

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // ...
        console.log("otp sent");
        Output("[" + new Date().toLocaleTimeString() + "]: " + "OTP SENT");
        document.querySelector(".icon").classList.remove("hidden");

        return confirmationResult;
      })
      .catch((error) => {
        const message = error.message;
        Output(`${message}`);
        document.querySelector(".icon").classList.remove("hidden");
      });
  } else {
    //invalid form filled
    Output(`NOT IN DATABASE`);
    document.querySelector(".icon").classList.remove("hidden");
  }
}

function onverifySubmit() {
  const code = otpverify.value;
  confirmationResult
    .confirm(code)
    .then((result) => {
      const user = result.user;
      // ...
      console.log("successful");
      console.log(user);
      document.querySelector("#modalauth").classList.remove("hidden");
    })
    .catch((error) => {
      const message = error.message;

      Output(`${message}`);

      console.log(message);
    });
}

// signout
function signoutbtn() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("/");
    })
    .catch((error) => {
      // An error happened.
    });
}
// Passwordless integration
// const apiKey = "demobackend:public:c203e65b581443778ea4823b3ef0d6af";
// const backendUrl = "https://demo-backend.passwordless.dev";

async function Register(alias) {
  const p = new Passwordless.Client({ apiKey });
  const myToken = await fetch(backendUrl + "/create-token?alias=" + alias).then(
    (r) => r.text()
  );
  await p.register(myToken);
  console.log("Register succeded");
}
async function Signin(alias) {
  const apiKey = "demobackend:public:c203e65b581443778ea4823b3ef0d6af";
  const backendUrl = "https://demo-backend.passwordless.dev";
  const p = new Passwordless.Client({ apiKey });
  const token = await p.signinWithAlias(alias);
  const user = await fetch(backendUrl + "/verify-signin?token=" + token).then(
    (r) => r.json()
  );
  console.log("User details", user);
  return user;
}
// DEMO UI

// Bind methods to UI buttons/events:
async function RegisterPasswordless(e) {
  e.preventDefault();
  const alias = document.getElementById("alias").value;
  await Register(alias);
  Status("Succeded with register");
}
document
  .getElementById("passwordless-register")
  .addEventListener("click", RegisterPasswordless);

async function handleSignInSubmit() {
  //   e.preventDefault();
  var alias = document.getElementById("alias").value;
  var user = await Signin(alias);
  Status("User details: " + JSON.stringify(user, null, 2));
}
document
  .getElementById("passwordless-signin")
  .addEventListener("click", handleSignInSubmit);

// Print Status messages to UI.
var status = document.getElementById("status");
function Status(text) {
  var currentText = status.innerText;
  var newLine = "[" + new Date().toLocaleTimeString() + "]: " + text + "\n";
  status.innerText = newLine + currentText;
}
Status("Welcome! Please register or sign in");
