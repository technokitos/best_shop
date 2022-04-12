    // Hamburguesa Menu

    // selector
    const menu = document.querySelector('.hamburger');

    // method
    function toggleMenu(event) {
        event.preventDefault();
        this.classList.toggle('is-active');
        document.querySelector(".mostrar-pc1").classList.toggle("is_active");
    }

    // event
    menu.addEventListener('click', toggleMenu, false);


    //mostrar y cerrar modal
    const my_popup = document.getElementById('contenedor_modal');


    function showPopUp() {
        if (obtener_localStorage()) {
            closePopUp();
        } else {
            my_popup.classList.add('show');
        }
    }
    setTimeout(showPopUp, 5000);

    function closePopUp() {
        my_popup.classList.remove('show');
        guardar_localStorage();
    }

    window.addEventListener("keyup", function(event) {

        if (event.key === 'Escape') {
            closePopUp();
        }
    }, false);


    // ScrollBar Progress

    function update() {

        const progress = document.getElementById('progreso');
        const porcentaje = ((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100);
        progress.style.width = `${porcentaje}%`;
        requestAnimationFrame(update);
    }


    //boton arriba para subir sin scroll

    const botonArriba = document.getElementById('returnTop');

    botonArriba.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

    // Eventos que se realizan cuando la ventana esta en scroll
    window.onscroll = () => {

        add_btn_scrolltop();
        percent();
        update();
    }

    // Calcula el porcentaje de scroll
    const percent = () => {
        const porcentaje = ((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100);
        if (porcentaje > 25) {
            showPopUp();
        }
    }

    //añade o quita el boton cuando sobrepasa cierta altura
    const add_btn_scrolltop = () => {
        if (window.scrollY < 300) {
            botonArriba.classList.remove('btn-scrollTop-on');
        } else {
            botonArriba.classList.add('btn-scrollTop-on');
        }
    }

    // Funcion para obtener el pop up almacenado en local storage
    function obtener_localStorage() {

        let siEsTrue = JSON.parse(localStorage.getItem("popUp"));
        return siEsTrue;
    }

    console.log(my_popup)

    function guardar_localStorage() {


        localStorage.setItem("popUp", JSON.stringify(true));
    }


    obtener_localStorage();


    // Validacion de campos de envío de datos

    function validarNombre() {
        const nombre = document.getElementById('nombre');
        const nombreVal = document.getElementById('nombre').value;

        if (nombreVal === "") {
            alert("El campo nombre está vacío");
            nombre.classList.add('wrongInputs');
            return false;
        } else if (nombreVal.length < 3 || nombreVal.length > 100) {
            alert("Escribe un nombre entre 3 y 100 caracteres");
            nombre.classList.add('wrongInputs') = 'red';
            return false;
        } else {
            nombre.classList.add('rigthInputs');
            return true;
        }
    }

    function validarCorreo() {
        const correo = document.getElementById('correo');
        const correoVal = document.getElementById('correo').value;
        const regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (correoVal === "") {
            alert("El campo correo está vacío");
            correo.classList.add('wrongInputs');

            return false;
        } else if (!regexCorreo.test(correoVal)) {
            correo.classList.add('wrongInputs');

            alert("Escribe un correo válido");
            return false;
        } else {
            correo.classList.add('rigthInputs');
            return true;
        }
    }

    //correo del Modal

    function validarCorreo2() {
        const correo2 = document.getElementById('correo2');
        const correoVal2 = document.getElementById('correo2').value;
        const regexCorreo2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (correoVal2 === "") {
            correo2.classList.add('wrongInputs');
            alert("El campo correo está vacío");
            return false;
        } else if (!regexCorreo2.test(correoVal2)) {
            correo2.classList.add('wrongInputs');
            alert("Escribe un correo válido");
            return false;
        } else {
            correo2.classList.add('rigthInputs');
            return true;
        }
    }

    function validarCheckBox() {
        const checkBox = document.getElementById('checkbox').checked;
        if (!checkBox) {
            alert('Debe aceptar la politica de privacidad');
            return false;
        }
        return true;
    }

    //Validación contacto

    function validacion() {
        if (validarNombre() && validarCorreo() && validarCheckBox()) {

            const getName = document.querySelector('#nombre').value;
            const getCorreo = document.querySelector('#correo').value;

            fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombre: getName,
                        email: getCorreo,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((json) => console.log(json));

            return true;
        } else {

            return false;
        }
    }

    // Validacion Modal

    function validacion2() {
        if (validarCorreo2()) {

            const getCorreo2 = document.querySelector('#correo2').value;

            fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: getCorreo2,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((json) => console.log(json));

            closePopUp();
            return true;
        } else {

            return false;
        }
    }

    // Funcion para obtener el cambio de moeda mediante API
    let currChange = {};

    function getCurrency() {

        fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
            .then((response) => response.json())
            .then((json) => {
                currChange = json.usd;
            });


    }
    getCurrency();

    const selectCurrencyVal = document.querySelector('#currencyChange');

    selectCurrencyVal.onchange = function() {

            console.log(selectCurrencyVal.value);
            if (selectCurrencyVal.value === 'usd') {
                const priceBasicE = document.getElementById('priceR');
                priceBasicE.innerHTML = "$" + 0;
                const priceMediumE = document.getElementById('priceB');
                priceMediumE.innerHTML = "$" + 25;
                const pricePremiumE = document.getElementById('priceG');
                pricePremiumE.innerHTML = "$" + 60;
            }

            if (selectCurrencyVal.value === 'eur') {
                const priceBasicE = document.getElementById('priceR');
                priceBasicE.innerHTML = 0 + "€";
                const priceMediumE = document.getElementById('priceB');
                priceMediumE.innerHTML = Math.round(currChange.eur * 25) + "€";
                const pricePremiumE = document.getElementById('priceG');
                pricePremiumE.innerHTML = Math.round(currChange.eur * 60) + "€";
            }

            if (selectCurrencyVal.value === 'gbp') {
                const priceBasicL = document.getElementById('priceR');
                priceBasicL.innerHTML = '£' + 0;
                const priceMediumL = document.getElementById('priceB');
                priceMediumL.innerHTML = '£' + Math.round(currChange.gbp * 25);
                const pricePremiumL = document.getElementById('priceG');
                pricePremiumL.innerHTML = '£' + Math.round(currChange.gbp * 60);
            }

        }
        // Comienzo de Slider

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }