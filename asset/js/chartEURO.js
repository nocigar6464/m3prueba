function obtenerUltimosDatosEURO() {
  const url = "https://mindicador.cl/api/euro";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      return response.json();
    })
    .then((data) => {
      // Filtrar los últimos 10 datos de EURO
      const ultimosDatosEURO = data.serie.slice(-10);
      console.log("Últimos 10 datos de EURO:", ultimosDatosEURO);

      // Obtener las fechas y los valores de EURO
      const fechasEU = ultimosDatosEURO.map((dato) => dato.fecha.slice(0, 10));
      const valoresEU = ultimosDatosEURO.map((dato) => dato.valor);

      console.log(fechasEU);
      console.log(valoresEU);

      // Crear el gráfico utilizando Chart.js
      const ctx = document.getElementById("graficoEURO").getContext("2d");
      const graficoEURO = new Chart(ctx, {
        type: "line",
        data: {
          labels: fechasEU,
          datasets: [
            {
              label: "Últimos datos de EURO",
              data: valoresEU,
              borderColor: "blue",
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
}
