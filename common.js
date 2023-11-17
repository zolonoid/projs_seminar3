"use strict";


class ProductStorage {
  #product;
  #reviews;

  constructor(product) {
    this.#product = product;
    this.#loadReviews();
  }

  get product() {
    return this.#product;
  }

  get reviews() {
    return [...this.#reviews];
  }

  addReview(review) {
    if (!review) return false;
    this.#reviews.push(review);
    this.#saveReviews();
  }

  delReview(index) {
    if (index < 0 || index >= this.#reviews.length)
      return false;
    this.#reviews.splice(index, 1);
    this.#saveReviews();
  }

  #loadReviews() {
    const revjson = localStorage.getItem(this.#product) ?? "[]";
    this.#reviews = JSON.parse(revjson);
  }

  #saveReviews() {
    if (this.#reviews.length > 0) {
      const revjson = JSON.stringify(this.#reviews);
      localStorage.setItem(this.#product, revjson);
    } else {
      localStorage.removeItem(this.#product);
    }
  }

  static get products() {
    const products = [];
    for (let i = 0; i < localStorage.length; i++) {
      const product = localStorage.key(i);
      products.push(product);
    }
    return products;
  }
}


class ElementWrapper {
  #element;

  get element() {
    return this.#element;
  }

  create(parentElement, tagName, ...classes) {
    this.#element = document.createElement(tagName);
    parentElement.append(this.#element);
    if (classes.length > 0)
      this.#element.classList.add(...classes);
  }
}