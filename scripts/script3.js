//urusarios registrados
const usuariosRegistrados = [];

//registrar usuario
function registrarUsuario() {
  const nombre = prompt("Ingrese su nombre:");
  const email = prompt("Ingrese su correo electrónico:");

  //si está registrado
  const usuarioExistente = usuariosRegistrados.find(
    (usuario) => usuario.nombre == nombre || usuario.email == email
  );

  if (usuarioExistente) {
    alert("El usuario ya está registrado.");
  } else {
    usuariosRegistrados.push({ nombre, email });
    alert("¡Registro exitoso!");
  }
}

let continuar = true;
while (continuar) {
  const opcion = prompt("Presione 1 para registrarse, 2 para salir:");

  switch (opcion) {
    case "1":
      registrarUsuario();
      break;
    case "2":
      continuar = false;
      break;
    default:
      alert("Opción no válida. Por favor, seleccione 1 o 2.");
  }
}

////////////////////////////////////////////////////////////////////////

//clase Divisa para representar cada moneda
class Divisa {
  constructor(icono, designacion, valorCompra, valorVenta) {
    this.icono = icono;
    this.designacion = designacion;
    this.valorCompra = parseFloat(valorCompra);
    this.valorVenta = parseFloat(valorVenta);
  }
}

//arreglo objetos Divisa
const divisas = [
  new Divisa("PesoUrug", "Peso Uruguayo", 1, 1),
  new Divisa("EEUU", "Dolar", 37.85, 40.35),
  new Divisa("EURO", "Euro", 39.99, 44.94),
  new Divisa("PesoArg", "Peso Argentino", 0.024, 0.2),
  new Divisa("Real", "Real", 7.5, 9.2),
];

//opciones de monedas disponibles
let opciones = divisas.map((divisa) => divisa.designacion).join(", ");
let monedaOrigen = prompt("Elige la moneda que tienes entre: " + opciones);
let monedaDestino = prompt(
  "Elige la moneda a la que quieres cambiar entre: " + opciones
);

//cantidad a convertir
let cantidad = parseFloat(prompt("Ingresa la cantidad a convertir:"));

//calcular la conversión entre dos monedas
function calcularConversionCompra(cantidad, monedaOrigen, monedaDestino) {
  const divisaOrigen = divisas.find(
    (divisa) => divisa.designacion.toLowerCase() == monedaOrigen.toLowerCase()
  );
  const divisaDestino = divisas.find(
    (divisa) => divisa.designacion.toLowerCase() == monedaDestino.toLowerCase()
  );

  //si alguna moneda está mal escrita o son la misma para convertir
  if (!divisaOrigen || !divisaDestino || divisaOrigen == divisaDestino) {
    return "Una de las monedas no es válida";
  }

  //conversión
  let resultado =
    cantidad * (divisaOrigen.valorCompra / divisaDestino.valorVenta);
  return resultado;
}

//mostrar el resultado
let conversion = calcularConversionCompra(
  cantidad,
  monedaOrigen,
  monedaDestino
);
alert("El resultado de la conversión es: " + conversion);

///////////////////////////////////////////////////////////////////////////

//número aleatorio entre min y max
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debeHacerSorteo() {
  //fecha y hora actual
  const ahora = new Date();

  //última vez que se generó un número aleatorio
  let ultimaGeneracion = localStorage.getItem("ultimaGeneracion");
  if (ultimaGeneracion) {
    ultimaGeneracion = new Date(ultimaGeneracion);
  }

  //si pasaron 2 horas desde ultimo de número aleatorio
  return !ultimaGeneracion || ahora - ultimaGeneracion >= 2 * 60 * 60 * 1000;
}

//realizar el sorteo y otorgar premio al usuario
function realizarSorteo() {
  const numeroPagina = generarNumeroAleatorio(1, 100);
  const numeroUsuario = parseInt(prompt("Ingresa un número del 1 al 100:"));
  const ganaPremio = numeroUsuario == numeroPagina;

  if (ganaPremio) {
    alert("¡Felicidades! Has ganado un premio.");
    alert("Lo siento. Ha ocurrido un error!!");
  } else {
    alert("Lo siento, no has ganado un premio.");
  }

  //fecha y hora actual, última vez que se generó un número aleatorio
  localStorage.setItem("ultimaGeneracion", new Date());
}

//sorteo
if (debeHacerSorteo()) {
  realizarSorteo();
} else {
  alert(
    "Ya has jugado el sorteo en las últimas 2 horas. Vuelve a intentarlo más tarde."
  );
}
