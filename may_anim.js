document.addEventListener('DOMContentLoaded', function() { // открывает документ
    // переопределяем стандартные сообщения валидации
    const elements = document.querySelectorAll('input, select, textarea'); // заводим переменную elements для окошек
    elements.forEach(element => { //перебираем элементы и для каждого выполняем следующее
        element.addEventListener('invalid', function(e) { // если ошибка выполняем функцию ивент
            e.preventDefault(); // убираем дефолт
            
            if (this.validity.valueMissing) { // если это.значение.пустое
                this.setCustomValidity('Please fill out this field'); // устанавливаем кастомное значение
            } else if (this.validity.typeMismatch) { // если не тот тип данных
                if (this.type === 'email') {
                    this.setCustomValidity('Please enter a valid email address');
                } else {
                    this.setCustomValidity('Please enter a valid value');
                }
            } else if (this.validity.patternMismatch) { //если не подходит под шаблон
                this.setCustomValidity('Please match the requested format');
            } else if (this.validity.tooShort) { // если слишком короткий текст
                this.setCustomValidity(`Input is too short (minimum ${this.minLength} characters)`);
            }
            
            this.reportValidity(); // показываем ошибку пользователю
        });

        element.addEventListener('input', function() { //если пользователь что-то вводит
            this.setCustomValidity(''); // ничо не показываем
        });
    });
});


document.addEventListener('scroll', function() { // если пользователь прокручивает выполняем слудующую функцию
    const element = document.querySelector('.hidden-element'); // ищет элемент с классом hidden-element
    const position = element.getBoundingClientRect(); // получает координаты элемента относительно видимой части окна
    if (position.top < window.innerHeight && position.bottom >= 0) { // если элемент виден на экране (хотя бы его часть)
        element.classList.add('visible'); // сделай элемент видимым
    }
});




document.addEventListener('wheel', handleWheel); // когда пользователь крутит колесико мыши, вызови функцию handleWheel

let currentSectionIndex = 0; // создает переменную для хранения номера текущей секции
const sections = Array.from(document.querySelectorAll('section')); // находит все секции на странице и сохраняет в массив
let isScrolling = false; // флаг, чтобы отслеживать, идет ли прокрутка

function handleWheel(event) {
  event.preventDefault(); // отменяем стандартное поведение прокрутки
  
  if (isScrolling) return; // если уже идет прокрутка, игнорируем событие

  let deltaY;
if (event.deltaY > 0) {
    deltaY = 1; // прокрутка ВНИЗ
} else {
    deltaY = -1; // прокрутка ВВЕРХ
}

  currentSectionIndex += deltaY; // изменяем номер текущей секции

  // ограничиваем индекс, чтобы не выйти за пределы секций
  if (currentSectionIndex >= sections.length) currentSectionIndex = sections.length - 1;
  else if (currentSectionIndex < 0) currentSectionIndex = 0;

  scrollToSection(currentSectionIndex);
}

function scrollToSection(index) {
  isScrolling = true; // устанавливаем флаг, что идет прокрутка

  const yPosition = index * window.innerHeight - 12 * window.innerHeight / 100; // добавляем отступ 12vh
  window.scrollTo({ //прокручивает страницу к...
    top: yPosition, //позиция высчитанная
    behavior: 'smooth' // плавная прокрутка
  });

  setTimeout(() => {  // устанавливаем таймер, чтобы сбросить флаг после завершения прокрутки
    isScrolling = false;
  }, 1000); // 1000 мс (1 секунда) — время, за которое должна завершиться прокрутка
}


document.addEventListener("DOMContentLoaded", function () {
    const myDiv = document.getElementById("myDiv"); // отслеживает появление элементов с id myDiv
    function checkVisibility() { // проверяем видимость блока
        const rect = myDiv.getBoundingClientRect(); // запомнили все координаты
        
        if ((rect.top >= 0 && rect.bottom <= window.innerHeight) ||
            (rect.bottom > 0 && rect.top < window.innerHeight)) { // проверяем, попадает ли блок хотя бы частично в экран         
            myDiv.classList.add("in-view"); // если блок появился в области видимости, добавляем класс in-view
            window.removeEventListener("scroll", checkVisibility); // остановим дальнейшую проверку видимости
        }
    }
    
    window.addEventListener("scroll", checkVisibility); // начинаем проверять при каждом событии скролла
    checkVisibility(); // первая проверка сразу после загрузки страницы
});


var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");


var openBtn2 = document.getElementById("openModalLink2");
var openBtn3 = document.getElementById("openModalLink3");
var openBtn4 = document.getElementById("openModalLink4");

