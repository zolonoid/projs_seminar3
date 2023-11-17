"use strict";


class Review extends ElementWrapper {
  #id;
  #delReviewEvent;
  #delButton = new ElementWrapper();

  create(parentElement, id, text, delReviewHandler) {
    super.create(parentElement, "p", "review");
    this.#id = id;
    this.element.textContent = text;
    this.#delReviewEvent = delReviewHandler;
    this.#createDelButton();
  }

  #createDelButton() {
    this.#delButton.create(this.element, "button", "review__del");
    this.#delButton.element.textContent = "x";
    this.#delButton.element.addEventListener("click", this.#onClickDelButton.bind(this));
  }

  #onClickDelButton() {
    this.#delReviewEvent(this.#id);
  }
}


class Product extends ElementWrapper {
  #storage;
  #delProductEvent;
  #title = new ElementWrapper();
  #reviewContainer = new ElementWrapper();
  #buttonHideShow = new ElementWrapper();
  #reviews = [];

  create(parentElement, name, delProductHandler) {
    this.#delProductEvent = delProductHandler;
    this.#storage = new ProductStorage(name);
    super.create(parentElement, "div", "product");
    this.#createTitle(name);
    this.#createReviewContainer();
    this.#createButtonHideShow();
    this.#addReviews();
  }

  #createTitle(name) {
    this.#title.create(this.element, "h2", "product__title");
    this.#title.element.textContent = name;
  }

  #createReviewContainer() {
    this.#reviewContainer.create(this.element, "div");
    this.#reviewContainer.element.setAttribute("hidden", "hidden");
  }

  #createButtonHideShow() {
    this.#buttonHideShow.create(this.element, "button", "product__hs-reviews");
    this.#buttonHideShow.element.textContent = "показать отзывы";
    this.#buttonHideShow.element.addEventListener("click", this.#clickButtonHideShow.bind(this));
  }

  #clickButtonHideShow() {
    if (this.#reviewContainer.element.hasAttribute("hidden")) {
      this.#reviewContainer.element.removeAttribute("hidden");
      this.#buttonHideShow.element.textContent = "скрыть отзывы";
    } else {
      this.#reviewContainer.element.setAttribute("hidden", "hidden");
      this.#buttonHideShow.element.textContent = "показать отзывы";
    }
  }

  #delReviewHandler(id) {
    this.#storage.delReview(Number.parseInt(id));
    this.#reviews.forEach((x) => x.element.remove());
    this.#reviews = [];
    if (this.#storage.reviews.length > 0)
      this.#addReviews();
    else
      this.#delProductEvent(this.#storage.product);
  }

  #addReviews() {
    const reviews = this.#storage.reviews;
    for (let i = 0; i < reviews.length; i++) {
      const id = i.toString();
      const review = new Review();
      this.#reviews.push(review);
      review.create(this.#reviewContainer.element, id, reviews[i], this.#delReviewHandler.bind(this));
    }
  }
}


class App extends ElementWrapper {
  #products = new Map();
  #productContainer = new ElementWrapper();
  #linkToAddReview = new ElementWrapper();

  create() {
    super.create(document.querySelector("body"), "div", "app");
    this.#createProductContainer();
    this.#createLinkToAddReview();
    this.#addProducts();
  }

  #createProductContainer() {
    this.#productContainer.create(this.element, "div");
  }

  #createLinkToAddReview() {
    this.#linkToAddReview.create(this.element, "a");
    this.#linkToAddReview.element.href = "1.html";
    this.#linkToAddReview.element.textContent = "Добавить отзыв >>>"
  }

  #delProductHandler(name) {
    const product = this.#products.get(name);
    this.#products.delete(name);
    product.element.remove();
  }

  #addProducts() {
    for (const name of ProductStorage.products) {
      const product = new Product();
      this.#products.set(name, product);
      product.create(this.#productContainer.element, name, this.#delProductHandler.bind(this));
    }
  }
}


const app = new App();
app.create();
