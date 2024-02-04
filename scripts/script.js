let user = "pepe";
let password = 1111;
let nombreUsuario = prompt("ingrese nombre de usuario");
let preferencial = false;

// ingreso con usuario para generar cotización preferecial
if (nombreUsuario != user) {
  alert(
    "usuario no registrado. RECUERDE, si se registra recibirá una cotización preferencial"
  );
} else {
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

// ingresos de usuario o salida del programa
let opcion = prompt("Si quiere salir presione x o presione cualquier tecla para continuar");
while (opcion !== "x") {
  let divisa1 = prompt(
    "Elija la moneda que quiere convertir  (indique el número correspondiente): \n 1 - 🤑 Dolar Estadounidense \n 2 - 😎 Euro \n 3 - 😭 Peso Uruguayo"
  );
  let divisa2 = prompt(
    "Elija la monbeda a la que quiere convertir (indique el número correspondiente): \n 1 - 🤑 Dolar Estadounidense \n 2 - 😎 Euro \n 3 - 😭 Peso Uruguayo"
  );
  console.log(divisa2);
  let importe = parseInt(
    prompt("Ingrese la cantidad de dinero que desea convertir")
  );

  // variables adicionales
  let conversion;
  let valorAdicional = 1.02;

  // cotizacion preferencial
  if (preferencial) {
    if (divisa1 == 1 && divisa2 == 2) {
      conversion = importe * (dolar / euro) * valorAdicional;
      alert("usted puede comprar: " + conversion + " euros");
    } else if (divisa1 == 1 && divisa2 == 3) {
      conversion = importe * (dolar / pesoUrug) * valorAdicional;
      alert("usted puede comprar: " + conversion + " pesos uruguayos");
    } else if (divisa1 == 2 && divisa2 == 1) {
      conversion = importe * (euro / dolar) * valorAdicional;
      alert("usted puede comprar: " + conversion + " dólares estadounidenses");
    } else if (divisa1 == 2 && divisa2 == 3) {
      conversion = importe * (euro / pesoUrug) * valorAdicional;
      alert("usted puede comprar: " + conversion + " pesos uruguayos");
    } else if (divisa1 == 3 && divisa2 == 1) {
      conversion = importe * (pesoUrug / dolar) * valorAdicional;
      alert("usted puede comprar: " + conversion + " dólares estadounidenses");
    } else if (divisa1 == 3 && divisa2 == 2) {
      conversion = importe * (pesoUrug / euro) * valorAdicional;
      alert("usted puede comprar: " + conversion + " euros");
    } else {
      alert("alguna de las opciones fue incorrecta");
    }

    // cotizacion comun
  } else {
    if (divisa1 == 1 && divisa2 == 2) {
      conversion = importe * (dolar / euro);
      alert("usted puede comprar: " + conversion + " euros");
    } else if (divisa1 == 1 && divisa2 == 3) {
      conversion = importe * (dolar / pesoUrug);
      alert("usted puede comprar: " + conversion + " pesos uruguayos");
    } else if (divisa1 == 2 && divisa2 == 1) {
      conversion = importe * (euro / dolar);
      alert("usted puede comprar: " + conversion + " dólares estadounidenses");
    } else if (divisa1 == 2 && divisa2 == 3) {
      conversion = importe * (euro / pesoUrug);
      alert("usted puede comprar: " + conversion + " pesos uruguayos");
    } else if (divisa1 == 3 && divisa2 == 1) {
      conversion = importe * (pesoUrug / dolar);
      alert("usted puede comprar: " + conversion + " dólares estadounidenses");
    } else if (divisa1 == 3 && divisa2 == 2) {
      conversion = importe * (pesoUrug / euro);
      alert("usted puede comprar: " + conversion + " euros");
    } else {
      alert("alguna de las opciones fue incorrecta");
    }
  }

  opcion = prompt("Si quiere salir presione x o presione cualquier tecla para continuar");
}