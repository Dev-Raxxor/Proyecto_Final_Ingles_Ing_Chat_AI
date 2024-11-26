// Importar la librería de Google Generative AI desde un CDN
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

// Clave API para acceder al servicio de Google Generative AI
const API_KEY = 'AIzaSyAJJpLLLBWpi6qcEcqaUMLI-_E2ODc1eyc';
const genAI = new GoogleGenerativeAI(API_KEY);

// Escuchar el evento de clic en el botón
document.getElementById('generateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;

    // Validar que la entrada solo contenga caracteres en inglés
    if (!/^[a-zA-Z\s.,'"]+$/.test(inputText)) {
        document.getElementById('responseText').innerText = "Please enter text in English.";
        return;
    }

    // Crear el prompt para enviar a la API
    const prompt = `Act as an English teacher. Help students with their English questions with the request: "${inputText}"`;

    // Mostrar un mensaje mientras se genera la respuesta
    const responseElement = document.getElementById('responseText');
    responseElement.innerText = "Thinking...";

    try {
        // Obtener el modelo generativo de Google
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Obtener el texto de la respuesta generada
        const textResponse = await response.text();

        // Limpiar cualquier formato Markdown no deseado
        const cleanResponse = textResponse.replace(/[*_`]/g, '');

        // Iniciar el efecto de escritura simulada
        let index = 0;
        const typingSpeed = 50; // Velocidad de escritura en milisegundos
        responseElement.innerText = ''; // Limpiar el mensaje de "pensando..."

        // Función para mostrar el efecto de escritura
        function typeWriter() {
            if (index < cleanResponse.length) {
                responseElement.innerText += cleanResponse[index];
                index++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        typeWriter(); // Iniciar la animación de escritura

    } catch (error) {
        // Manejar errores y mostrar un mensaje al usuario
        console.error('Error generating content:', error);
        responseElement.innerText = "An error occurred. Please try again.";
    }
});
