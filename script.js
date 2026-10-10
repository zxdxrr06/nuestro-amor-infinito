
/* =========================================
   NUESTRO AMOR INFINITO
   JavaScript completo
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("inicio");
    const pantallaCorazon = document.getElementById("pantallaCorazon");
    const universo = document.getElementById("universo");

    const botonSorpresa = document.getElementById("botonSorpresa");
    const botonAbrir = document.getElementById("botonAbrir");
    const botonRepetir = document.getElementById("botonRepetir");

    const corazonPuertas = document.getElementById("corazonPuertas");
    const campoEstrellas = document.getElementById("campoEstrellas");
    const globo = document.getElementById("globo");
    const portalFinal = document.getElementById("portalFinal");
    const mensajeFinal = document.getElementById("mensajeFinal");
    const fraseViaje = document.getElementById("fraseViaje");

    let temporizadores = [];
    let intervaloFrases = null;
    let intervaloCorazones = null;
    let viajeIniciado = false;

    const frases = [
        "Entre millones de estrellas, te elegiría a ti 💚",
        "No hay distancia que pueda medir lo que siento por ti 💙",
        "Cada universo sería más bonito si lo descubro contigo ✨",
        "Mi corazón siempre encuentra el camino hacia ti 💗",
        "Si el infinito tuviera un hogar, sería a tu lado 🌌",
        "Eres mi casualidad favorita y mi elección de cada día 💚",
        "Quiero compartir contigo todos los universos posibles 💙"
    ];

    /* =====================================
       HERRAMIENTAS
    ===================================== */

    function programar(callback, milisegundos) {
        const id = window.setTimeout(callback, milisegundos);
        temporizadores.push(id);
        return id;
    }

    function limpiarTemporizadores() {
        temporizadores.forEach((id) => window.clearTimeout(id));
        temporizadores = [];

        if (intervaloFrases !== null) {
            window.clearInterval(intervaloFrases);
            intervaloFrases = null;
        }

        if (intervaloCorazones !== null) {
            window.clearInterval(intervaloCorazones);
            intervaloCorazones = null;
        }
    }

    function mostrarPantalla(pantalla) {
        [inicio, pantallaCorazon, universo].forEach((elemento) => {
            elemento.classList.remove("activa");
        });

        pantalla.classList.add("activa");
    }

    function crearEstrellas(contenedor, cantidad) {
        contenedor.replaceChildren();

        const fragmento = document.createDocumentFragment();

        for (let i = 0; i < cantidad; i += 1) {
            const estrella = document.createElement("span");
            estrella.className = "estrella";

            estrella.style.left = `${Math.random() * 100}%`;
            estrella.style.top = `${Math.random() * 100}%`;
            estrella.style.setProperty(
                "--tamano",
                `${Math.random() * 2 + 1}px`
            );
            estrella.style.setProperty(
                "--opacidad",
                `${Math.random() * 0.65 + 0.25}`
            );
            estrella.style.setProperty(
                "--duracion",
                `${Math.random() * 3 + 2}s`
            );
            estrella.style.setProperty(
                "--retraso",
                `${Math.random() * -4}s`
            );

            fragmento.appendChild(estrella);
        }

        contenedor.appendChild(fragmento);
    }

    function crearCorazonFlotante() {
        if (!universo.classList.contains("activa") || viajeIniciado === false) {
            return;
        }

        const corazon = document.createElement("span");
        corazon.className = "corazon-flotante";

        const simbolos = ["♡", "♥", "✧", "❤"];
        const colores = ["#ff9bcf", "#c5b5ff", "#8be5ff", "#c5ffd9"];

        corazon.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        corazon.style.left = `${Math.random() * 90 + 5}%`;
        corazon.style.setProperty(
            "--tamano",
            `${Math.random() * 13 + 12}px`
        );
        corazon.style.setProperty(
            "--tiempo",
            `${Math.random() * 3 + 6}s`
        );
        corazon.style.setProperty(
            "--color-corazon",
            colores[Math.floor(Math.random() * colores.length)]
        );

        universo.appendChild(corazon);

        window.setTimeout(() => corazon.remove(), 10000);
    }

    /* =====================================
       INICIO: ABRIR LA SORPRESA
    ===================================== */

    botonSorpresa.addEventListener("click", () => {
        mostrarPantalla(pantallaCorazon);
    });

    /* =====================================
       ABRIR LAS PUERTAS DEL CORAZÓN
    ===================================== */

    botonAbrir.addEventListener("click", () => {
        botonAbrir.disabled = true;
        corazonPuertas.classList.add("abriendo");

        programar(() => {
            mostrarPantalla(universo);
            iniciarViaje();
        }, 1400);
    });

    /* =====================================
       VIAJE POR EL UNIVERSO
    ===================================== */

    function iniciarViaje() {
        limpiarTemporizadores();

        viajeIniciado = true;

        mensajeFinal.classList.remove("visible");
        portalFinal.classList.remove("visible");
        globo.classList.remove("subiendo");

        crearEstrellas(campoEstrellas, 140);

        fraseViaje.textContent = frases[0];

        let indiceFrase = 1;

        intervaloFrases = window.setInterval(() => {
            fraseViaje.style.opacity = "0";

            window.setTimeout(() => {
                fraseViaje.textContent =
                    frases[indiceFrase % frases.length];

                indiceFrase += 1;
                fraseViaje.style.opacity = "1";
            }, 500);
        }, 3000);

        intervaloCorazones = window.setInterval(
            crearCorazonFlotante,
            700
        );

        /* El globo empieza a ascender */
        void globo.offsetWidth;
        globo.classList.add("subiendo");

        /* Al terminar el viaje, aparece el portal */
        programar(() => {
            if (!viajeIniciado) return;

            portalFinal.classList.add("visible");
        }, 18000);

        /* El mensaje final aparece después del portal */
        programar(() => {
            if (!viajeIniciado) return;

            mensajeFinal.classList.add("visible");

            if (intervaloFrases !== null) {
                window.clearInterval(intervaloFrases);
                intervaloFrases = null;
            }
        }, 20500);
    }

    /* =====================================
       REPETIR TODA LA EXPERIENCIA
    ===================================== */

    botonRepetir.addEventListener("click", () => {
        limpiarTemporizadores();

        viajeIniciado = false;

        universo.querySelectorAll(".corazon-flotante").forEach((corazon) => {
            corazon.remove();
        });

        globo.classList.remove("subiendo");
        portalFinal.classList.remove("visible");
        mensajeFinal.classList.remove("visible");
        corazonPuertas.classList.remove("abriendo");

        botonAbrir.disabled = false;

        mostrarPantalla(inicio);
    });

    /* =====================================
       PREPARACIÓN INICIAL
    ===================================== */

    crearEstrellas(
        document.querySelector(".estrellas-fondo"),
        65
    );

    crearEstrellas(campoEstrellas, 140);
});
