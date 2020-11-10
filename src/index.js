import "./css/common.css";
import ImagesApiService from "./js/imgages-api-service";
import imageCard from "./templates/image-card-tpl.hbs";

const API_KEY = "19034439-608cc2a9f2617ed99a498289b";
let searchQuery = "";

const imagesApiService = new ImagesApiService();

const refs = {
  searchForm: document.querySelector(".search-form"),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  imagesContainer: document.querySelector(".js-gallery"),
};

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

// console.log("!!!imagesApiService", imagesApiService);

function onSearch(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);

  window.scrollBy({
    top: document.documentElement.clientHeight - 100,
    behavior: "smooth",
  });

  //   window.scrollTo({
  //     top: refs.imagesContainer.offsetHeight,
  //     left: 0,
  //     behavior: "smooth",
  //   });

  //   const height = document.documentElement.clientHeight;
}

function scroll() {
  const scrollHeight = document.documentElement.scrollHeight;
  console.log("!!!scrollHeight", scrollHeight);

  const clientHeight = document.documentElement.clientHeight;
  console.log("!!!clientHeight", clientHeight);
  const delta = scrollHeight - clientHeight - clientHeight;
  console.log("!!!delta", delta);

  const scrollTop = document.documentElement.scrollTop;
  console.log("!!!scrollTop", scrollTop);
  //   const br = window.getBoundingClientRect();
  //   console.log(br);
  //   const top = br.top;
  //   console.log(top);

  window.scrollTo(0, Math.round(delta));

  //   alert(
  //     "Top:" +
  //       br.top +
  //       ", Left:" +
  //       br.left +
  //       ", Right:" +
  //       br.right +
  //       ", Bottom:" +
  //       br.bottom
  //   );

  //   const height = document.documentElement.clientHeight;
  // console.log("height", height);
  // console.log("!!!ВИСОТА", window.pageYOffset);

  // const height = document.documentElement.clientHeight;
  // console.log("!!!height", height);
}

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML("beforeend", imageCard(hits));
}
