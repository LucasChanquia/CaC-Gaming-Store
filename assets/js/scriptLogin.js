document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.btn-login');
    const userInput = document.getElementById('user');
    const passwordInput = document.getElementById('password');
  
    // Event listeners para validar en tiempo real
    userInput.addEventListener('input', function() {
      validateField(userInput, 'Ingresa un usuario válido');
    });
  
    passwordInput.addEventListener('input', function() {
      validateField(passwordInput, 'Ingresa una contraseña válida');
    });
  
    loginButton.addEventListener('click', function() {
      // Eliminar mensajes de error previos
      removeErrorMessages();
      
      let isValid = true;
  
      // Validar campo de usuario
      if (userInput.value.trim() === '') {
        displayErrorMessage(userInput, 'Ingresa un usuario válido');
        isValid = false;
      }
  
      // Validar campo de contraseña
      if (passwordInput.value.trim() === '') {
        displayErrorMessage(passwordInput, 'Ingresa una contraseña válida');
        isValid = false;
      }
  
      // Redirigir si ambos campos son válidos
      if (isValid) {
        window.location.href = '/GamingStore-java.github.io/pages/index.html';
      }
    });
  
    function validateField(inputElement, message) {
      // Eliminar el mensaje de error previo si existe
      const existingErrorMessage = inputElement.nextElementSibling;
      if (existingErrorMessage && existingErrorMessage.tagName === 'P') {
        existingErrorMessage.remove();
      }
      
      // Mostrar mensaje de error si el campo está vacío
      if (inputElement.value.trim() === '') {
        displayErrorMessage(inputElement, message);
      }
    }
  
    function displayErrorMessage(inputElement, message) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = message;
      errorMessage.style.color = 'red';
      inputElement.insertAdjacentElement('afterend', errorMessage);
    }
  
    function removeErrorMessages() {
      const errorMessages = document.querySelectorAll('form p');
      errorMessages.forEach(function(message) {
        message.remove();
      });
    }
  });