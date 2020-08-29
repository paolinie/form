function checkValidity() {
  let validity = true;
  document.querySelectorAll('form>div>label>input').forEach((input) => {
    if (!input.validity.valid) {
      validity = false;
    }
  });

  return validity;
}

function showError(input, message) {
  let span = input.nextElementSibling.nextElementSibling;
  if (message || input.validationMessage) {
    span.innerHTML = `
    <i class="fas fa-exclamation"></i>
    <p>${message || input.validationMessage}</p>
  `;
    span.classList.remove('hidden');
  } else {
    span.classList.add('hidden');
  }
}

function checkPassword() {
  let pass = document.getElementById('pass');
  let confirm = document.getElementById('confirm');
  let isEqual = pass.value === confirm.value;
  if (!isEqual) {
    showError(confirm, 'Las contraseñas no coinciden');
  }
  return isEqual;
}

function toggleError() {
  document.querySelectorAll('form>div>label>input').forEach((input) => {
    showError(input);
  });
}

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', (e) => {
    if (input.value) {
      input.nextElementSibling.classList.add('written');
    } else {
      input.nextElementSibling.classList.remove('written');
    }
  });
});

document
  .querySelector('input[type="submit"]')
  .addEventListener('click', (e) => {
    if (!checkPassword() || !checkValidity()) {
      e.preventDefault();
      toggleError();
      checkPassword();
    }
  });
