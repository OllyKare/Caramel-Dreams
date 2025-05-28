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


function addToCart(e) {
    e.preventDefault(); // Отключаем стандартную отправку формы

    let formData = new FormData(e.target);
    let itemName = e.target.dataset.itemName;
    let imageSrc = e.target.dataset.image;
    let price = parseFloat(e.target.dataset.price);
    let quantity = parseInt(formData.get('quantity'));

    // Формирование объекта заказа
    let orderItem = {
        name: itemName,
        image: imageSrc,
        price: price,
        quantity: quantity
    };

    // Загружаем существующие товары из localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Добавляем новый товар
    orders.push(orderItem);

    // Сохраняем обратно в localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
}


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