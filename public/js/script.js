// document.getElementById('dreamForm').addEventListener('submit', async function(event) {
//     event.preventDefault();
    
//     const dream = document.getElementById('dreamInput').value;
//     const resultContainer = document.getElementById('resultContainer');
//     const resultElement = document.getElementById('result');

//     // Display loading text
//     resultElement.textContent = "Interpreting your dream...";
//     resultContainer.style.display = 'block';

//     try {
//         const response = await fetch('/interpret-dream', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ dream })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         const interpretation = data[0].message.content;

//         // Display the AI interpretation
//         resultElement.textContent = interpretation;
//     } catch (error) {
//         console.error('Error:', error);
//         resultElement.textContent = "Sorry, something went wrong. Please try again.";
//     }
// });
document.getElementById('dreamForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const dream = document.getElementById('dreamInput').value;
    const resultContainer = document.getElementById('resultContainer');
    const resultElement = document.getElementById('result');

    // Ensure the resultContainer is visible before setting the text content
    resultContainer.style.display = 'block';

    // Display loading text
    resultElement.textContent = "Interpreting your dream...";

    try {
        const response = await fetch('/interpret-dream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dream })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const interpretation = data[0].message.content;

        // Display the AI interpretation
        resultElement.textContent = interpretation;
    } catch (error) {
        console.error('Error:', error);
        resultElement.textContent = "Sorry, something went wrong. Please try again.";
    }
});
