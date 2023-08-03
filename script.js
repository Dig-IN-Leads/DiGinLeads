// Function to animate the counter
function animateCounter(targetElement, startValue, endValue, duration) {
  const range = endValue - startValue;
  const stepTime = Math.abs(Math.floor(duration / range));
  let currentValue = startValue;
  const timer = setInterval(function () {
    currentValue += range > 0 ? 1 : -1;
    targetElement.textContent = currentValue;
    if ((range > 0 && currentValue >= endValue) || (range < 0 && currentValue <= endValue)) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Function to start the counting animation for a single counter
function startSingleCounter(element) {
  const endValue = parseInt(element.dataset.endvalue, 10);
  const duration = parseInt(element.dataset.duration, 10);
  element.textContent = '0';
  animateCounter(element, 0, endValue, duration);
}

// Function to start the counting animation for all counters
function startCountAnimation() {
  const counters = document.querySelectorAll('.count-animate');
  counters.forEach(counter => {
    // Check if the element is in the viewport
    const rect = counter.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    if (rect.top < viewHeight) {
      startSingleCounter(counter);
    } else {
      // Create the Intersection Observer
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target); // Stop observing once it's visible
            startSingleCounter(entry.target);
          }
        });
      }, { threshold: 0.5 });

      // Start observing each element with class 'count-animate'
      observer.observe(counter);
    }
  });
}

// Call the counting animation function when the page loads
document.addEventListener('DOMContentLoaded', startCountAnimation);


// Function to toggle the visibility of the .fixed-image button based on scroll position
function toggleFixedImageButton() {
  const button = document.querySelector('.fixed-image');
  const footer = document.querySelector('.footer');
  const scrollPercentageToShowButton = 17; // Adjust this value to set the scroll percentage to show the button
  const scrollPercentageToStop = 93; // Adjust this value to set the scroll percentage to stop showing the button

  const scrollOffset = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const footerOffset = footer.offsetTop; // Get the offset from the top of the document to the footer

  const scrollPercentage = (scrollOffset / (documentHeight - windowHeight)) * 100;
  
  // Calculate the scroll percentage considering the footer height
  const scrollPercentageWithFooter = ((scrollOffset + windowHeight) / (documentHeight + footer.offsetHeight)) * 100;

  if (scrollPercentage >= scrollPercentageToShowButton && scrollPercentageWithFooter <= scrollPercentageToStop) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

// Add a scroll event listener to trigger the toggle function on scroll
document.addEventListener('scroll', toggleFixedImageButton);

// Call the toggle function once on page load to check if the button should be visible initially
toggleFixedImageButton();
