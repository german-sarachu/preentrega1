const sorteoInput = document.querySelector("#sorteoInput");
const numeroFavorecido = document.querySelector("#numeroFavorecido");
const sorteoBtn = document.querySelector("#sorteoBtn");

// Variable global para almacenar el número ganador
let numeroGanador;

// Función para generar un número aleatorio entre min y max
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para verificar si debe realizarse el sorteo
function debeHacerSorteo() {
  const ahora = new Date();
  let ultimaGeneracion = localStorage.getItem("ultimaGeneracion");
  if (ultimaGeneracion) {
    ultimaGeneracion = new Date(ultimaGeneracion);
  }
  return !ultimaGeneracion || ahora - ultimaGeneracion >= 2 * 60 * 60 * 1000; // 2 horas en milisegundos
}

// Función para mostrar un mensaje de ganador con SweetAlert2
function mostrarMensajeGanador() {
  Swal.fire({
    title: "¡Felicidades!",
    text: "Has ganado el premio",
    icon: "success"
  });
}

// Función para realizar el sorteo y otorgar premio al usuario
function realizarSorteo() {
  const numeroUsuario = parseInt(sorteoInput.value);
  const ganaPremio = numeroUsuario === parseInt(numeroGanador);

  if (ganaPremio) {
    mostrarMensajeGanador();
  } else {
    Swal.fire({
      title: "¡Gracias por participar!",
      text: "No has ganado esta vez. Inténtalo de nuevo más tarde.",
      icon: "info"
    });
  }

  localStorage.setItem("ultimaGeneracion", new Date());
}

// Función para mostrar el número de forma progresiva
function mostrarNumeroProgresivo(numero) {
  let opacity = 0;
  numeroFavorecido.textContent = numero;
  const fadeInInterval = setInterval(() => {
    if (opacity < 1) {
      opacity += 0.1;
      numeroFavorecido.style.opacity = opacity;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 1000);
}

// Asociar la función de sorteo a un evento al hacer clic en el botón
sorteoBtn.addEventListener("click", function () {
  const numeroUsuario = sorteoInput.value.trim(); // Obtener el número ingresado por el usuario
  const numeroUsuarioInt = parseInt(numeroUsuario); // Convertir a entero
  
  // Verificar si el número ingresado no es un número válido o es negativo
  if (isNaN(numeroUsuarioInt) || numeroUsuarioInt < 0) {
    Swal.fire({
      title: "Número inválido",
      text: "Por favor, ingresa un número válido y positivo.",
      icon: "error"
    });
    return; // Detener la ejecución si el número es inválido
  }
  
  // Verificar si el número tiene más de tres cifras
  if (numeroUsuario.length > 3) {
    Swal.fire({
      title: "Número inválido",
      text: "Por favor, ingresa un número de máximo tres cifras.",
      icon: "error"
    });
    return; // Detener la ejecución si el número tiene más de tres cifras
  }

  // Generar número ganador y mostrarlo con efecto de desvanecimiento en numeroFavorecido
  numeroGanador = generarNumeroAleatorio(0, 999).toString();
  
  // Verificar si se debe realizar el sorteo
  if (debeHacerSorteo()) {
    mostrarNumeroProgresivo(numeroGanador);
    realizarSorteo();
  } else {
    Swal.fire({
      title: "Sorteo no disponible",
      text: "El juego se habilita después de 2 horas del último sorteo.",
      icon: "warning"
    });
    numeroFavorecido.textContent = ''; // Borrar el número favorecido si el sorteo no está disponible
  }
});
