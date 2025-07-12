// Get input elements (if they exist)
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const countryCodeSelect = document.getElementById("country-code");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

// Media Modal Logic
const mediaModal = document.getElementById("mediaModal");
const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const videoSource = modalVideo?.querySelector("source");

if (mediaModal) {
  mediaModal.addEventListener("show.bs.modal", function (event) {
    const trigger = event.relatedTarget;
    const type = trigger.getAttribute("data-type");
    const src = trigger.getAttribute("data-src");

    if (type === "image") {
      modalImage.src = src;
      modalImage.classList.remove("d-none");
      modalVideo.classList.add("d-none");
      modalVideo.pause();
    } else if (type === "video") {
      videoSource.src = src;
      modalVideo.load();
      modalVideo.classList.remove("d-none");
      modalImage.classList.add("d-none");
      modalVideo.play();
    }
  });

  mediaModal.addEventListener("hidden.bs.modal", () => {
    modalImage.src = "";
    modalVideo.pause();
    modalVideo.currentTime = 0; // Optional: reset video
    videoSource.src = "";
  });
}

// Validation setup only if form exists
if (form) {
  // Feedback elements
  const nameFeedback = document.getElementById("name-feedback");
  const emailFeedback = document.getElementById("email-feedback");
  const phoneFeedback = document.getElementById("phone-feedback");
  const messageFeedback = document.createElement("small");
  messageFeedback.classList.add("contact__feedback");
  messageInput.insertAdjacentElement("afterend", messageFeedback);

  // Email validation
  function validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co\.[a-z]{2}|[a-z]{2,})$/i;
    return regex.test(email);
  }

  // Phone validation
  function validatePhone(phone) {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  }

  // Real-time validation
  nameInput.addEventListener("input", () => {
    nameFeedback.textContent =
      nameInput.value.trim().length < 3
        ? "Name must be at least 3 characters."
        : "";
  });

  emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();
    emailFeedback.textContent =
      value === ""
        ? ""
        : validateEmail(value)
        ? ""
        : "Include a full domain like @gmail.com";
  });

  phoneInput.addEventListener("input", () => {
    const fullPhone = countryCodeSelect.value + phoneInput.value.trim();
    phoneFeedback.textContent =
      phoneInput.value.trim() === ""
        ? ""
        : validatePhone(fullPhone)
        ? ""
        : "Use 7-15 digits without letters.";
  });

  messageInput.addEventListener("input", () => {
    messageFeedback.textContent =
      messageInput.value.trim() === "" ? "Please enter a message." : "";
  });

  // Submit validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const messageVal = messageInput.value.trim();
    const fullPhone = countryCodeSelect.value + phoneVal;

    if (nameVal.length < 3) {
      nameFeedback.textContent = "Name must be at least 3 characters.";
      valid = false;
    }

    if (!validateEmail(emailVal)) {
      emailFeedback.textContent = "Invalid email format.";
      valid = false;
    }

    if (!validatePhone(fullPhone)) {
      phoneFeedback.textContent = "Invalid phone number. Use 7–15 digits.";
      valid = false;
    }

    if (messageVal === "") {
      messageFeedback.textContent = "Please enter a message.";
      valid = false;
    }

    if (valid) {
      alert("Form submitted successfully!");
      form.reset();

      nameFeedback.textContent = "";
      emailFeedback.textContent = "";
      phoneFeedback.textContent = "";
      messageFeedback.textContent = "";
    }
  });
}

// DOM Manipulation Features
document.addEventListener("DOMContentLoaded", () => {
  // Show/hide box toggle
  const toggleBtn = document.getElementById("toggle-btn");
  const toggleBox = document.getElementById("toggle-box");
  toggleBtn?.addEventListener("click", () => {
    toggleBox?.classList.toggle("hidden");
  });

  // Change textarea content
  const changeTextBtn = document.getElementById("change-text-btn");
  const messageInp = document.getElementById("message");
  changeTextBtn?.addEventListener("click", () => {
    messageInp.value =
      "Hello, I would like to join your event if possible. Thank you in advance. (Write some feedback and comments either good or bad to improve our event).";
  });

  // Dark Mode Toggle — applies globally
  const bgToggleBtn = document.getElementById("bg-toggle-btn");
  bgToggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Optional: Toggle form styles if on contact page
    const formFieldset = document.querySelector(".contact__fieldset");
    formFieldset?.classList.toggle("light-form");

    // Adjust feedback color for contrast
    const feedbackElements = document.querySelectorAll(".contact__feedback");
    feedbackElements.forEach((el) => {
      el.style.color = document.body.classList.contains("dark-mode")
        ? "#000"
        : "";
    });

    // Change button style (black bg, white text)
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((btn) => {
      btn.classList.toggle(
        "dark-btn",
        document.body.classList.contains("dark-mode")
      );
    });
  });
});
