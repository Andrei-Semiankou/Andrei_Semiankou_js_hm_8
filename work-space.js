import images from "./gallery-items.js";

let ulRef = document.querySelector(".js-gallery");
let lightBoxImage = document.querySelector(".lightbox__image");
let lightBoxIsOpen = document.querySelector(".lightbox");
let lightBoxButton = document.querySelector('button[type="button"]');
let lightboxOverlay = document.querySelector(".lightbox__overlay");

function creatingList(imagesArr) {
  imagesArr.forEach((image) => {
    ulRef.insertAdjacentHTML(
      "beforeend",
      `<li class="gallery__item">
        <a class="gallery__link" href="${image.original}">
            <img
            class="gallery__image" src="${image.preview}" data-source="${image.original}"
            alt="${image.description}"
            />
        </a>
    </li>`
    );
  });
}
creatingList(images);

ulRef.addEventListener("click", onImageClick);
function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  let imageRef = event.target;
  lightBoxImage.src = imageRef.dataset.source;
  lightBoxIsOpen.classList.add("is-open");
}

lightBoxButton.addEventListener("click", () => {
  lightBoxImage.src = "";
  lightBoxIsOpen.classList.remove("is-open");
});

lightboxOverlay.addEventListener("click", (event) => {
  if (event.target !== lightBoxImage) {
    lightBoxIsOpen.classList.remove("is-open");
  }
});
window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    lightBoxIsOpen.classList.remove("is-open");
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    const index = images.findIndex(
      (image) => image.original === lightBoxImage.src
    );
    if (index !== -1) {
      if (index !== 0) {
        lightBoxImage.src = images[index - 1].original;
      } else {
        lightBoxImage.src = images[images.length - 1].original;
      }
    }
  }
  if (event.code === "ArrowRight") {
    const index = images.findIndex(
      (image) => image.original === lightBoxImage.src
    );
    if (index !== -1) {
      if (index !== images.length - 1) {
        lightBoxImage.src = images[index + 1].original;
      } else {
        lightBoxImage.src = images[0].original;
      }
    }
  }
});



