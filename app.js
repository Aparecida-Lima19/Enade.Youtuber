document.addEventListener('DOMContentLoaded', () => {
  // Inicialização dos ícones
  lucide.createIcons();

  // Alternância de modos de login/cadastro
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // Lógica do dropdown de seleção de curso
  const selectButton = document.getElementById('category-select');
  const selectValue = document.getElementById('select-value');
  const optionsList = document.getElementById('options');
  const options = optionsList.querySelectorAll('.option input');

  // Alterna a exibição das opções ao clicar no botão
  selectButton.addEventListener('click', () => {
    optionsList.classList.toggle('active');
    const chevrons = selectButton.querySelectorAll('#chevrons i');
    if (optionsList.classList.contains('active')) {
      chevrons.forEach(chevron => chevron.dataset.lucide = 'chevron-up');
    } else {
      chevrons.forEach(chevron => chevron.dataset.lucide = 'chevron-down');
    }
    lucide.createIcons();
  });

  // Fecha o dropdown e atualiza o valor selecionado ao clicar em uma opção
  options.forEach(option => {
    option.addEventListener('change', () => {
      selectValue.textContent = option.dataset.label;
      optionsList.classList.remove('active');
      const chevrons = selectButton.querySelectorAll('#chevrons i');
      chevrons.forEach(chevron => chevron.dataset.lucide = 'chevron-down');
      lucide.createIcons();
    });
  });

  // Fecha o dropdown se clicar fora dele
  document.addEventListener('click', event => {
    if (!selectButton.contains(event.target)) {
      optionsList.classList.remove('active');
      const chevrons = selectButton.querySelectorAll('#chevrons i');
      chevrons.forEach(chevron => chevron.dataset.lucide = 'chevron-down');
      lucide.createIcons();
    }
  });

  // Validação e submissão do formulário de cadastro
  const signUpForm = document.querySelector('.sign-up-form');

  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = signUpForm.querySelector('#registerUsername');
    const email = signUpForm.querySelector('#registerEmail');
    const password = signUpForm.querySelector('#registerPassword');
    const selectedCourse = document.querySelector('input[name="categoria"]:checked'); // Correção aqui

    let isValid = true;

    // Limpar mensagens de erro anteriores
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validação de username
    if (!username.value) {
      document.getElementById('usernameError').textContent = 'O campo nome de usuário é obrigatório.';
      isValid = false;
    } else if (username.value.length > 20) {
      document.getElementById('usernameError').textContent = 'O nome de usuário deve ter no máximo 20 caracteres.';
      isValid = false;
    }

    // Validação de email
    if (!email.value) {
      document.getElementById('emailError').textContent = 'O campo e-mail é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      document.getElementById('emailError').textContent = 'O e-mail informado não é válido.';
      isValid = false;
    } else if (email.value.length > 50) {
      document.getElementById('emailError').textContent = 'O e-mail deve ter no máximo 50 caracteres.';
      isValid = false;
    }

    // Validação de senha
    if (!password.value) {
      document.getElementById('passwordError').textContent = 'O campo senha é obrigatório.';
      isValid = false;
    } else if (password.value.length > 120) {
      document.getElementById('passwordError').textContent = 'A senha deve ter no máximo 120 caracteres.';
      isValid = false;
    } else if (password.value.length < 8) {
      document.getElementById('passwordError').textContent = 'A senha deve ter no mínimo 8 caracteres.';
      isValid = false;
    }

    // Verificação de curso selecionado
    if (!selectedCourse) {
      alert("Por favor, selecione um curso.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Requisição para cadastro
    try {
      const registerResponse = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          role: ["user"],
          course: selectedCourse.value // Correção aqui
        })
      });

      if (!registerResponse.ok) {
        const errorResponse = await registerResponse.json();
        throw new Error(errorResponse.message || 'Erro no cadastro');
      }

      const registerData = await registerResponse.json();
      console.log('Register Response:', registerData);
      alert('Cadastro bem-sucedido!');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert(error.message || 'Falha no cadastro. Verifique os dados e tente novamente.');
    }
  });
});
