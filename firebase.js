(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDesPeGT_C5ui6neIrWY7beVaVWIENfKIs",
    authDomain: "fir-92724.firebaseapp.com",
    projectId: "fir-92724",
    storageBucket: "fir-92724.appspot.com",
    messagingSenderId: "306360100843",
    appId: "1:306360100843:web:fa4c17ab4a4b67ea39dbae",
    measurementId: "G-3MJ0WC11J2",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
})();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "sign-in-button",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    },
  }
);
recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

function verifynum() {
  let checker = /[a-zA-Z0-9]/;

  if (phoneNum.value == "") {
    document.querySelector("#result-alert").classList.add("text-red-900");
  }
  if (phoneNum.value == "07011550818") {
    return true;
  }
  if (phoneNum.value == "07011550818") {
    document.querySelector("#result-alert").classList.add("text-red-900");
    return true;
  }
}

function onSignInSubmit() {
  if (verifynum() == true) {
    const phoneNumber = "+234" + phoneNum.value;
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        Output("[" + new Date().toLocaleTimeString() + "]: " + "OTP SENT");
        // ...
      })
      .catch((error) => {
        Output(error);
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
      // User signed in successfully.
      const user = result.user;
      document.querySelector("#modalauth").classList.remove("hidden");
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      Output(`${error}`);
    });
}
