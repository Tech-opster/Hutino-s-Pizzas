pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.pizzaCard').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.image img').src = item.img;
    pizzaItem.querySelector('.text p').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.text h1').innerHTML = item.name;
    pizzaItem.querySelector('.descPizza').innerHTML = item.descri;

//ABRIR MODAL
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector('.modal').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.modal').style.opacity = 1;
        }, 1)

        let key = e.target.closest('.pizzaCard').getAttribute('data-key');

        const pizzaBigger = document.querySelectorAll('.pizzaBig');
        const imgSrc = pizzaJson[key].img;

        pizzaBigger.forEach((pizzaBig) => {
            pizzaBig.querySelector('.pizzaBig img').src = imgSrc;
          });

//MODAL
        document.querySelector('.titleModal h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.desc').innerHTML = pizzaJson[key].ingredi;
        document.querySelector('.price').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

//MODAL INGREDIENTES
        const descIngre = document.querySelector('.descIngre');
        descIngre.innerHTML = '';

        for (let i = 0; i < pizzaJson[key].remAdd.length; i++) {
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';

            const span = document.createElement('span');
            span.textContent = pizzaJson[key].remAdd[i].name;

            const label = document.createElement('label');
            label.appendChild(checkBox);
            label.appendChild(span);

            descIngre.appendChild(label);
        };

        const descAdd = document.querySelector('.descAdd');
        descAdd.innerHTML = '';
        
        for (let i = 0; i < pizzaJson[key].remAdd.length; i++) {
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';

            const span = document.createElement('span');
            span.className = 'span1'
            span.textContent = pizzaJson[key].remAdd[i].name;

            const spanPrice = document.createElement('span');
            spanPrice.className = 'span2'
            spanPrice.textContent = `+ R$ ${pizzaJson[key].remAdd[i].priceAdd.toFixed(2)}`;

            const label = document.createElement('label');
            label.appendChild(checkBox);
            label.appendChild(span);
            label.appendChild(spanPrice);

            descAdd.appendChild(label);
        };
});

//COMPRAR MODAL
    document.querySelector('.next').addEventListener('click', () => {
        closeMod();
        document.querySelector('.modalIngre').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.modalIngre').style.opacity = 1;
        }, 1)
    });

    document.querySelector('.next2').addEventListener('click', () => {
        closeModIngre();
        document.querySelector('.modalAdd').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.modalAdd').style.opacity = 1;
        }, 1)

        const checkboxes = document.querySelectorAll('.descIngre input[type="checkbox"]');
        let selectedIngredients = [];
        const selectedIngre = pizzaJson[index].remAdd[index];
        

        for (let i = 0; i < checkboxes.length; i++) {
            const checkbox = checkboxes[i];
            if (checkbox.checked) {
                selectedIngre.removed = true; // marcar o ingrediente como removido
                checkbox.parentNode.remove(); // remover o label com o checkbox e o texto do ingrediente
            }
        };
    });

//FECHAR MODAL
    document.querySelectorAll('.cancel').forEach((el) => {
        el.addEventListener('click', () => {
            closeMod();
            closeModIngre();
            closeModAdd();
        });
    });

    function closeMod() {
        document.querySelector('.modal').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.modal').style.display = 'none';
        }, 300)
    };

    function closeModIngre() {
        document.querySelector('.modalIngre').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.modalIngre').style.display = 'none';
        }, 300)
    };

    function closeModAdd() {
        document.querySelector('.modalAdd').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.modalAdd').style.display = 'none';
        }, 300)
    }

    document.querySelector('.container').append(pizzaItem);
});

console.log(pizzaJson[0].remAdd)