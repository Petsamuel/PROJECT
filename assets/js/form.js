const loginForm = document.getElementById("login");
const otpverify = document.getElementById("verifyOtp");
const phoneNum = document.getElementById("phoneNumber");
const Submitbtn = document.getElementById("Otpclick");
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
// Print Status messages to UI.
const status = document.getElementById("status");
function Status(text) {
  const currentText = status.innerHTML;
  var newLine = "[" + new Date().toLocaleTimeString() + "]: " + text + "\n";
  status.innerHTML = newLine;
}
Status("Enter matricNo");

async function Signin(alias) {
  var challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  var userID = "Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=";
  var id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

  var publicKey = {
    challenge: challenge,

    rp: {
      name: "YABA COLLEGE OF TECHNOLOGY",
    },

    user: {
      id: id,
      name: alias,
      displayName: "Student",
    },

    pubKeyCredParams: [
      { type: "public-key", alg: -7 },
      // { type: "public-key", alg: -257 },
    ],
    authenticatorSelection: {
      // Try to use UV if possible. This is also the default.
      userVerification: "preferred",
    },
  };

  navigator.credentials
    .create({ publicKey: publicKey })
    .then((newCredentialInfo) => {
      // Send new credential info to server for verification and registration.
      console.log(`"SUCCESS:" ${newCredentialInfo}`);
      document.querySelector("#modalauth").classList.remove("hidden");
    })
    .catch((error) => {
      // No acceptable authenticator or user refused consent. Handle appropriately.
      console.log("FAIL", error);
    });
}
// DEMO UI
function signoutbtn() {
  window.location.href = "/";
}
function verifymat() {
  return true;
}

async function handleSignInSubmit() {
  if (verifymat() === true) {
    Status("Please Wait...");
    var user = await Signin(alias);
    Status("User details: " + JSON.stringify(user));
  } else {
    alert("invalid credentials");
  }
}

document
  .getElementById("passwordless-signin")
  .addEventListener("click", handleSignInSubmit);
