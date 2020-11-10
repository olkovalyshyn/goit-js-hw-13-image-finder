export default class ImagesApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchImages() {
    const response = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19034439-608cc2a9f2617ed99a498289b`
    );
    const newImages = await response.json();
    this.incrementPage();

    return newImages.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// return fetch(
//   `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19034439-608cc2a9f2617ed99a498289b`
// )
//   .then((res) => {
//     res.json();
//   })
//   .then((data) => {
//     this.incrementPage();
//   });
