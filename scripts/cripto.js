const criptoMonedaCompra = document.getElementById("criptoMonedaCompra");
const cantidadCripto = document.getElementById("cantidadCripto");
const btnConfirmarCompraCripto = document.getElementById("confirmarCompraCripto");
const totalCripto = document.getElementById("totalCripto");
const carritoContainer = document.getElementById("carritoBody");
const btnEliminarCompras = document.getElementById("eliminarCompras");
const btnVaciarCarrito = document.getElementById("vaciarCarrito");
const btnConfirmarCompra = document.getElementById("confirmarCompra");

class CriptoMoneda {
  constructor(imagen, nombre, costo) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.costo = parseFloat(costo);
  }
}

const criptos = []; // almacenar criptomonedas obtenidas de API

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(crypto => {
      const nombre = crypto.name;
      const precio = crypto.current_price;
      const logoUrl = crypto.image;
      const nuevaCripto = new CriptoMoneda(logoUrl, nombre, precio);
      criptos.push(nuevaCripto);
      mostrarCripto(nuevaCripto); // Llama a la función para mostrar la criptomoneda
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function mostrarCripto(cripto) {
  const {imagen, nombre, costo} = cripto; //destructuring
  const div = document.createElement("div");
  div.classList.add("cripto-monedas");
  div.innerHTML = `
    <div class="cripto-contenedor-card">
      <div class="cripto-imagen">
        <img src="${imagen}" alt="${nombre}">
      </div>
      <div class="cripto-info">
        <div class="cripto-nombre-contenedor">
          <h2 class="cripto-nombre">${nombre}</h2>
        </div>
        <div class="cripto-precio-contenedor">
          <p class="cripto-precio">$${costo}</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById("criptoContenedor").appendChild(div);

  // Agregar evento click para capturar el nombre de la moneda
  div.addEventListener("click", () => {
    const nombreMonedaSeleccionada = nombre; // Obtener el nombre de la moneda
    const criptoEncontrada = buscarPorNombre(criptos, nombreMonedaSeleccionada); // Buscar la criptomoneda en la lista

    if (criptoEncontrada) {
      criptoMonedaCompra.value = criptoEncontrada.nombre; // Asignar el nombre de la moneda al input
    }
  });
}

function buscarPorNombre(arr, filtro) {
  if (filtro.length > 0) {
    return arr.find((el) => el.nombre.toLowerCase() === filtro.toLowerCase());
  } else {
    return null;
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function recuperarCarritoDelLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

btnConfirmarCompraCripto.addEventListener("click", function (e) {
  //evento click en boton
  e.preventDefault();
  const nombreCripto = criptoMonedaCompra.value; //variable del input nombre de cripto
  const criptoEncontrada = buscarPorNombre(criptos, nombreCripto); //variable de funcion buscar nombre objeto con parametro de nombre ingresado por usuario

  if (criptoEncontrada) {
    calcularCompra(criptoEncontrada, cantidadCripto); //verifica igualdad, llama calcular y guardar en Storage
    guardarCarritoEnLocalStorage();
  } else {
    //si no encuentro aviso
    Swal.fire({
      title: "Error",
      text: "La criptomoneda seleccionada no está disponible.",
      icon: "error",
    });
  }
});

const carrito = []; // Array para almacenar las compras

function calcularCompra(criptoEncontrada, cantidadCriptoElement) {
  const cantidadCripto = parseFloat(cantidadCriptoElement.value); //variable para guardar numero del usuario

  if (isNaN(cantidadCripto) || cantidadCripto <= 0) {
    //si no es numero o menor a 0 vuelve
    return;
  }

  const totalCompraActual = criptoEncontrada.costo * cantidadCripto; //calcula precio cripto por cantidad de usuario
  agregarAlCarrito(criptoEncontrada, cantidadCripto, totalCompraActual); // llama funcion con parametros de nombre moneda, cantidad de usuario y funcion para ir sumando total
  mostrarTotalCarrito();
}

function agregarAlCarrito(criptoEncontrada, cantidad, totalCompraActual) {
  const compra = {
    //genera objeto con 3 propiedades, para crear la tabla
    criptomoneda: criptoEncontrada,
    cantidad: cantidad,
    total: totalCompraActual,
  };
  carrito.push(compra);
  mostrarCarrito();
}

function mostrarCarrito() {
  carritoContainer.innerHTML = "";

  if (carrito.length === 0) {
    carritoContainer.textContent = "El carrito está vacío";
    return;
  }

  carrito.forEach((item, index) => {
    //ciclo para crear filas de las compras con index para eliminarlas
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.criptomoneda.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${item.criptomoneda.costo}</td>
      <td>$${item.total}</td>
      <td><button onclick="eliminarCompra(${index})">X</button></td>
      `;
    carritoContainer.appendChild(row);
  });

  mostrarTotalCarrito();
}

function mostrarTotalCarrito() {
  const totalCarrito = carrito.reduce((total, item) => total + item.total, 0); // recorre y suma los valores de las compras, lo agrega al html
  totalCripto.innerHTML = `El valor total de tu compra es: $${totalCarrito}. <span style="font-size: 14px;">Compra expresada en dólares estadounidenses</span>`;
}

function eliminarCompra(index) {
  if (index < 0 || index >= carrito.length) {
    return;
  }

  carrito.splice(index, 1); //elimina la compra del carrito desde el index y uno solo
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

btnVaciarCarrito.addEventListener("click", function () {
  carrito.length = 0; //arreglo sin elementos
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
  criptoMonedaCompra.value = ""; //campos vacios para volver a usar
  cantidadCripto.value = "";
  totalCripto.innerHTML = `El valor total de tu compra es: $0 <span style="font-size: 14px;">Compra expresada en dólares estadounidenses</span>`; //inicia de 0 el total
});

btnConfirmarCompra.addEventListener("click", confirmarCompra);

function confirmarCompra() {
  if (carrito.length === 0) {
    //carrito vacio
    Swal.fire({
      title: "Error",
      text: "El carrito está vacío. Agrega al menos un producto antes de confirmar la compra.",
      icon: "error",
    });
    return;
  }

  carrito.length = 0;
  mostrarCarrito();
  localStorage.removeItem("carrito"); //se elimina carrito del storage

  criptoMonedaCompra.value = ""; //campos vacios para volver a usar
  cantidadCripto.value = "";
  totalCripto.innerHTML = `El valor total de tu compra es: $0 <span style="font-size: 14px;">Compra expresada en dólares estadounidenses</span>`; //inicia de 0 el total
  Swal.fire({
    title: "¡Compra Confirmada!",
    text: "Tu compra ha sido confirmada. ¡Gracias por tu compra!",
    icon: "success",
  });
}

window.addEventListener("load", () => {
  //carga la pagina con local storage
  const carritoGuardado = recuperarCarritoDelLocalStorage();
  if (carritoGuardado.length > 0) {
    carrito.push(...carritoGuardado);
    mostrarCarrito();
  }
});
