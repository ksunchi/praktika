document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const productsGrid = document.querySelector('.products-grid');
    const pagination = document.getElementById('pagination');
    
    // Получаем все карточки товаров
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const productsPerPage = 6; // Количество товаров на странице
    let currentPage = 1;
    
    // Функция для фильтрации товаров по поисковому запросу
    function filterProducts(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        return productCards.filter(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const category = card.querySelector('.product-category').textContent.toLowerCase();
            return title.includes(searchTerm) || category.includes(searchTerm);
        });
    }
    
    // Функция для сортировки товаров
    function sortProducts(products, sortMethod) {
        return [...products].sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            const nameA = a.querySelector('.product-title').textContent.toLowerCase();
            const nameB = b.querySelector('.product-title').textContent.toLowerCase();
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            
            switch(sortMethod) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                case 'newest':
                    return dateB - dateA;
                default:
                    return 0;
            }
        });
    }
    
    // Функция для отображения товаров с пагинацией
    function displayProducts(products, page = 1) {
        currentPage = page;
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
        
        // Очищаем сетку товаров
        productsGrid.innerHTML = '';
        
        // Добавляем отфильтрованные и отсортированные товары
        if (paginatedProducts.length > 0) {
            paginatedProducts.forEach(card => {
                productsGrid.appendChild(card);
            });
        } else {
            // Если товаров не найдено
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'Товары не найдены. Попробуйте изменить параметры поиска.';
            productsGrid.appendChild(noResults);
        }
        
        // Обновляем пагинацию
        updatePagination(products.length);
    }
    
    // Функция для обновления пагинации
    function updatePagination(totalProducts) {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Кнопка "Назад"
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.className = 'page-link';
        prevLink.innerHTML = '❮';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                displayProducts(currentProducts, currentPage - 1);
            }
        });
        if (currentPage === 1) prevLink.style.visibility = 'hidden';
        pagination.appendChild(prevLink);
        
        // Нумерация страниц
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            const firstPageLink = document.createElement('a');
            firstPageLink.href = '#';
            firstPageLink.className = 'page-link';
            firstPageLink.textContent = '1';
            firstPageLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayProducts(currentProducts, 1);
            });
            pagination.appendChild(firstPageLink);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pagination.appendChild(ellipsis);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `page-link ${i === currentPage ? 'active' : ''}`;
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayProducts(currentProducts, i);
            });
            pagination.appendChild(pageLink);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pagination.appendChild(ellipsis);
            }
            
            const lastPageLink = document.createElement('a');
            lastPageLink.href = '#';
            lastPageLink.className = 'page-link';
            lastPageLink.textContent = totalPages;
            lastPageLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayProducts(currentProducts, totalPages);
            });
            pagination.appendChild(lastPageLink);
        }
        
        // Кнопка "Вперед"
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.className = 'page-link';
        nextLink.innerHTML = '❯';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                displayProducts(currentProducts, currentPage + 1);
            }
        });
        if (currentPage === totalPages) nextLink.style.visibility = 'hidden';
        pagination.appendChild(nextLink);
    }
    
    // Переменная для хранения текущего списка товаров
    let currentProducts = productCards;
    
    // Обработчик поиска
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        currentProducts = searchTerm ? filterProducts(searchTerm) : productCards;
        displayProducts(sortProducts(currentProducts, sortSelect.value));
    });
    
    // Обработчик сортировки
    sortSelect.addEventListener('change', (e) => {
        displayProducts(sortProducts(currentProducts, e.target.value));
    });
    
    // Инициализация - отображаем все товары с первой страницы
    displayProducts(sortProducts(productCards, sortSelect.value));
});