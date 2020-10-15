// hide header on scroll down & show on scroll up
const header = document.getElementById("header");
let lastPos = document.documentElement.scrollTop;
window.addEventListener("scroll", function () {
  let currPos = document.documentElement.scrollTop;
  if (currPos > lastPos) {
    if (currPos > header.offsetHeight) {
      header.classList.add("hide-header");
      header.classList.remove("nice-shadow");
    }
  } else {
    header.classList.remove("hide-header");
    header.classList.add("nice-shadow");
  }
  lastPos = currPos;
});

// menu toggle on mobile device
const menu = document.getElementById("menu");
const searchBox = document.getElementById("search");
const menuToggle = document.getElementById("menu-toggle");
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  searchBox.classList.toggle("hidden");
});

// simple lazy load
const lazyImages = document.getElementsByClassName("lazy");
document.addEventListener(
  "DOMContentLoaded",
  () => {
    [...lazyImages].forEach((elem) => {
      let originalImage = elem.dataset.src;
      elem.setAttribute("src", originalImage);
      elem.removeAttribute("data-src");
    });
  },
  false
);

// medium-zoom on article images
mediumZoom("#content img", {
  background: "#333",
});

/* enhanced code blocks */
const codeBlocks = document.querySelectorAll("code");
for (code of codeBlocks) {
  // toolbar with language and copy function
  const lang = code.className.replace("language-", "");
  if (lang) {
    code.insertAdjacentHTML(
      "beforebegin",
      `<div class="code-toolbar">
        <button class="code-toolbar-item">${lang}</button>
        <button class="code-toolbar-item btn-copy-code">copy</button>
      </div>`
    );
  }
}

// attach copy function to "copy" buttons
new ClipboardJS(".btn-copy-code", {
  target: function (trigger) {
    return trigger.parentElement.nextElementSibling;
  },
});
