document.addEventListener("DOMContentLoaded", function(){
  
  //   PASSWORD TOGGLE
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("togglePassword");

  if(eyeIcon && passwordInput){
    eyeIcon.addEventListener("click", () => {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";

      eyeIcon.textContent =
        passwordInput.type === "password" ? "👁" : "👁";
    });
  }


 
  //  DARK / LIGHT MODE

  const themeBtn = document.getElementById("themeToggle");

  if(themeBtn){
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");

      themeBtn.textContent =
        document.body.classList.contains("light") ? "☀️" : "🌙";
    });
  }
});