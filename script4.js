document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
х
        clearErrors();

        const nameValid = validateName();
        const emailValid = validateEmail();
        const messageValid = validateMessage();

        if (nameValid && emailValid && messageValid) {

            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            setTimeout(() => {

                showSuccessMessage();

                form.reset();

                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить сообщение';
            }, 1500);
        }
    });
    
   
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            return false;
        }
        
        if (nameValue.length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        
        return true;
    }
    

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, 'Пожалуйста, введите email');
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            return false;
        }
        
        return true;
    }
    

    function validateMessage() {
        const messageInput = document.getElementById('message');
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageInput, 'Пожалуйста, введите сообщение');
            return false;
        }
        
        if (messageValue.length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        
        return true;
    }
    

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        
        input.style.borderColor = 'red';
    }
    
   
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }
    

    function showSuccessMessage() {

        const oldSuccess = document.querySelector('.success-message');
        if (oldSuccess) oldSuccess.remove();
        
   
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = 'Спасибо! Ваше сообщение успешно отправлено.';
        
        form.appendChild(successElement);

        setTimeout(() => {
            successElement.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => successElement.remove(), 500);
        }, 5000);
        
    }
});