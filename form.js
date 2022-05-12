var loginform = document.querySelector("#login");
var otpverify = document.getElementById("verifyOtp");
var phoneNum = document.getElementById("phoneNumber");
var Submitbtn = document.getElementById("sign-in-button");
var comfirmOtp = document.getElementById("loginsubmmit");
var innerInfo = document.getElementById("container");
var svg1 = document.getElementById("svg");

var form = document.getElementById("formID");
var status = document.getElementById("status");

//mobile login form
var navlogin = document.querySelector("#mlogin");
navlogin.addEventListener("click", () => {
  svg1.classList.add("hidden");
  form.classList.remove("hidden");
});

var registerform = document.querySelector("#register");
registerform.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginform.classList.add("hidden");
});

var registerBtn = document.querySelector("#printIcon");
registerBtn.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginform.classList.add("hidden");
});


API_KEY = "Bieefilled:public:ddb7c9f8960d46fd84805e42d5cb6717"; // Replace this value with your API Key
var BACKEND_URL = ""; // will use node/app.js as default, but if you can't run node, use the hosted demo: https://demo-backend.passwordless.dev

// Print Status messages to UI.

function Status(text) {
  var currentText = status.innerHTML;
  var newLine =
    // "[" + new Date().toLocaleTimeString() + "]:\n " +
    text + "\n";
  status.innerHTML = newLine + currentText;
}
Status("Welcome! Please register or sign in");

if (API_KEY[0] === "<") {
  console.log(
    "WARNING: Please change the API_KEY in index.html and API_KEY_SECRET in app.js before running the example."
  );
}

async function RegisterPasswordless(event) {
  event.preventDefault();
  var alias = document.getElementById("alias").value;

  Status("Starting registering...");
  /**
   * Initiate the Passwordless client with your public api key
   */
  var p = new Passwordless.Client({
    apiKey: API_KEY,
  });
  /**
   * Create token - Call your node backend to retrieve a token that we can use client-side to register a key to a alias
   */
  var backendRequest = await fetch(
    BACKEND_URL + "/create-token?alias=" + alias
  );
  var backendResponse = await backendRequest.text();
  if (!backendRequest.ok) {
    // If our demo backend did not respond with success, show error in UI
    Status(backendResponse);
    return;
  }
  /**
   *  Register a key - The Passwordless API and browser creates and stores a key, based on the token.
   */
  try {
    await p.register(backendResponse);

    Status("Successfully registered WebAuthn. You can now sign in!");

    /**
     * Done - the user can now sign in using the key
     */
  } catch (e) {
    console.error("Things went bad", e);
    Status("Things went bad, check console");
  }
}
//functions for passwordless auth.
async function handleSignInSubmit(e) {
  e.preventDefault();
  var alias = document.getElementById("alias").value;

  Status("Starting sign in...");

  /**
   * Initiate the Passwordless client with your public api key
   */
  var p = new Passwordless.Client({
    apiKey: API_KEY,
  });

  try {
    /**
     * Sign in - The Passwordless API and the browser initiates a sign in based on the alias
     */

    //var userId = await fetch("user/passwordless-id").then(r => r.text()); // get user id from database

    var token = await p.signinWithAlias(alias);
    //var token = await p.signinWithId(486761564);

    console.log("Received token", token);
    /**
     * Verify the sign in - Call your node backend to verify the token created from the sign in
     */
    var user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then(
      (r) => r.json()
    );

    /**
     * Done - you can now check the user result for status, userid etc
     */
    Status("User details: " + JSON.stringify(user, null, 2));
    Status("Yey! Succesfully signed in without a password!");

    console.log("User", user);
  } catch (e) {
    console.error("Things went really bad: ", e);
    Status("Things went bad, check console");
  }
}
