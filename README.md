# PROJECT - Hostel Security system solution

This is a solution to the [Hostel Security system solution](https://www.teambiee.netlify.app/).
Hostel Security system designed using the firebase auth and the webauth api.
security in organization is one of the most persistent problems that organization needs to address.
the concept of fingerprint authentication and OTP optimize the use of password.
case study for the application is yct hostel

## Table of contents

- [Overview](#overview)
  - [The objective](#the-objective)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

Security threats are constantly regarded as one of the top challenges for an organization that must be addressed. Even when security rules are correctly designed at the outset, they may frequently be manipulated at any moment by any employee. Fortunately, the proposed system, "DEVELOPMENT OF A SECURITY SYSTEM FOR HOSTELS USING FINGERPRINT AND ONE-TIME-PASSWORD," appears to be feasible to supplement the existing manual-based system, which has the disadvantages of impersonation, inaccuracy, time consumption, and poor performance.

### The objective

Users should be able to:

- Ensure securely and remotely verified either using their fingerprint or a One-Time-Password (OTP), such that verified students are allocated to Yabatech Hostel facility.

### Screenshot

![](./public/homepage.PNG)
![](./public/otp%20sent.PNG)
![](./public/success.PNG)

### Links

- GITHUB URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://teambiee.netlify.app)

### Built with

- Semantic HTML5 markup
- TAILWINDCSS custom properties
- Google Firebase
- CSS Grid
- Desktop-first workflow
- [node.js](https://nodjs.org/) - JS library
- [webauthn](https://w3c.org/) - webauthentication fidelity

### What I learned

The implementation of webauthentication using the Atestation, And also the firebase-amin sdk
see below:

```js
navigator.credentials
  .create({ publicKey: publicKey })
  .then((newCredentialInfo) => {
    // Send new credential info to server for verification and registration.
    console.log(`"SUCCESS 🎉:" ${newCredentialInfo}`);
  })
  .catch((error) => {
    // No acceptable authenticator or user refused consent. Handle appropriately.
    console.log("FAIL 🎉", error.message);
  });
```

### Continued development

Security authentication is a very broad assessment which has the tendency to be improved on as technology evolves in the new era. Researchers who intend to enhance these new findings in moment time are recommended to:

- Consider the addition of mobile phones GPS system i.e. application of device location in order to track the whereabouts of students in the hostel.
- The use of QR scanners, codes and assignments can be investigated to enhance security measures

### Useful resources

- [Example resource 1](https://console.firebase.com) - This helped me for phone number authentication. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.mdn.com) - This is an amazing article which helped me finally understand the use and implementation of webauthentication . I'd recommend it to anyone still learning this concept.

## Author

- Website - [Add your name here](https://bieeportfolio.netlify.app)
- Github - [@bieefilled](https://github.com/@bieefilled)
- Twitter - [@bieefilled](https://www.twitter.com/@bieefilled)

## Acknowledgments

Finally, special thank my friends for their encouragement, unwavering efforts.
also to Mr Michael Peters for encouragement, advices.

## Got feedback for me?

i'll love receiving feedback! i'm always looking to improve on challenges. So if you have anything you'd like to mention, please email hi petsamuel[at]gmail[dot]com.

This project is completely free. Please share it with anyone who will find it useful for practice.

**Have fun building!** 🚀
