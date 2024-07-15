document.getElementById("createGameForm").addEventListener("submit", async function (event) {
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

    const URL = "http://localhost:8080/api/games";
    const options = {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    };

    try {
        const response = await fetch(URL, options);
        if (!response.ok) {
            throw new Error('Error en la creación del juego');
        }
        const result = await response.json();
        console.log("Juego creado exitosamente:", result);
        alert('Juego creado exitosamente')
        window.location.href = "../../pages/index.html";
        // Aquí puedes agregar código para actualizar la interfaz o mostrar un mensaje de éxito
    } catch (error) {
        console.error("Error al crear el juego:", error);
        alert('Ocurrió un error. Por favor intentá nuevamente')
        // Aquí puedes agregar código para mostrar un mensaje de error
    }
});