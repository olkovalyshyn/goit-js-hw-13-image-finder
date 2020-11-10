import "./css/common.css";
import ImagesApiService from "./js/imgages-api-service";
import imageCard from "./templates/image-card-tpl.hbs";
import animateScrollTo from "animated-scroll-to";

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
  clearImagesContainer();

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);

  if (imagesApiService.query !== "") {
    refs.loadMoreBtn.classList.remove("is-hidden");
  }
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);
  scrolling();

  // const response = await imagesApiService.fetchImages();
  // console.log("response", response);
  // appendImagesMarkup(response);

  // console.log("resolve", resolve);
  // imagesApiService.fetchImages().then(appendImagesMarkup);
  // scrollToElement();

  // scroll2();
  // scroll3();
}

//   window.scrollTo({
//     top: refs.imagesContainer.offsetHeight,
//     left: 0,
//     behavior: "smooth",
//   });

//   const height = document.documentElement.clientHeight;

// function scroll() {
//   const scrollHeight = document.documentElement.scrollHeight;
//   console.log("!!!scrollHeight", scrollHeight);

//   const clientHeight = document.documentElement.clientHeight;
//   console.log("!!!clientHeight", clientHeight);
//   const delta = scrollHeight - clientHeight - clientHeight;
//   console.log("!!!delta", delta);

//   const scrollTop = document.documentElement.scrollTop;
//   console.log("!!!scrollTop", scrollTop);
//   //   const br = window.getBoundingClientRect();
//   //   console.log(br);
//   //   const top = br.top;
//   //   console.log(top);

//   // window.scrollTo(0, Math.round(delta));

//   //   alert(
//   //     "Top:" +
//   //       br.top +
//   //       ", Left:" +
//   //       br.left +
//   //       ", Right:" +
//   //       br.right +
//   //       ", Bottom:" +
//   //       br.bottom
//   //   );

//   //   const height = document.documentElement.clientHeight;
//   // console.log("height", height);
//   // console.log("!!!ВИСОТА", window.pageYOffset);

//   // const height = document.documentElement.clientHeight;
//   // console.log("!!!height", height);
// }

function appendImagesMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML("beforeend", imageCard(hits));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = "";
}

// function scrollToElement() {
//   // const options = {
//   //   speed: 500,
//   //   verticalOffset: -10,
//   // };

//   const scrollHeight = document.documentElement.scrollHeight;
//   // // console.log("!!!scrollHeight", scrollHeight);

//   const clientHeight = document.documentElement.clientHeight;
//   // // console.log("!!!clientHeight", clientHeight);
//   const delta = scrollHeight - clientHeight / 2;

//   const scrollOptions = {
//     left: 0,
//     top: delta,
//     behavior: "smooth",
//   };

//   // window.scrollTo(scrollOptions);
//   // window.scrollBy(0, window.innerHeight);

//   // animateScrollTo(delta, options);
// }

function scroll2() {
  scrollY += window.innerHeight;
  // console.log(scrollY);
  window.scrollTo({
    top: scrollY,
    left: 0,
    behavior: "smooth",
  });
}

function scrolling() {
  const scrollHeight = document.documentElement.scrollHeight;

  const clientHeight = document.documentElement.clientHeight;
  const delta = scrollHeight - clientHeight;

  const scrollOptions = {
    top: delta + 100,
    left: 0,
    behavior: "smooth",
  };
  setTimeout(() => {
    window.scrollTo(scrollOptions);
  }, 500);
}
