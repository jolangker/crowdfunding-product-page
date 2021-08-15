const menuToggler = document.getElementById("menuToggler");

menuToggler.addEventListener("click", function () {
  const menu = document.getElementById("menu");
  const nav = document.querySelector("nav");
  const close = document.querySelector("#menuToggler img");

  menu.classList.toggle("hidden");
  menu.style.top = nav.offsetTop + 50 + "px";
  menu.style.width = "calc(100% - 2.5rem)";

  if (close.src == "https://jolangker.netlify.app/projects/crowdfunding-product-page/images/icon-hamburger.svg") {
    close.src = "https://jolangker.netlify.app/projects/crowdfunding-product-page/images/icon-close-menu.svg";
  } else {
    close.src = "https://jolangker.netlify.app/projects/crowdfunding-product-page/images/icon-hamburger.svg";
  }
});

window.addEventListener("resize", function () {
  if (window.matchMedia("(min-width:768px)").matches) {
    const menu = document.getElementById("menu");

    menu.style = "";
  } else {
    const nav = document.querySelector("nav");

    menu.style.top = nav.offsetTop + 50 + "px";
    menu.style.width = "calc(100% - 2.5rem)";
  }
});

const bookmark = document.querySelector(".bookmark");
bookmark.addEventListener("click", function () {
  const bookmarkedCircle = document.querySelector(".bookmark-logo circle");
  const bookmarkedLogo = document.querySelector(".bookmark-logo path");
  const bookmarkText = document.querySelector(".bookmark p");

  bookmarkedCircle.classList.toggle("bookmarked-circle");
  bookmarkedLogo.classList.toggle("bookmarked-logo");

  bookmarkText.classList.toggle("text-green-800");

  if (bookmarkText.textContent == "Bookmark") {
    bookmarkText.textContent = "Bookmarked";
  } else {
    bookmarkText.textContent = "Bookmark";
  }
});

const modal = document.querySelector("#modal");
const modalToggler = document.querySelectorAll(".btn-reward");
modalToggler.forEach((e) => {
  e.addEventListener("click", (event) => {
    modal.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");

    modal.querySelectorAll(".pledge-option").forEach((e) => {
      pledgeBlur(e);
    });

    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", (event) => {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  });
});

const getNumber = document.querySelectorAll("#funding h1");
const progressBar = document.querySelector("#progress");
const currentProgress = progressBar.children[0];

let backed = 89114;
let backers = 5007;

currentProgress.style.width = (backed / 100000) * 100 + "%";

function adding(currentBacked, totalBackers) {
  getNumber[0].textContent = "$" + currentBacked.toLocaleString();

  getNumber[1].textContent = totalBackers.toLocaleString();

  currentProgress.style.width = (currentBacked / 100000) * 100 + "%";
  currentProgress.style.maxWidth = "100%";

  if (currentBacked >= 100000) {
    currentProgress.classList.add("bg-green-800");
  }
}

let stocksValue = [101, 64, 1];

function minus(stock, option, left) {
  const stock1 = document.querySelectorAll(".stock-1");
  const stock2 = document.querySelectorAll(".stock-2");
  const stock3 = document.querySelectorAll(".stock-3");

  if (option == 1) {
    for (let index = 0; index < stock1.length; index++) {
      const element = stock1[index];
      element.textContent = stock;
    }
  } else if (option == 2) {
    for (let index = 0; index < stock2.length; index++) {
      const element = stock2[index];
      element.textContent = stock;
    }
  } else {
    for (let index = 0; index < stock3.length; index++) {
      const element = stock3[index];
      element.textContent = stock;
    }
  }
  const getPledge1 = stock1[0].parentElement.parentElement.parentElement;
  const getText1 = stock1[0].parentElement.nextElementSibling;
  const getPledge2 = stock2[0].parentElement.parentElement.parentElement;
  const getText2 = stock2[0].parentElement.nextElementSibling;
  const getPledge3 = stock3[0].parentElement.parentElement.parentElement;
  const getText3 = stock3[0].parentElement.nextElementSibling;

  if (left[0] == 0) {
    getPledge1.classList.add("opacity-50");
    getText1.textContent = "Out of stock";
    getText1.disabled = true;
    getText1.classList.add("cursor-not-allowed");
    pledgeOption[1].removeAttribute("tabindex");
    pledgeOption[1].classList.add("opacity-50");
  } else if (left[1] == 0) {
    getPledge2.classList.add("opacity-50");
    getText2.textContent = "Out of stock";
    getText2.disabled = true;
    getText2.classList.add("cursor-not-allowed");
    pledgeOption[2].removeAttribute("tabindex");
    pledgeOption[2].classList.add("opacity-50");
  } else if (left[2] == 0) {
    getPledge3.classList.add("opacity-50");
    getText3.textContent = "Out of stock";
    getText3.disabled = true;
    getText3.classList.add("cursor-not-allowed");
    pledgeOption[3].removeAttribute("tabindex");
    pledgeOption[3].classList.add("opacity-50");
  }
}

const pledgeOption = document.querySelectorAll(".pledge-option");
pledgeOption.forEach((e) => {
  e.addEventListener("focus", function (event) {
    pledgeFocus(e);
  });
  e.addEventListener("blur", function (event) {
    const pledgeForm = this.querySelector("#pledgeForm");
    const pledgeInput = this.querySelector("#pledgeInput");
    const pledgeSubmit = this.querySelector("#pledgeSubmit");

    if (event.relatedTarget == pledgeInput || event.relatedTarget == pledgeSubmit) {
      pledgeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const getValues = pledgeInput.value;

        if (getValues == "") return;

        const currentPledge = this.parentElement.parentElement.parentElement;

        if (currentPledge == pledgeOption[1]) {
          minus((stocksValue[0] -= 1), 1, stocksValue);
        } else if (currentPledge == pledgeOption[2]) {
          minus((stocksValue[1] -= 1), 2, stocksValue);
        } else if (currentPledge == pledgeOption[3]) {
          minus((stocksValue[2] -= 1), 3, stocksValue);
        }

        const values = parseFloat(getValues);

        adding(backed + values, backers++);

        pledgeInput.value = "";

        const modalCompleted = document.querySelector("#modalCompleted");
        const btnGotIt = document.querySelector("#btnGotIt");

        modal.classList.add("hidden");
        modalCompleted.classList.remove("hidden");

        btnGotIt.addEventListener("click", function (event) {
          modalCompleted.classList.add("hidden");

          document.body.classList.remove("overflow-hidden");

          document.querySelector("#funding").scrollIntoView({
            behavior: "smooth",
          });
        });
      });
    } else {
      pledgeBlur(e);
    }
  });
});

function pledgeFocus(element) {
  const selected = element.querySelector(".selected");
  const pledgeTittle = element.querySelector(".pledge-tittle");
  const pledgeExpand = element.querySelector(".pledge-expand");
  const pledgeThis = element;

  pledgeThis.classList.add("ring-2", "ring-green-400", "border-transparent");
  selected.classList.remove("hidden");
  pledgeTittle.classList.add("text-green-400");
  pledgeExpand.classList.remove("hidden");
}

function pledgeBlur(element) {
  const selected = element.querySelector(".selected");
  const pledgeTittle = element.querySelector(".pledge-tittle");
  const pledgeExpand = element.querySelector(".pledge-expand");
  const pledgeThis = element;

  pledgeThis.classList.remove("ring-2", "ring-green-400", "border-transparent");
  selected.classList.add("hidden");
  pledgeTittle.classList.remove("text-green-400");
  pledgeExpand.classList.add("hidden");
}