var closeBtn2 = document.querySelector(".close2");
var closeBtn3 = document.querySelector(".close3");
var closeBtn4 = document.querySelector(".close4");

openBtn2.onclick = function() {
    modal2.style.display = "block";
};

openBtn3.onclick = function() {
    modal3.style.display = "block";
};

openBtn4.onclick = function() {
    modal4.style.display = "block";
};

closeBtn2.onclick = function() {
    modal2.style.display = "none";
};
closeBtn3.onclick = function() {
    modal3.style.display = "none";
};
closeBtn4.onclick = function() {
    modal4.style.display = "none";
};


window.onclick = function(event) {
    if (event.target === modal2) {
        modal2.style.display = "none";
    }
};

window.onclick = function(event) {
    if (event.target === modal3) {
        modal3.style.display = "none";
    }
};

window.onclick = function(event) {
    if (event.target === modal4) {
        modal4.style.display = "none";
    }
};

[openBtn2, openBtn3, openBtn4].forEach(btn => {
    btn.addEventListener('click', function() {
        document.body.style.overflow = 'hidden';
    });
});

// И включение прокрутки при закрытии
[closeBtn2, closeBtn3, closeBtn4].forEach(btn => {
    btn.addEventListener('click', function() {
        document.body.style.overflow = '';
    });
});


document.querySelector('.submit_link').addEventListener('submit', function(event) {
    const emailInput = this.querySelector('input[type="email"]');
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        event.preventDefault();
        emailInput.setCustomValidity('Email must contain "@" symbol and valid domain (e.g.: user@example.com)');
        emailInput.reportValidity();
    } else {
        alert('Thanks for subscribing!');
    }
});






document.querySelectorAll('a[href="#section2"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const section = document.getElementById('section2');
        if (section) {
            const offset = window.innerHeight * 0.12; // 12vh отступ
            const targetPosition = section.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});




document.querySelector('.photo_with_words1').addEventListener('click', () => {
    window.location.href = 'decorations.html';
  });


  // добавим функцию для отображения товаров в my♥bag
