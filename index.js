// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону. \/
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
//     пока грузится изображение, мы не видели предыдущее.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import { galleryItems } from "./app.js";

const refs = {
  galleryEl: document.querySelector(".js-gallery"),
  modalEl: document.querySelector(".js-lightbox"),
  overlayEl: document.querySelector(".lightbox__overlay"),
  modalImgEl: document.querySelector(".lightbox__image"),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const createGalleryMurkup = galleryItems => {
  return galleryItems
    .map(
      ({ preview, original, description }) => `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`,
    )
    .join("");
};

refs.galleryEl.insertAdjacentHTML(
  "beforeEnd",
  createGalleryMurkup(galleryItems),
);

const onImageClick = e => {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  e.preventDefault();
  refs.modalEl.classList.add("is-open");
  refs.modalImgEl.src = e.target.closest(".gallery__link").href;
  refs.modalImgEl.alt = e.target.alt;
};

refs.galleryEl.addEventListener("click", onImageClick);

const onModalCloseBtnClick = () => {
  refs.modalEl.classList.remove("is-open");
  refs.modalImgEl.src = "";
  refs.modalImgEl.alt = "";
};

refs.modalCloseBtn.addEventListener("click", onModalCloseBtnClick);
refs.overlayEl.addEventListener("click", onModalCloseBtnClick);

const onESCKeydown = e => {
  if (e.code !== "Escape") {
    return;
  }
  refs.modalEl.classList.remove("is-open");
  refs.modalImgEl.src = "";
  refs.modalImgEl.alt = "";
};

document.addEventListener("keydown", onESCKeydown);
