const obtenerUltimosDatosUF = () => {
  const url = "https://mindicador.cl/api/uf";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      return response.json();
    })
    .then((data) => {
      // Filtrar los últimos 10 datos de UF
      const ultimosDatosUF = data.serie.slice(-10);
      console.log("Últimos 10 datos de UF:", ultimosDatosUF);

      // Obtener las fechas y los valores de UF
      const fechas = ultimosDatosUF.map((dato) => dato.fecha.slice(0, 10));
      const valores = ultimosDatosUF.map((dato) => dato.valor);

      //los valores los pude poner en un array nuevo pero no se porque el grafico no se muestra

      // Crear el gráfico utilizando Chart.js
      const ctx = document.getElementById("graficoUF").getContext("2d");
      const graficoUF = new Chart(ctx, {
        type: "line",
        data: {
          labels: fechas,
          datasets: [
            {
              label: "Últimos datos de UF",
              data: valores,
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
};

obtenerUltimosDatosUF();