function displayBagItems() {
    const bagItemsContainer = document.getElementById('bag-items-container');
    const emptyBagMessage = document.getElementById('empty-bag-message');
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    
    bagItemsContainer.innerHTML = '';
    
    if (likedItems.length === 0) {
        emptyBagMessage.style.display = 'block';
    } else {
        emptyBagMessage.style.display = 'none';
        
        likedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'bag-item';
            itemElement.style.display = 'flex';
            itemElement.style.alignItems = 'center';
            itemElement.style.marginBottom = '15px';
            itemElement.style.borderBottom = '1px solid #ccc';
            itemElement.style.paddingBottom = '15px';
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">
                <div>
                    <h3 style="margin: 0 0 5px 0; color: #8a7874;">${item.name}</h3>
                    <p style="margin: 0; color: #5e1e15;">$${item.price}</p>
                </div>
                <button class="remove-item" data-id="${item.id}" style="margin-left: auto; background: none; border: none; color: #5e1e15; cursor: pointer;">×</button>
            `;
            
            bagItemsContainer.appendChild(itemElement);
        });
    }
}

// обработчик событий для кнопки открытия модального окна my♥bag
openBtn3.onclick = function() {
    modal3.style.display = "block";
    displayBagItems();
};

// обработчик для удаления товаров из корзины
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const itemId = e.target.getAttribute('data-id');
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        const updatedItems = likedItems.filter(item => item.id !== itemId);
        localStorage.setItem('likedItems', JSON.stringify(updatedItems));
        displayBagItems();
    }
});





// код для работы с избранным и корзиной
document.addEventListener('DOMContentLoaded', function() {
    // инициализация
    if (!localStorage.getItem('likedItems')) {
        localStorage.setItem('likedItems', JSON.stringify([]));
    }
    if (!localStorage.getItem('bagItems')) {
        localStorage.setItem('bagItems', JSON.stringify([]));
    }

    // обработчики для модальных окон
    openBtn2.onclick = function() {
        modal2.style.display = "block";
        displayFavoritesItems();
    };

    openBtn3.onclick = function() {
        modal3.style.display = "block";
        displayBagItems();
    };
});

// функция для отображения избранных товаров
function displayFavoritesItems() {
    const favoritesContainer = document.getElementById('favorites-items-container');
    const emptyMessage = document.getElementById('empty-favorites-message');
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    
    favoritesContainer.innerHTML = '';
    
    if (likedItems.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        
        likedItems.forEach(item => {
            // проверяем путь к изображению
            const imagePath = item.image || `photoes/${item.id}.jpg`; 
            
            const itemElement = document.createElement('div');
            itemElement.className = 'favorite-item';
            itemElement.style.display = 'flex';
            itemElement.style.alignItems = 'center';
            itemElement.style.marginBottom = '15px';
            itemElement.style.borderBottom = '1px solid #5e1e15';
            itemElement.style.padding = '10px';
            
            itemElement.innerHTML = `
                <img src="${imagePath}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px; border-radius: 5px;">
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0 0 5px 0; color: #8a7874;">${item.name}</h3>
                    <p style="margin: 0; color: #5e1e15;">$${item.price}</p>
                </div>
                <button class="remove-favorite" data-id="${item.id}" style="background: none; border: none; color: #5e1e15; cursor: pointer; font-size: 20px;">×</button>
                <button class="add-to-bag" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${imagePath}" style="margin-left: 15px; padding: 5px 10px; background: #5e1e15; color: #8a7874; border: none; border-radius: 3px; cursor: pointer; font-size: 14px;">Add to Bag</button>
            `;
            
            favoritesContainer.appendChild(itemElement);
        });
    }
}

// функция для отображения товаров в корзине
function displayBagItems() {
    const bagContainer = document.getElementById('bag-items-container');
    const emptyMessage = document.getElementById('empty-bag-message');
    const totalElement = document.querySelector('.bag-total');
    const bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
    
    bagContainer.innerHTML = '';
    
    if (bagItems.length === 0) {
        emptyMessage.style.display = 'block';
        totalElement.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        totalElement.style.display = 'block';
        
        let total = 0;
        
        bagItems.forEach(item => {
            total += parseFloat(item.price);
            const imagePath = item.image || `photoes/${item.id}.jpg`;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'bag-item';
            itemElement.style.display = 'flex';
            itemElement.style.alignItems = 'center';
            itemElement.style.marginBottom = '15px';
            itemElement.style.borderBottom = '1px solid #5e1e15';
            itemElement.style.padding = '10px';
            
            itemElement.innerHTML = `
                <img src="${imagePath}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px; border-radius: 5px;">
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0 0 5px 0; color: #8a7874;">${item.name}</h3>
                    <p style="margin: 0; color: #5e1e15;">$${item.price}</p>
                </div>
                <button class="remove-from-bag" data-id="${item.id}" style="margin-left: 15px; background: none; border: none; color: #5e1e15; cursor: pointer; font-size: 20px;">×</button>
            `;
            
            bagContainer.appendChild(itemElement);
        });
        
        document.getElementById('bag-total-amount').textContent = total.toFixed(2);
    }
}

// обработчики событий для удаления/добавления товаров
document.addEventListener('click', function(e) {
    // удаление из избранного
    if (e.target.classList.contains('remove-favorite')) {
        const itemId = e.target.getAttribute('data-id');
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        const updatedItems = likedItems.filter(item => item.id !== itemId);
        localStorage.setItem('likedItems', JSON.stringify(updatedItems));
        displayFavoritesItems();
    }
    
    // добавление в корзину
    if (e.target.classList.contains('add-to-bag')) {
        const itemId = e.target.getAttribute('data-id');
        const itemName = e.target.getAttribute('data-name');
        const itemPrice = e.target.getAttribute('data-price');
        const itemImage = e.target.getAttribute('data-image');
        
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
            displayBagItems();
        }
    }
    
    // удаление из корзины
    if (e.target.classList.contains('remove-from-bag')) {
        const itemId = e.target.getAttribute('data-id');
        const bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
        const updatedItems = bagItems.filter(item => item.id !== itemId);
        localStorage.setItem('bagItems', JSON.stringify(updatedItems));
        displayBagItems();
    }
});

// переключения между входом и регистрацией
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(`${this.dataset.tab}-form`).classList.add('active');
    });
});


// обработчики кликов для разделов
document.querySelector('.photo_with_words1').addEventListener('click', () => {
    window.location.href = 'decorations.html';
});

document.querySelector('.photo_with_words2').addEventListener('click', () => {
    window.location.href = 'clothes.html'; 
});

document.querySelector('.photo_with_words3').addEventListener('click', () => {
    window.location.href = 'accessories.html'; 
});



function handleWheel(event) {
    // если открыто любое модальное окно - игнорируем прокрутку
    if (modal2.style.display === 'block' || 
        modal3.style.display === 'block' || 
        modal4.style.display === 'block') {
        return;
    }
    
    event.preventDefault();
    
    if (isScrolling) return;

    let deltaY = event.deltaY > 0 ? 1 : -1;
    currentSectionIndex += deltaY;

    if (currentSectionIndex >= sections.length) currentSectionIndex = sections.length - 1;
    else if (currentSectionIndex < 0) currentSectionIndex = 0;

    scrollToSection(currentSectionIndex);
}