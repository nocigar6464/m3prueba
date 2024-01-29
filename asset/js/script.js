const getData = () => {
  const route = "https://mindicador.cl/api";
  let errorFetch;

  fetch(route)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      return response.json();
    })
    .then((data) => {
      // Obtener elementos del DOM
      const dolarValue = document.getElementById("dolarValue");
      const euroValue = document.getElementById("euroValue");
      const ufValue = document.getElementById("ufValue");

      // Asignar los valores de las monedas a los elementos del DOM
      dolarValue.innerHTML = `Valor Dolar: ${data.dolar.valor}`;
      euroValue.innerHTML = `Valor Euro: ${data.euro.valor}`;
      ufValue.innerHTML = `Valor UF: ${data.uf.valor}`;

      // Guardar los valores en variables globales para poder acceder a ellos desde multiplyFunction
      window.data = data;
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      errorFetch = error;
    });
};

getData();

// Definición de la función multiplyFunction fuera de getData para poder llamarla con el botón
const multiplyFunction = () => {
  const myInput = document.getElementById("inputCoin").value;
  const dolarResult = myInput * window.data.dolar.valor;
  const euroResult = myInput * window.data.euro.valor;
  const ufResult = myInput * window.data.uf.valor;

  console.log("Dolar Resultado:", dolarResult);
  console.log("Euro Resultado:", euroResult);
  console.log("UF Resultado:", ufResult);

  //Grafico de uf

  // Mostrar el resultado
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpiar resultados anteriores

  // Obtener el elemento <select> por su ID
  const selectElement = document.getElementById("monedaSelect");

  // Obtengo el valor seleccionado del <select>
  const selectedValue = selectElement.value;

  // Realizar la comparación basada en el valor seleccionado
  if (selectedValue === "1") {
    // Si el valor seleccionado es '1' (dólar)
    resultado.innerHTML += `Dolar Resultado: ${dolarResult} dolares<br>`;
    // Mostrar el resultado de dolar
  } else if (selectedValue === "2") {
    // Si el valor seleccionado es '2' (euro)
    resultado.innerHTML += `Euro Resultado: ${euroResult} euros<br>`;
    // Mostrar el resultado de euro
  } else if (selectedValue === "3") {
    // Si el valor seleccionado es '3' (UF)
    resultado.innerHTML += `UF Resultado: ${ufResult} UF<br>`;
    // Mostrar el resultado de uf
  } else {
    // En caso de que no haya ninguna opción seleccionada
    resultado.innerHTML = "Selecciona una opción y presiona el botón";
    // Mostrar un mensaje de error
  }
};

// Obtener el elemento <button> por su ID y agregar un evento de clic
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", multiplyFunction);
