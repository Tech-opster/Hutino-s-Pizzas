let modalKey = 0;
let cart = [];
let priceCart = 0;

pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.pizzaCard').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.image img').src = item.img;
    pizzaItem.querySelector('.text p').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.text h1').innerHTML = item.name;
    pizzaItem.querySelector('.descPizza').innerHTML = item.descri;

    document.querySelector('.container').append(pizzaItem);

//ABRIR MODAL
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector('.modal').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.modal').style.opacity = 1;
        }, 1)

        let key = e.target.closest('.pizzaCard').getAttribute('data-key');
        modalKey = key;

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

        const checkboxes = document.querySelectorAll('.descIngre input[type="checkbox"]');
        const descAddCheck = document.querySelector('.descAdd');
    
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                const pushIngredients = [];
                checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                        pushIngredients.push(checkbox.nextElementSibling.textContent);
                    }
                });
            
                const ingredientsList = descAddCheck.querySelectorAll('label');
                ingredientsList.forEach((ingredient) => {
                const name = ingredient.querySelector('.span1').textContent;
                if (pushIngredients.includes(name)) {
                        ingredient.remove();
                    }
                });
            });
        });

//MODAL INGREDIENTES ADD
        const descAdd = document.querySelector('.descAdd');
        descAdd.innerHTML = '';

        for (let i = 0; i < pizzaJson[key].remAdd.length; i++) {
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.dataset.price = pizzaJson[key].remAdd[i].priceAdd;

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

            checkBox.addEventListener('change', updateTotalPrice);
        };

        updateTotalPrice();

        function updateTotalPrice() {
            const checkboxes = document.querySelectorAll('.descAdd input[type="checkbox"]');
            let totalPrice = pizzaJson[key].price;
        
            checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.dataset.price);
                priceCart = totalPrice += price;
                } else {
                    priceCart = totalPrice;
                }
            });
        
            document.querySelector('.totalPrice').innerHTML = `R$ ${totalPrice.toFixed(2)}`;
        };
    });
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
    };

//ADICIONAR AO CARRINHO
    document.querySelector('.addCart').addEventListener('click', () => {
    const selectedIngredients = [];
    const deselectedIngredients = [];

    document.querySelectorAll('.descIngre input[type="checkbox"]:checked').forEach((checkbox) => {
        const deselectedIngredientName = `Remover: ${checkbox.nextElementSibling.textContent}`;
        deselectedIngredients.push(deselectedIngredientName);
    });

    document.querySelectorAll('.descAdd input[type="checkbox"]:checked').forEach((checkbox) => {
        const ingredientName = `Adicionar: ${checkbox.nextElementSibling.textContent}`;
        selectedIngredients.push(ingredientName);
    });

    let identifier = pizzaJson[modalKey].id+' @ '+deselectedIngredients+selectedIngredients;
    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1) {
        cart[key].quantity += 1;
    } else {
            cart.push ({
            identifier,
            id: pizzaJson[modalKey].id,
            desIngre: deselectedIngredients,
            ingre: selectedIngredients,
            quantity: 1,
            priceCart
        });
    }

    updateCart();
    closeModAdd();
    });

    document.querySelector('.menuOpener').addEventListener('click', () => {
        if (cart.length > 0) {
            document.querySelector('aside').style.left = '0vw'
        };
    });

    document.querySelector('.menuCloser').addEventListener('click', () => {
            document.querySelector('aside').style.left = '100vw'
    });

//ABRIR CARRINHO
    function updateCart() {
        document.querySelector('.menuOpener span').innerHTML = cart.length;

        if (cart.length > 0) {
            document.querySelector('aside').classList.add('show');
            document.querySelector('.cartAppend').innerHTML = '';

            let subtotal = 0;

            for (let i in cart) {
                let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
                subtotal += cart[i].priceCart * cart[i].quantity;

                let cartItem = document.querySelector('.totalCart').cloneNode(true);

                cartItem.querySelector('.imgCar img').src = pizzaItem.img;
                cartItem.querySelector('.pizzaCar').innerHTML = pizzaItem.name;
                cartItem.querySelector('.qtTotal').innerHTML = cart[i].quantity;
                
                if (cart[i].desIngre.length !== 0) {
                    cartItem.querySelector('.remItem').innerHTML = cart[i].desIngre;
                } else {
                    cartItem.querySelector('.remItem').innerHTML = '';
                }

                if (cart[i].ingre.length !== 0) {
                    cartItem.querySelector('.addItem').innerHTML = cart[i].ingre;
                } else {
                    cartItem.querySelector('.addItem').innerHTML = '';
                }
                
                cartItem.querySelector('.qtMenos').addEventListener('click', () => {
                    if (cart[i].quantity > 1) {
                        cart[i].quantity--;
                    } else {
                        cart.splice(i, 1);
                    }

                    updateCart();
                });
                cartItem.querySelector('.qtMais').addEventListener('click', () => {
                    cart[i].quantity++;

                    updateCart();
                });

                document.querySelector('.cartAppend').append(cartItem);
            }

            document.querySelector('.fullPrice span').innerHTML = `R$ ${subtotal.toFixed(2)}`
        } else {
            document.querySelector('aside').classList.remove('show');
            document.querySelector('aside').style.left = '100vw';
        }
    };