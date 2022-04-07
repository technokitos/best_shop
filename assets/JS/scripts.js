    // Hamburguesa Menu

    // selector
    var menu = document.querySelector('.hamburger');

    // method
    function toggleMenu(event) {
        this.classList.toggle('is-active');
        document.querySelector(".mostrar-pc1").classList.toggle("is_active");
        event.preventDefault();
    }

    // event
    menu.addEventListener('click', toggleMenu, false);

    // ScrollBar Progress

    window.onload = function() {
        update();
    }

    function update() {

        const progress = document.getElementById('progreso');
        progress.style.width = `${((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100)}%`;
        requestAnimationFrame(update);
    }


    const botonArriba = document.getElementById('returnTop');

    botonArriba.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

    window.onscroll = () => {

        add_btn_scrolltop();
    }

    const add_btn_scrolltop = () => {
        if (window.scrollY < 300) {
            botonArriba.classList.remove('btn-scrollTop-on');
        } else {
            botonArriba.classList.add('btn-scrollTop-on');
        }

    }

    window.onload = iniciar;

    function iniciar() {
        document.getElementById('enviar').addEventListener('click', validacion, false);
    }

    function validarNombre() {
        const nombre = document.getElementById('nombre');
        const nombreVal = document.getElementById('nombre').value;

        if (nombreVal === "") {
            alert("El campo nombre está vacío");
            nombre.style.borderColor = 'red';
            return false;
        } else if (nombreVal.length < 3 || nombreVal.length > 100) {
            alert("Escribe un nombre entre 3 y 100 caracteres");
            nombre.style.borderColor = 'red';
            return false;
        }
        return true;
    }

    function validarCorreo() {
        const correo = document.getElementById('correo');
        const correoVal = document.getElementById('correo').value;
        const regexCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

        if (correoVal === "") {
            alert("El correo nombre está vacío");
            correo.style.borderColor = 'red';
            return false;
        } else if (!regexCorreo.test(correoVal)) {
            correo.style.borderColor = 'red';

            alert("Escribe un correo válido");
            return false;
        }

        return true;
    }

    function validarCheckBox() {
        const checkBox = document.getElementById('checkbox').checked;
        if (!checkBox) {
            alert('Debe aceptar la politica de privacidad');
            return false;
        }
        return true;
    }

    function validacion(e) {
        if (validarNombre() && validarCorreo() && validarCheckBox()) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }

    const myForm = document.getElementById('formulario');

    myForm.addEventListener('submit', function(e) {

        e.preventDefault();

        const formData = new FormData(this);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: formData,
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            console.log(text);
        }).catch(function(error) {
            console.log(error);
        })

    });