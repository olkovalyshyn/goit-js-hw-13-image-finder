import "./css/common.css";
import ImagesApiService from "./js/imgages-api-service";
import imageCard from "./templates/image-card-tpl.hbs";

import "@pnotify/core/dist/PNotify.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";

import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const imagesApiService = new ImagesApiService();

const refs = {
  searchForm: document.querySelector(".search-form"),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  imagesContainer: document.querySelector(".js-gallery"),
  controlLine: document.querySelector("#control-line"),
};

refs.searchForm.addEventListener("submit", onSearch);
// refs.loadMoreBtn.addEventListener("click", onLoadMore);
refs.imagesContainer.addEventListener("click", onOpenModal);

// console.log("!!!imagesApiService", imagesApiService);

function onSearch(e) {
  e.preventDefault();
  clearImagesContainer();

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
  if (imagesApiService.query === "") {
    onInfoNoTextForResearch();
  }

  // if (imagesApiService.query !== "") {
  //   refs.loadMoreBtn.classList.remove("is-hidden");
  // }
}
// function onLoadMore() {
//   imagesApiService.fetchImages().then(appendImagesMarkup);
//   // scrolling();
// }

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML("beforeend", imageCard(hits));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = "";
}

// function scrolling() {
//   const scrollHeight = document.documentElement.scrollHeight;

//   const clientHeight = document.documentElement.clientHeight;
//   const delta = scrollHeight - clientHeight;

//   const scrollOptions = {
//     top: delta + 100,
//     left: 0,
//     behavior: "smooth",
//   };
//   setTimeout(() => {
//     window.scrollTo(scrollOptions);
//   }, 500);
// }

function onInfoNoTextForResearch() {
  error({
    text: "No search query. Enter text to search.",
    delay: 3000,
  });
}

function onOpenModal(e) {
  const instance = basicLightbox.create(`
    <img src=${e.target.dataset.src}>`);
  instance.show();
}

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && imagesApiService.query !== "") {
      imagesApiService.fetchImages().then(appendImagesMarkup);
    }
  });
};
const options = {
  rootMargin: "200px",
};
const observer = new IntersectionObserver(callback, options);

observer.observe(refs.controlLine);
