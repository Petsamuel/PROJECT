const loginForm = document.getElementById("login");
const otpverify = document.getElementById("verifyOtp");
const phoneNum = document.getElementById("phoneNumber");
const Submitbtn = document.getElementById("sign-in-button");
const comfirmOtp = document.getElementById("loginsubmmit");
const innerInfo = document.getElementById("container");
const svg1 = document.getElementById("svg");
const form = document.getElementById("formID");
const formContent = document.querySelector(".formContent");

const verifiedMenu = document.querySelector("#statMenu");
verifiedMenu.addEventListener("click", verifyMenu);
const verifiedContent = document.querySelector(".verifiedContent");

function verifyMenu() {
  formContent.classList.add("hidden");
  verifiedContent.classList.remove("hidden");
}

//mobile login form
const navlogin = document.querySelector("#mlogin");
navlogin.addEventListener("click", () => {
  svg1.classList.add("hidden");
  form.classList.remove("hidden");
});

const registerform = document.querySelector("#register");
registerform.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

const registerBtn = document.querySelector("#printIcon");
registerBtn.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginForm.classList.add("hidden");
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

async function Signin(alias) {
  var challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  var userID = "Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=";
  var id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

  var publicKey = {
    challenge: challenge,

    rp: {
      name: "Example Inc.",
    },

    user: {
      id: id,
      name: "alice@example.com",
      displayName: "Alice Liddell",
    },

    pubKeyCredParams: [
      { type: "public-key", alg: -7 },
      { type: "public-key", alg: -257 },
    ],
    attestation: "direct",
  };

  navigator.credentials
    .create({ publicKey: publicKey })
    .then((newCredentialInfo) => {
      console.log("SUCCESS", newCredentialInfo);
      document.querySelector("#modalauth").classList.remove("hidden");
      alert("SUCCESS");
    })
    .catch((error) => {
      console.log("FAIL", error);
      alert("FAILED");
    });
}
// DEMO UI

async function handleSignInSubmit() {
  //   e.preventDefault();
  var alias = document.getElementById("alias").value;
  var user = await Signin(alias);
  Status("User details: " + JSON.stringify(user, null, 2));
}
document
  .getElementById("printIcon")
  .addEventListener("click", handleSignInSubmit);

// Print Status messages to UI.
var status = document.getElementById("status");
function Status(text) {
  var currentText = status.innerText;
  var newLine = "[" + new Date().toLocaleTimeString() + "]: " + text + "\n";
  status.innerText = newLine + currentText;
}
Status("Welcome! Please register or sign in");

document
  .getElementById("passwordless-signin")
  .addEventListener("click", fingerValidation);

function fingerValidation() {
  var publicKey = {
    challenge: challenge,

    allowCredentials: [{ type: "public-key", id: credentialId }],
  };

  navigator.credentials
    .get({ publicKey: publicKey })
    .then((getAssertionResponse) => {
      alert("SUCCESSFULLY GOT AN ASSERTION! Open your browser console!");
      console.log("SUCCESSFULLY GOT AN ASSERTION!", getAssertionResponse);
      document.querySelector("#modalauth").classList.remove("hidden");
    })
    .catch((error) => {
      alert("Open your browser console!");
      console.log("FAIL", error);
    });
}
