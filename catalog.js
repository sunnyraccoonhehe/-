document.addEventListener('DOMContentLoaded', function() {
    // обработчик для кнопок добавления в корзину
    document.querySelectorAll('.add-to-bag-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');
            const itemImage = this.getAttribute('data-image');
            const bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
            
            // проверяем, нет ли уже этого товара в корзине
            if (!bagItems.some(item => item.id === itemId)) {
                bagItems.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage
                });
                localStorage.setItem('bagItems', JSON.stringify(bagItems));
                alert(`${itemName} added to your bag!`);
            } else {
                alert('This item is already in your bag!');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // загружаем сохраненные лайки
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    
    // обновляем кнопки лайков
    document.querySelectorAll('.like-button').forEach(button => {
        const itemId = button.getAttribute('data-id');
        if (likedItems.some(item => item.id === itemId)) {
            button.classList.add('liked');
        }
        
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');
            const itemImage = this.getAttribute('data-image');
            
            if (this.classList.contains('liked')) {
                // удаляем из избранного
                this.classList.remove('liked');
                const updatedItems = likedItems.filter(item => item.id !== itemId);
                localStorage.setItem('likedItems', JSON.stringify(updatedItems));
            } else {
                // добавляем в избранное
                this.classList.add('liked');
                likedItems.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage
                });
                localStorage.setItem('likedItems', JSON.stringify(likedItems));
            }
        });
    });
});