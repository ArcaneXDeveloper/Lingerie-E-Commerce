
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});














const scrollContainer = document.getElementById('scrollContainer');
const scrollThumb = document.getElementById('scrollThumb');

// DRAG TO SCROLL
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
});

// SYNC THUMB POSITION
scrollContainer.addEventListener('scroll', () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollRatio = scrollLeft / maxScroll;
    const thumbWidth = (scrollContainer.clientWidth / scrollContainer.scrollWidth) * 100;
    scrollThumb.style.width = `${thumbWidth}%`;
    scrollThumb.style.transform = `translateX(${scrollRatio * (100 - thumbWidth)}%)`;
});









const productThumbs = document.querySelectorAll(".product-thumb");
const mainImages = document.querySelector(".main-images");
let index = 0;

const productsData = {
  1: {
    title: "Messina Panel Line Multifit One Piece",
    price: "£107.00",
    mainImages: [
      // 🖼️ These are your 2 default active images when user selects product 1
      "./assets/images/Test-img/product/product-1.webp",
      "./assets/images/Product-section/product-1.png"
    ],
    colors: [
      // 🎨 These are the small color swatches
      "./assets/images/Product-section/color-1.png",
      "./assets/images/Product-section/color-2.png",
      "./assets/images/Product-section/color-3.png",
      "./assets/images/Product-section/color-4.png"
    ],
    colorImageMap: [
      // 🔁 These are the matching main image sets for each color
      "./assets/images/Product-section/product-1.png",
      "./assets/images/Product-section/product-2.png",
      "./assets/images/Product-section/product-3.png",
      "./assets/images/Product-section/product-4.png"
    ],
    category: "Sea Level Swim"
  },
  2: {
    title: "Classic Halter Bikini Top",
    price: "£89.00",
    mainImages: [
      "./assets/images/Test-img/product/product-2.webp",
      "./assets/images/Product-section/product-2.png"
    ],
    colors: [
      "./assets/images/Product-section/color-1.png",
      "./assets/images/Product-section/color-2.png",
      "./assets/images/Product-section/color-3.png",
      "./assets/images/Product-section/color-4.png"
    ],
    colorImageMap: [
      "./assets/images/Product-section/product-2.png",
      "./assets/images/Product-section/product-3.png",
      "./assets/images/Product-section/product-4.png",
      "./assets/images/Product-section/product-5.webp"
    ],
    category: "Sunrise Swimwear"
  }
  // ➕ You can add products 3–5 here
};

function updateGallery() {
  mainImages.style.transform = `translateX(-${index * 345}px)`;
}

function updateProductDetails(id) {
  const data = productsData[id];
  if (!data) return;

  document.querySelector(".product-info .title").textContent = data.title;
  document.querySelector(".product-info .price").textContent = data.price;
  document.querySelector(".product-info .category").textContent = data.category;

  // 🖼️ Populate 2 default main images
  mainImages.innerHTML = data.mainImages.map(src => `<img src="${src}" alt="Main Image">`).join('');
  index = 0;
  updateGallery();

  // 🎨 Populate color thumbnails and map their corresponding main image
  const colorContainer = document.querySelector(".color-thumbs");
  colorContainer.innerHTML = data.colors.map((src, i) =>
    `<img src="${src}" class="${i === 0 ? 'active' : ''}" data-img="${data.colorImageMap[i]}" alt="Color">`
  ).join('');

  const updatedColorThumbs = document.querySelectorAll(".color-thumbs img");
  updatedColorThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      updatedColorThumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      const selectedImg = thumb.dataset.img;
      const matchIndex = Array.from(mainImages.children).findIndex(img =>
        img.src.includes(selectedImg.split('/').pop())
      );
      if (matchIndex !== -1) {
        index = matchIndex;
        updateGallery();
      }
    });
  });
}

// 🖱️ Handle product selector click
productThumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    productThumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    const id = thumb.dataset.id;
    updateProductDetails(id);
  });
});

// ⬅️➡️ Navigation buttons
document.querySelector(".next").addEventListener("click", () => {
  if (index < mainImages.children.length - 1) {
    index++;
    updateGallery();
  }
});

document.querySelector(".prev").addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateGallery();
  }
});

// ✅ Load default product
updateProductDetails(1);







const selector = document.querySelector('.product-selector');
  const indicator = selector?.querySelector('::after');

  selector?.addEventListener('scroll', () => {
    const scrollWidth = selector.scrollWidth - selector.clientWidth;
    const scrollPosition = selector.scrollLeft;
    const percentage = scrollPosition / scrollWidth;

    const indicator = document.createElement('style');
    indicator.innerHTML = `
      @media (max-width: 768px) {
        .product-selector::after {
          transform: translateX(${percentage * 100}%);
        }
      }
    `;
    document.head.appendChild(indicator);
  });