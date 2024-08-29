const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  loginForm.addEventListener('submit', (e) => {
    if (!validateForm(loginForm)) {
      e.preventDefault(); // Prevent form submission if validation fails
    }
  });

  registerForm.addEventListener('submit', (e) => {
    if (!validateForm(registerForm)) {
      e.preventDefault(); // Prevent form submission if validation fails
    }
  });

  function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        isValid = false;
      } else if (input.name === 'username' && input.value.length > 20) {
        alert('O limite de caracteres para o nome de usuário foi ultrapassado.');
        isValid = false;
      } else if (input.name === 'email' && input.value.length > 50) {
        alert('O limite de caracteres para o e-mail foi ultrapassado.');
        isValid = false;
      } else if (input.name === 'password' && input.value.length > 120) {
        alert('O limite de caracteres para a senha foi ultrapassado.');
        isValid = false;
      }
    });

    return isValid;
  }
});