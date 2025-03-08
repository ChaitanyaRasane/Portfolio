document.addEventListener("DOMContentLoaded", function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              window.scrollTo({
                  top: targetSection.offsetTop - 50,
                  behavior: "smooth"
              });
          }
      });
  });

  // Ensure dark mode button exists before adding an event listener
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
      darkModeToggle.addEventListener("click", function() {
          document.body.classList.toggle("dark-mode");

          // Save mode preference in localStorage
          if (document.body.classList.contains("dark-mode")) {
              localStorage.setItem("darkMode", "enabled");
          } else {
              localStorage.setItem("darkMode", "disabled");
          }
      });

      // Preserve Dark Mode on Reload
      if (localStorage.getItem("darkMode") === "enabled") {
          document.body.classList.add("dark-mode");
      }
  }

  // Ensure contact form exists before adding an event listener
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
      contactForm.addEventListener("submit", function(event) {
          event.preventDefault();
          fetch(this.action, {
              method: "POST",
              body: new FormData(this),
              headers: { 'Accept': 'application/json' }
          }).then(response => {
              if (response.ok) {
                  document.getElementById("statusMessage").innerText = "Message Sent!";
                  this.reset();
              } else {
                  document.getElementById("statusMessage").innerText = "Error sending message.";
              }
          }).catch(error => {
              document.getElementById("statusMessage").innerText = "Error sending message.";
          });
      });
  }

  // Typewriter Effect
  const words = ["Software Engineer", "AI/ML Enthusiast", "Full-Stack Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  const typewriterElement = document.getElementById("typewriter");

  function typeEffect() {
      if (!typewriterElement) return; // Avoid errors

      if (charIndex < words[wordIndex].length) {
          typewriterElement.textContent += words[wordIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeEffect, 100);
      } else {
          setTimeout(eraseEffect, 1500);
      }
  }

  function eraseEffect() {
      if (charIndex > 0) {
          typewriterElement.textContent = words[wordIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(eraseEffect, 50);
      } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeEffect, 500);
      }
  }

  typeEffect();

  // Project Modal Functionality
  function openModal(id) {
      document.getElementById(id).style.display = "flex";
  }

  function closeModal(id) {
      document.getElementById(id).style.display = "none";
  }

  window.openModal = openModal;
  window.closeModal = closeModal;
});
