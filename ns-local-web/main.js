document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("user-registration-form");
  let skipButton = document.getElementById("skip-button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    window.nsWebViewBridge.emit(
      "user-registration",
      {
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
      }
    );
  });

  skipButton.addEventListener("click", (e) => {
    e.preventDefault()

    window.nsWebViewBridge.emit(
      "skip-button",
      {
        message: "Skip this because I say so"
      }
    );
    
  })
});
