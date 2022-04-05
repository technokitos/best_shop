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