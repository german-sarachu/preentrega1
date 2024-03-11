class CriptoMonedas {
    constructor(imagen, nombre, costo) {
      this.imagen = imagen;
      this.nombre = nombre;
      this.costo = parseFloat(costo);
    }
  }
  
  const criptos = [
    new CriptoMonedas("binance.jpg", "binance", 428.18),
    new CriptoMonedas("bitcoin.jpg", "bitcoin", 39156),
    new CriptoMonedas("cardano.jpg", "cardano", 1.25),
    new CriptoMonedas("dodgecoin.jpg", "dodgecoin", 0.19),
    new CriptoMonedas("ethereum.jpg", "ethereum", 2739),
    new CriptoMonedas("ripple.jpg", "ripple", 0.84),
    new CriptoMonedas("tether.jpg", "tether", 1.0),
    new CriptoMonedas("usdcoin.jpg", "usdcoin", 1.0),
  ];
  
  const criptoMonedaCompra = document.getElementById("criptoMonedaCompra");
  const cantidadCripto = document.getElementById("cantidadCripto");
  const btnConfirmarCompraCripto = document.getElementById("confirmarCompraCripto");
  const totalCripto = document.getElementById("totalCripto");
  const carritoContainer = document.getElementById("carritoBody");
  const btnEliminarCompras = document.getElementById("eliminarCompras");
  const btnVaciarCarrito = document.getElementById("vaciarCarrito");
  const btnConfirmarCompra = document.getElementById("confirmarCompra");
  
  let carrito = [];
  
  /*function mostrarCriptos(cripto) {
    const div = document.createElement("div");
    div.classList.add("cripto-monedas");
    div.innerHTML = `
    <div class="cripto-contenedor-card">
    <div class="cripto-imagen">
    <img src="../images/${cripto.imagen}" alt="${cripto.nombre}">
    </div>
    <div class="cripto-info">
    <div class="cripto-nombre-contenedor">
    <h2 class="cripto-nombre">${cripto.nombre}</h2>
    </div>
    <div class="cripto-precio-contenedor">
    <p class="cripto-precio">$${cripto.costo}</p>
    </div>
    </div>
    </div>
    `;
    document.getElementById("criptoContenedor").append(div);
  }*/
  
  function mostrarCriptos({ nombre, imagen, costo }) { //mostrar cards con destructuring objeto
    const div = document.createElement("div"); //crea un div
    div.classList.add("cripto-monedas"); //agrega clase
    //agregamos html y variables
    div.innerHTML = `
    <div class="cripto-contenedor-card">
    <div class="cripto-imagen">
    <img src="../images/${imagen}" alt="${nombre}">
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
    document.getElementById("criptoContenedor").append(div); //lo agrega como hijo del div
  }
  
  function buscarPorNombre(arr, filtro) {
    if (filtro.length > 3) {
      return arr.find((el) => el.nombre.includes(filtro));
    } else {
      return;
    }
  }
  
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  function recuperarCarritoDelLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }
  
  btnConfirmarCompraCripto.addEventListener("click", function (e) { //evento click en boton
    e.preventDefault();
    const nombreCripto = criptoMonedaCompra.value; //variable del input nombre de cripto
    const criptoEncontrada = buscarPorNombre(criptos, nombreCripto); //variable de funcion buscar nombre objeto con parametro de nombre ingresado por usuario
    
    if (criptoEncontrada) {
      calcularCompra(criptoEncontrada, cantidadCripto); //verifica igualdad, llama calcular y guardar en Storage
      guardarCarritoEnLocalStorage();
    } else { //si no encuentro aviso
      Swal.fire({
        title: "Error",
        text: "La criptomoneda seleccionada no está disponible.",
        icon: "error",
      });
    }
  });
  
  function calcularCompra(criptoEncontrada, cantidadCriptoElement) {
    const cantidadCripto = parseFloat(cantidadCriptoElement.value); //variable para guardar numero del usuario
    
    if (isNaN(cantidadCripto) || cantidadCripto <= 0) { //si no es numero o menor a 0 vuelve
      return;
    }
    
    const totalCompraActual = criptoEncontrada.costo * cantidadCripto; //calcula precio cripto por cantidad de usuario
    agregarAlCarrito(criptoEncontrada, cantidadCripto, totalCompraActual); // llama funcion con parametros de nombre moneda, cantidad de usuario y funcion para ir sumando total
    mostrarTotalCarrito();
  }
  
  function agregarAlCarrito(criptoEncontrada, cantidad, totalCompraActual) {
    const compra = { //genera objeto con 3 propiedades, para crear la tabla
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
    
    carrito.forEach((item, index) => { //ciclo para crear filas de las compras con index para eliminarlas
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
  });
  
  btnConfirmarCompra.addEventListener('click', confirmarCompra);
  
  function confirmarCompra() {
    if (carrito.length === 0) { //carrito vacio
      Swal.fire({
        title: "Error",
        text: "El carrito está vacío. Agrega al menos un producto antes de confirmar la compra.",
        icon: "error",
      });
      return;
    }
    
    carrito.length = 0;
    mostrarCarrito();
    localStorage.removeItem('carrito'); //se elimina carrito del storage
  
    criptoMonedaCompra.value = ""; //campos vacios para volver a usar
    cantidadCripto.value = "";
  
    Swal.fire({
      title: "¡Compra Confirmada!",
      text: "Tu compra ha sido confirmada. ¡Gracias por tu compra!",
      icon: "success",
    });
  }
  
  criptos.forEach((cripto) => {
    mostrarCriptos(cripto); //mostrar cards
  });
  
  window.addEventListener('load', () => { //carga la pagina con local storage
    carrito = recuperarCarritoDelLocalStorage();
    mostrarCarrito();
  });