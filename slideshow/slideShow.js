"use strict";
const images = [
  { id: "1", url: "./img/img-1.jpg" },
  { id: "2", url: "./img/img-2.jpg" },
  { id: "3", url: "./img/img-3.jpg" },
  { id: "4", url: "./img/img-4.jpg" },
];

const containerItems = document.querySelector("#container-items");

const loadImages = (images, container) => {
  images.forEach((image) => {
    // O forEach vai varrer todos os arrays (imagens).
    container.innerHTML += `<div class='item'>
            <img src='${image.url}'> </div>`;
  });
};

loadImages(images, containerItems);
let items = document.querySelectorAll(".item");

const previous = () => {
  items = document.querySelectorAll(".item");
  containerItems.appendChild(items[0]);
};

const next = () => {
  const lastItem = items[items.length - 1];
  containerItems.insertBefore(lastItem, items[0]);
  items = document.querySelectorAll(".item");
};

document.querySelector("#previous").addEventListener("click", previous);
document.querySelector("#next").addEventListener("click", next);
