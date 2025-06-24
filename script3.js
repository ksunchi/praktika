document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail img');

    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    modal.style.zIndex = '1000';
    modal.style.cursor = 'zoom-out';
    
    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.position = 'absolute';
    modalImg.style.top = '50%';
    modalImg.style.left = '50%';
    modalImg.style.transform = 'translate(-50%, -50%)';
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {

            mainImage.src = this.src.replace('/thumbs', '');

            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.parentElement.classList.add('active');
        });

        thumb.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                modalImg.src = this.src.replace('/thumbs', '');
                modal.style.display = 'block';
            }
        });
    });

    mainImage.addEventListener('click', function() {
        modalImg.src = this.src;
        modal.style.display = 'block';
    });

    modal.addEventListener('click', function() {
        this.style.display = 'none';
    });

    const reviewForm = document.querySelector('.review-form');
    const reviewsContainer = document.querySelector('.reviews-section');
    

    function loadReviews() {
        const savedReviews = localStorage.getItem('productReviews');
        if (savedReviews) {
            const reviews = JSON.parse(savedReviews);
            displayReviews(reviews);
        }
    }

    function displayReviews(reviews) {
        const defaultReviews = Array.from(document.querySelectorAll('.review')).slice(0, 3);
        

        reviewsContainer.innerHTML = '<h2 class="reviews-title">Отзывы</h2>';
        

        defaultReviews.forEach(review => {
            reviewsContainer.appendChild(review);
        });
        

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="review-avatar">${review.author.substring(0, 1)}${review.author.split(' ')[1].substring(0, 1)}</div>
                <div class="review-content">
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                    <p>${review.text}</p>
                </div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
        

        reviewsContainer.appendChild(document.querySelector('.add-review'));
    }

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const rating = parseInt(this.querySelector('select').value);
        const text = this.querySelector('textarea').value.trim();
        
        if (text === '') {
            alert('Пожалуйста, напишите отзыв');
            return;
        }
        
 
        const newReview = {
            author: 'Анонимный пользователь', 
            rating: rating,
            text: text,
            date: new Date().toISOString()
        };
        

        saveReview(newReview);
        

        this.querySelector('textarea').value = '';
        this.querySelector('select').value = '5';
        
        alert('Спасибо за ваш отзыв!');
    });

    function saveReview(review) {
        let reviews = [];
        const savedReviews = localStorage.getItem('productReviews');
        
        if (savedReviews) {
            reviews = JSON.parse(savedReviews);
        }
        
        reviews.push(review);
        localStorage.setItem('productReviews', JSON.stringify(reviews));
        
        displayReviews(reviews);
    }
    loadReviews();
    
   
});