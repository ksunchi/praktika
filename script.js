document.addEventListener('DOMContentLoaded', function() {
    // Элементы слайдера
    const slides = document.querySelectorAll('input[name="slider"]');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;
    
    // Функция для переключения слайда
    function goToSlide(index) {
        slides[index].checked = true;
        currentSlide = index;
        updateDots();
    }
    
    // Обновление активной точки
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Переключение на следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    // Переключение на предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    // Обработчики кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Автоматическое переключение слайдов
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Остановка автоматического переключения при наведении
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Запускаем автоматическое переключение
    startAutoSlide();
    
    // Скрипт для анимации при прокрутке
    const fadeElements = document.querySelectorAll('.info-card, .footer-col, .slide-content');
    
    // Добавляем класс fade-in к элементам, которые должны анимироваться
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Функция для проверки видимости элементов
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const visibilityOffset = windowHeight * 0.8;
        
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= visibilityOffset && rect.bottom >= 0);
            
            if (isVisible) {
                el.classList.add('visible');
            }
        });
    }
    
    // Проверяем видимость при загрузке и при прокрутке
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    // Инициализируем проверку видимости сразу
    checkVisibility();
});