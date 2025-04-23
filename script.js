document.getElementById("buscar").addEventListener("click", async () => {
  const termino = document.getElementById("busqueda").value.trim();
  if (!termino) {
    alert("Por favor, escribe algo.");
    return;
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    termino
  )}&entity=musicTrack&limit=20&attribute=artistTerm`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

    if (datos.results.length === 0) {
      contenedor.textContent = "No se encontraron resultados.";
      return;
    }

    console.log(datos);
    datos.results.forEach((cancion) => {
      const div = document.createElement("div");
      div.className = "cancion";
      div.innerHTML = `
        <img src="${cancion.artworkUrl100}" alt="Portada">
        <div>
          <strong>${cancion.trackName}</strong><br>
          👤 ${cancion.artistName}<br>
          💿 ${cancion.collectionName}<br>
          <audio controls src="${cancion.previewUrl}"></audio>
        </div>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("❌ Error al obtener datos:", error);
    document.getElementById("resultados").textContent = "Ocurrió un error.";
  }
});
