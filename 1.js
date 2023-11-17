"use strict";


class Reviewer extends ElementWrapper {
  #input = new ElementWrapper();
  #text = new ElementWrapper();
  #error = new ElementWrapper();
  #button = new ElementWrapper();

  create(parentElement) {
    super.create(parentElement, "div", "reviewer");
    this.#createInput();
    this.#createText();
    this.#createError();
    this.#createButton();
  }

  #createInput() {
    this.#input.create(this.element, "input", "reviewer__input");
    this.#input.element.placeholder = "Название продукта";
  }

  #createText() {
    this.#text.create(this.element, "textarea", "reviewer__text");
    this.#text.element.rows = 5;
  }

  #createError() {
    this.#error.create(this.element, "p", "reviewer__error");
    this.#error.element.setAttribute("hidden", "hidden");
    this.#error.element.textContent = "*Не указано название продукта или отсутсвует текст отзыва";
  }

  #createButton() {
    this.#button.create(this.element, "button", "reviewer__button");
    this.#button.element.textContent = "Добавить отзыв";
    this.#button.element.addEventListener("click", this.#onClickButton.bind(this));
  }

  #onClickButton() {
    const title = this.#input.element.value;
    const review = this.#text.element.value;
    if (title.length < 1 || review.length < 1)
      this.#addReviewFail();
    else
      this.#addReviewSuccess();
  }

  #addReviewSuccess() {
    const title = this.#input.element.value;
    const review = this.#text.element.value;
    this.#input.element.value = "";
    this.#text.element.value = "";
    this.#error.element.setAttribute("hidden", "hidden");
    this.#addReviewToStorage(title, review);
  }

  #addReviewFail() {
    this.#error.element.removeAttribute("hidden");
  }

  #addReviewToStorage(product, review) {
    const storage = new ProductStorage(product);
    storage.addReview(review);
  }
}


class App extends ElementWrapper {
  #reviewer;
  #linkToAllReview = new ElementWrapper();

  create() {
    super.create(document.querySelector("body"), "div", "app");
    this.#createReviewer();
    this.#createLinkToAllReview();
  }

  #createReviewer() {
    this.#reviewer = new Reviewer();
    this.#reviewer.create(this.element);
  }

  #createLinkToAllReview() {
    this.#linkToAllReview.create(this.element, "a");
    this.#linkToAllReview.element.href = "2.html";
    this.#linkToAllReview.element.textContent = "Все отзывы >>>"
  }
}


const app = new App();
app.create();
