document.getElementById("editGameForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const plataforma = document.getElementById("plataforma").value;
    const genero = document.getElementById("genero").value;
    const imagen = document.getElementById("imagen").value;

    const game = {
        title: titulo,
        platform: plataforma,
        genre: genero,
        image: imagen
    };

    const storedGame = JSON.parse(localStorage.getItem("selectedGame"));
    if (!storedGame || !storedGame.id) {
        console.error('Game ID not found in localStorage');
        alert('Ocurrió un error. Por favor intentá nuevamente');
        return;
    }

    const URL = `http://localhost:8080/api/game/${storedGame.id}`;
    const options = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    };

    try {
        const response = await fetch(URL, options);
        if (!response.ok) {
            throw new Error('Error en la edición del juego');
        }
        const result = await response.json();
        console.log("Juego editado exitosamente:", result);
        alert('Juego editado exitosamente');
        window.location.href = "../../pages/index.html";
    } catch (error) {
        console.error("Error al editar el juego:", error);
        alert('Ocurrió un error. Por favor intentá nuevamente');
    }
});