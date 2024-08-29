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
  const signInForm = document.querySelector('.sign-in-form');
  const signUpForm = document.querySelector('.sign-up-form');

  // Validação para o formulário de login
  signInForm.addEventListener('submit', (event) => {
    const username = signInForm.querySelector('input[type="text"]');
    const password = signInForm.querySelector('input[type="password"]');
    
    if (!username.value || !password.value) {
      event.preventDefault();
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });

  // Validação para o formulário de cadastro
  signUpForm.addEventListener('submit', (event) => {
    const username = signUpForm.querySelector('input[type="text"]');
    const email = signUpForm.querySelector('input[type="email"]');
    const password = signUpForm.querySelector('input[type="password"]');
    const course = signUpForm.querySelector('select[name="course"]');

    let isValid = true;

    // Verificação de preenchimento
    if (!username.value || !email.value || !password.value || !course.value) {
      isValid = false;
      alert('Por favor, preencha todos os campos obrigatórios.');
    }

    // Verificação de limite de caracteres
    if (username.value.length > 20) {
      isValid = false;
      alert('O nome de usuário deve ter no máximo 20 caracteres.');
    }

    if (email.value.length > 50) {
      isValid = false;
      alert('O e-mail deve ter no máximo 50 caracteres.');
    }

    if (password.value.length > 120) {
      isValid = false;
      alert('A senha deve ter no máximo 120 caracteres.');
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});
