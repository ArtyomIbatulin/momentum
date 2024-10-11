const modalElem = document.querySelector(".modal");
const buttonElem = document.querySelector(".modal-button");

modalElem.style.cssText = `
display: flex;
visibility: hidden;
opacity: 0;
transition: opacity 300ms ease-in-out;
`;

const closeModal = (event) => {
  const target = event.target;

  if (
    target === modalElem ||
    target.closest(".modal__close") ||
    event.code === "Escape"
  ) {
    modalElem.style.opacity = "0";

    setTimeout(() => {
      modalElem.style.visibility = "hidden";
    }, 300);

    window.removeEventListener("keydown", closeModal);
  }
};

const openModal = () => {
  modalElem.style.visibility = "visible";
  modalElem.style.opacity = "1";
  window.addEventListener("keydown", closeModal);
};

buttonElem.addEventListener("click", openModal);
modalElem.addEventListener("click", closeModal);
