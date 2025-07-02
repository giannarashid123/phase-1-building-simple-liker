// Provided function to simulate a server call
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Hide the error modal when the page loads
const errorModal = document.getElementById("modal");
errorModal.classList.add("hidden");

// Select all heart elements
const hearts = document.querySelectorAll(".like-glyph");

// Add event listener to each heart
hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        // Toggle full/empty heart on success
        if (heart.textContent === "♡") {
          heart.textContent = "♥";
          heart.classList.add("activated-heart");
        } else {
          heart.textContent = "♡";
          heart.classList.remove("activated-heart");
        }
      })
      .catch((error) => {
        // Show error modal
        errorModal.classList.remove("hidden");
        document.getElementById("modal-message").textContent = error;

        // ✅ Correctly use setTimeout with arrow function
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });
  });
});

