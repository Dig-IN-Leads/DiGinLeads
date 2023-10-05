// Function to animate the counter using requestAnimationFrame
function animateCounter(targetElement, startValue, endValue, duration) {
  const range = endValue - startValue;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.round(startValue + range * progress);

    targetElement.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Function to start the counting animation for a single counter
function startSingleCounter(element) {
  const endValue = parseInt(element.dataset.endvalue, 10);
  const duration = parseInt(element.dataset.duration, 10);
  element.textContent = '0';
  animateCounter(element, 0, endValue, duration);
}

// Function to start the counting animation for all counters when they are in the viewport
function startCountAnimation() {
  const counters = document.querySelectorAll('.count-animate');
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.5, // Trigger when 20% of the element is in the viewport
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startSingleCounter(entry.target);
        observer.unobserve(entry.target); // Stop observing after starting animation
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Listen for the 'load' event on the window to start counter animation after full page load
window.onload = function() {
  startCountAnimation();
};

// Function to toggle the visibility of the .fixed-image button based on scroll position and screen width
function toggleFixedImageButton() {
  const button = document.querySelector('.fixed-image');
  const footer = document.querySelector('.footer');
  let scrollPercentageToShowButton;
  let scrollPercentageToStop;

  if (window.innerWidth < 435) { // Small screens
    scrollPercentageToShowButton = 11; // Adjust this value for small screens
  } else if (window.innerWidth < 700) { // Small screens
    scrollPercentageToShowButton = 10; // Adjust this value for small screens
  } else if (window.innerWidth < 991) { // Medium screens
    scrollPercentageToShowButton = 11; // Adjust this value for medium screens
  } else { // Large screens
    scrollPercentageToShowButton = 18; // Adjust this value for large screens
  }

  if (window.innerWidth < 766) { // Small screens
    scrollPercentageToStop = 90; // Adjust this value to set the scroll percentage to stop showing the button
  } else { // Small screens
    scrollPercentageToStop = 94; // Adjust this value for small screens
  }
  // const scrollPercentageToStop = 90; // Adjust this value to set the scroll percentage to stop showing the button

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


// Form submission
function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form data
  const form = document.getElementById('response-form');
  const formData = new FormData(form);

  // Add the current date to the form data
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  formData.append('Date', currentDate);

  // Send form data using fetch
  fetch('https://script.google.com/macros/s/AKfycby-G2IPLPZEy6nfpe0kn-jVZJSoFxHmqz49Z1FYDQXGmw8274asHvG1PNhVnHN7SH0vrg/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    // Handle response if needed
    if (response.ok) {
      alert('Form submitted successfully.');
    } else {
      alert('Error submitting form.');
    }
  })
  .catch(error => {
    // Handle error
    alert('Error submitting form: ' + error.message);
  });
}
