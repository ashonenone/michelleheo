document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const homeButton = document.getElementById("homeButton");
  const navigationLinks = document.querySelectorAll("#navigation-menu a");
  let currentSlide = 0;

  function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
      if (index === slideIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    updateColors(); // Update the colors when the slide changes
  }

  // Show the first slide initially
  showSlide(currentSlide);

  // Set up the click event for the Home button to trigger the first slide
  homeButton.addEventListener("click", function () {
    currentSlide = 0;
    showSlide(currentSlide);
    updateColors(); // Update the colors when the Home button is clicked
  });

  // Set up the click event on the slideshow container to trigger the next slide
  const slideshowContainer = document.querySelector(".slideshow");
  slideshowContainer.addEventListener("click", function () {
    nextSlide();
  });

  // Function to get the current active slide image
  function getCurrentSlideImage() {
    const activeSlide = document.querySelector(".slide.active");
    const image = activeSlide.querySelector("img");
    return image;
  }

  // Function to extract the dominant color from the current slide image
  async function extractDominantColor(image) {
    return new Promise((resolve, reject) => {
      const vibrant = new Vibrant(image);
      vibrant.getPalette((err, palette) => {
        if (err) {
          reject(err);
        } else {
          const dominantColor = palette.Vibrant.hex || "#FFFFFF";
          resolve(dominantColor);
        }
      });
    });
  }

  // Function to update the colors of Home Button and Navigation Menu based on the current slide image
  function updateColors() {
    const image = getCurrentSlideImage();
    extractDominantColor(image).then((color) => {
      homeButton.style.backgroundColor = color;
      navigationLinks.forEach((link) => {
        link.style.backgroundColor = color;
      });
    });
  }
});
