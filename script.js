document.addEventListener('DOMContentLoaded', function() {
  
    const slides = document.querySelectorAll('input[name="slider"]');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;
    
 
    function goToSlide(index) {
        slides[index].checked = true;
        currentSlide = index;
        updateDots();
    }
    
   
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
 
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
  
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', startAutoSlide);
    
   
    startAutoSlide();
    
   
    const fadeElements = document.querySelectorAll('.info-card, .footer-col, .slide-content');
    
   
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
   
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
    
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
   
    checkVisibility();
});
