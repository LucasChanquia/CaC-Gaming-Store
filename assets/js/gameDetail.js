
document.addEventListener("DOMContentLoaded", function () {
  const game = JSON.parse(localStorage.getItem("selectedGame"));

  if (!game) {
    console.error("No se encontró el juego seleccionado");
    return;
  }

  document.getElementById("game-title").textContent = game.title;
  document.getElementById("game-image").src = game.image;
  document.getElementById("game-image").alt = game.title;
  document.getElementById("game-platform").textContent = `Plataforma: ${game.platform}`;
  document.getElementById("game-genre").textContent = `Género: ${game.genre}`;

  document.getElementById("edit-button").addEventListener("click", function () {
   window.location.href = "../../pages/editGame.html"
    // Puedes usar localStorage o pasar datos a través de la URL
  });

  document.getElementById("delete-button").addEventListener("click", async function () {
    const URL = `http://localhost:8080/api/game/${game.id}`;
    const options = {
      method: "DELETE",
      headers: {
        
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error("Error al eliminar el juego");
      }
      console.log("Juego eliminado exitosamente");
      alert('Juego eliminado exitosamente');
      window.location.href = "../../pages/index.html";
      // Redirigir a la página principal o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
      // Mostrar un mensaje de error
    }
  });
});