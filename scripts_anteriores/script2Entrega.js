//variables
let user = "pepe";
let password = 1111;
let nombreUsuario = prompt("ingrese nombre de usuario");
let preferencial = false;
let valorAdicional = 1.02;

//funcion para calcular conversion
function calcularConversion(valor1, valor2, total) {
  let algo = total * (valor1 / valor2);
  return algo;
}

// ingreso con usuario (para saber si es preferencial)
if (nombreUsuario != user) {
  alert(
    "usuario no registrado. RECUERDE, si se registra recibirá una cotización preferencial"
  );
} else {
  //3 intentos de contraseña (sino sigue la pagina pero sin ser preferencial)
  for (i = 3; i > 0; i--) {
    let contrasenia = prompt("ingrese contraseña");
    if (contrasenia != password) {
      alert("contraseña incorrecta, intentos restantes: " + (i - 1));
    } else {
      alert("Bienvenido");
      preferencial = true;
      break;
    }
  }
}

// variables para calculos de conversiones
let dolar = 40.25;
let euro = 44.96;
let pesoUrug = 1;

// ingresos de usuario para determinar moneda
let opcion = prompt(
  "Si quiere salir presione x o presione cualquier tecla para continuar"
);
while (opcion !== "x") {
  let divisa1 = prompt(
    "Elija la moneda que quiere vender (indique el número correspondiente): \n 1 - 🤑 Dolar Estadounidense \n 2 - 😎 Euro \n 3 - 😭 Peso Uruguayo"
  );
  let divisa2 = prompt(
    "Elija la monbeda a la que quiere comprar (indique el número correspondiente): \n 1 - 🤑 Dolar Estadounidense \n 2 - 😎 Euro \n 3 - 😭 Peso Uruguayo"
  );
  let importe = parseInt(
    prompt("Ingrese la cantidad de dinero que desea convertir")
  );

  //convertir eleccion usuario a valor moneda
  if (divisa1 == "1") {
    divisa1 = dolar;
  } else if (divisa1 == "2") {
    divisa1 = euro;
  } else if (divisa1 == "3") {
    divisa1 = pesoUrug;
  } else {
    alert("una de las opciones no fue correcta");
    break;
  }

  if (divisa2 == "1") {
    divisa2 = dolar;
  } else if (divisa2 == "2") {
    divisa2 = euro;
  } else if (divisa2 == "3") {
    divisa2 = pesoUrug;
  } else {
    alert("una de las opciones no fue correcta");
    break;
  }

  let impresion = calcularConversion(divisa1, divisa2, importe);

  //calculo e impresion en pantalla si es preferencial o no
  if (preferencial) {
    if (divisa2 == dolar) {
      alert("usted puede comprar: " + impresion * valorAdicional + " dolares");
    } else if (divisa2 == euro) {
      alert("usted puede comprar: " + impresion * valorAdicional + " euros");
    } else if (divisa2 == pesoUrug) {
      alert(
        "usted puede comprar: " +
          impresion * valorAdicional +
          " pesos uruguayos"
      );
    }
  } else {
    if (divisa2 == dolar) {
      alert("usted puede comprar: " + impresion + " dolares");
    } else if (divisa2 == euro) {
      alert("usted puede comprar: " + impresion + " euros");
    } else if (divisa2 == pesoUrug) {
      alert("usted puede comprar: " + impresion + " pesos uruguayos");
    }
  }

  opcion = prompt(
    "Si quiere salir presione x o presione cualquier tecla para continuar"
  );
}
