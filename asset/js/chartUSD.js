const obtenerUltimosDatosUSD = () => {
  const url = "https://mindicador.cl/api/dolar";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      return response.json();
    })
    .then((data) => {
      // Filtrar los últimos 10 datos de USD
      const ultimosDatosUSD = data.serie.slice(-10);
      console.log("Últimos 10 datos de USD:", ultimosDatosUSD);

      // Obtener las fechas y los valores de USD
      const fechasUSD = ultimosDatosUSD.map((dato) => dato.fecha.slice(0, 10));
      const valoresUSD = ultimosDatosUSD.map((dato) => dato.valor);

      //los valores los pude poner en un array nuevo pero no se porque el grafico no se muestra

      // Crear el gráfico utilizando Chart.js
      const ctx = document.getElementById("graficoUSD").getContext("2d");
      const graficoUSD = new Chart(ctx, {
        type: "line",
        data: {
          labels: fechasUSD,
          datasets: [
            {
              label: "Últimos datos de USD",
              data: valoresUSD,
              borderColor: "red",
              backgroundColor: "transparent",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
};

obtenerUltimosDatosUSD();
