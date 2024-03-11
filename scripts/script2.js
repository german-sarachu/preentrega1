class Divisa {
    constructor(icono, designacion, valorCompra, valorVenta) {
      this.icono = icono;
      this.designacion = designacion;
      this.valorCompra = parseFloat(valorCompra);
      this.valorVenta = parseFloat(valorVenta);
    }
  }
  
  // Arreglo de objetos Divisa
  const divisas = [
    new Divisa("PesoUrug", "Peso Uruguayo", 1, 1),
    new Divisa("EEUU", "Dolar", 37.85, 40.35),
    new Divisa("EURO", "Euro", 39.99, 44.94),
    new Divisa("PesoArg", "Peso Argentino", 0.024, 0.2),
    new Divisa("Real", "Real", 7.5, 9.2),
    new Divisa("Pata", "Patacon", 1000, 3000),
    new Divisa("Aust", "Austral",240, 340),
  ];
  
  const fromCurrencyOptions = document.querySelector('.from-currency select'); //desdeDivisaOpciones
  const toCurrencyOptions = document.querySelector('.to-currency select'); //aDivisaOpciones
  const fromAmount = document.querySelector('.from-amount input'); //desdeCantidad
  const fromResult = document.getElementById('from-result'); //desdeResultado
  const toResult = document.getElementById('to-result'); //aResultado
  const convertBtn = document.getElementById('convert-btn'); //botonConvertidor
  const swapBtn = document.getElementById('swap-btn'); //botonCambioOpcion
  
  // Función para mostrar las opciones de moneda en los elementos select
  function showCurrencyOptions() {
    let html = "";
    divisas.forEach(divisa => {
      html += `<option value="${divisa.designacion}">${divisa.designacion}</option>`;
    });
  
    fromCurrencyOptions.innerHTML = html;
    fromCurrencyOptions.querySelectorAll('option').forEach(option => {
      if (option.value === "Patacon") option.selected = 'selected';
    });
  
    toCurrencyOptions.innerHTML = html;
    toCurrencyOptions.querySelectorAll('option').forEach(option => {
      if (option.value === "Peso Uruguayo") option.selected = 'selected';
    });
  }
  
  // Llama a la función para mostrar las opciones de moneda cuando se carga la página
  document.addEventListener('DOMContentLoaded', () => {
    showCurrencyOptions();
  });
  
  // Valida el monto a convertir
  fromAmount.addEventListener('keyup', function() {
    let amount = Number(this.value);
    if (!amount) fromAmount.style.borderColor = "#de3f44";
    else fromAmount.style.borderColor = "#c6c7c9";
  });
  
  // Convierte la moneda de un país a la moneda de otro país
  convertBtn.addEventListener('click', () => {
    let fromCurrency = fromCurrencyOptions.value;
    let toCurrency = toCurrencyOptions.value;
    let fromAmt = Number(fromAmount.value);
    if (fromAmt) {
      let conversion = calcularConversionCompra(fromAmt, fromCurrency, toCurrency);
      displayConvertedData(fromCurrency, toCurrency, fromAmt, conversion);
    }
  });
  
  // Función para calcular la conversión entre dos monedas
  function calcularConversionCompra(cantidad, monedaOrigen, monedaDestino) {
    const divisaOrigen = divisas.find(
      (divisa) => divisa.designacion.toLowerCase() === monedaOrigen.toLowerCase()
    );
    const divisaDestino = divisas.find(
      (divisa) => divisa.designacion.toLowerCase() === monedaDestino.toLowerCase()
    );
  
    // Si una de las monedas no es válida o son la misma moneda, retorna 0
    if (!divisaOrigen || !divisaDestino || divisaOrigen === divisaDestino) {
      return 0;
    }
  
    // Calcula la conversión basada en los valores de compra y venta de las divisas
    let resultado = cantidad * (divisaOrigen.valorCompra / divisaDestino.valorVenta);
  
    return resultado;
  }
  
  // Muestra el resultado de la conversión
  function displayConvertedData(fromCurrency, toCurrency, fromAmt, toAmt) {
    fromResult.innerHTML = `${fromAmt.toFixed(2)} ${fromCurrency}`;
    toResult.innerHTML = `${toAmt.toFixed(2)} ${toCurrency}`;
  }
  
  // Intercambia las monedas seleccionadas
  swapBtn.addEventListener('click', () => {
    let fromIndex = fromCurrencyOptions.selectedIndex;
    let toIndex = toCurrencyOptions.selectedIndex;
    fromCurrencyOptions.selectedIndex = toIndex;
    toCurrencyOptions.selectedIndex = fromIndex;
  });
  