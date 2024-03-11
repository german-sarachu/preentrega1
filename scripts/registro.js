const username = document.getElementById("username");
const password = document.getElementById("password");
const buttonSwal = document.getElementById("swal-btn");

let usuariosRegistrados = recuperarLS() || []; // Recuperando usuarios del localStorage

buttonSwal.addEventListener("click", (e) => { //evento click
  e.preventDefault();
  const usernameValue = username.value.trim(); //campos y espacios vacios
  const passwordValue = password.value.trim();

  if (usernameValue === "" || passwordValue === "") { //condicional (si vacios alert swal)
    Swal.fire({
      title: "Amigue, tenés que llenar todos los datos",
      text: "Te vas a registrar o no? 🤌",
      icon: "error",
    });
  } else {
    const data = { //sino creo un objeto
      username: usernameValue,
      password: passwordValue,
    };

    const usuarioExistente = usuariosRegistrados.find( //verifico si existe
      (usuario) => usuario.username === data.username
    );

    if (usuarioExistente) {
      Swal.fire("Tarde, ese nombre ya está! 😔"); //si existe le aviso
    } else {
      usuariosRegistrados.push(data); //sino, lo guardo en usuariosRegistrados y en localStorage
      guardarEnLS(usuariosRegistrados);
      Swal.fire("Ahora si fiera!! 👌"); //queda guardado en arreglo
      iniciarJuego(); // Iniciar el juego automáticamente después del registro
      username.value = "";
      password.value = ""; //vacio los campos
    }
  }
});

function iniciarJuego() {
  // Coloca aquí el código para iniciar el juego
  console.log("¡El juego ha comenzado!");
}

function recuperarLS() {
  return JSON.parse(localStorage.getItem("usuarios")); // Función recuperar del localStorage y devolver como objeto
}

function guardarEnLS(arr) {
  localStorage.setItem("usuarios", JSON.stringify(arr)); // Función guardar en localStorage en string con clave y valor
}
