
    tailwind.config = {
      theme: {
        extend: {
          colors: {
                clifford: '#da373d',
                 brand: {
                    DEFAULT: "#ffff",
                    primary: "#f97316",
                    secondary: "#004a3a",
                },
          }
        }
        },
         varients: {
        extend: {
            display: ["group-focus"],
            opacity: ["group-focus"],
            inset: ["group-focus"],
        },
    },
    }

    const mobileBtn = document.getElementById("btn");
    const mobileMenu = document.getElementById("menu");
    const svg = document.getElementById("Capa_1");
    // const animate = document.getElementById("_1");
    // const animate2 = document.getElementById("_2");
    // const joy = `rotate-45`

    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    var challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);
