tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
        brand: {
          DEFAULT: "#ffff",
          primary: "#f97316",
          secondary: "#004a3a",
        },
      },
    },
  },
  varients: {
    extend: {
      display: ["group-focus"],
      opacity: ["group-focus"],
      inset: ["group-focus"],
    },
  },
};

const mobileBtn = document.getElementById("btn");
const mobileMenu = document.getElementById("menu");
const svg = document.getElementById("Capa_1");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
