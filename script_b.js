// Получить имя текущего документа
const currentPath = window.location.pathname.split('/').pop(); // вернётся 'basket.html'

// Перебираем все пункты меню
document.querySelectorAll('nav ul li a').forEach(link => {
    const hrefValue = link.getAttribute('href'); // получаем значение href
    
    // Проверяем точное совпадение имени файла или абсолютное совпадение (для index.html)
    if (
        hrefValue === currentPath ||
        (hrefValue.endsWith('.html') && hrefValue.slice(0, -5) === currentPath.slice(0, -5)) ||
        hrefValue === ''
    ) {
        // добавляем класс active родительскому элементу (LI)
        link.parentNode.classList.add('active');
    }
});


let orders = JSON.parse(localStorage.getItem('orders')) || [];

let cartItemsDiv = document.getElementById('cartItems');

orders.forEach((order, idx) => {
    let squareCard = `
        <div class="product-square">
            <h3>${order.name}</h3>
            <img src="${order.image}" alt="${order.name}">
            <p>Количество: ${order.quantity}, Цена: ${order.price * order.quantity} руб.</p>
            <button onclick="removeFromCart(${idx})">Удалить</button>
        </div>
    `;
    cartItemsDiv.insertAdjacentHTML('beforeend', squareCard);
});

function removeFromCart(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    location.reload(); // Перезагрузим страницу для обновления интерфейса
}


// Функция для очистки корзины
function clearCart() {

    // Очищаем localStorage
    localStorage.removeItem('orders');

    // Сообщаем пользователю о результате операции
    alert('Ваш заказ сделан)');
    location.reload()
}

// Нажатие на кнопку "Заказать"
document.getElementById('clearCartBtn').addEventListener('click', clearCart);


// Открытие модального окна
function openModal() {
    document.getElementById('modalWindow').style.display = 'block';
}
// Закрытие модального окна
function closeModal() {
    document.getElementById('modalWindow').style.display = 'none';
}
// Присваиваем обработчики событий для ссылок
document.querySelectorAll('[data-modal="openModalAbout"]').forEach(function(item) {
    item.addEventListener('click', openModal);
});
// Закрыть модальное окно при клике снаружи
window.onclick = function(event) {
    if (event.target == document.getElementById('modalWindow')) {
        closeModal();
    }
};