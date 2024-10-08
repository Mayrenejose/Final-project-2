// document.getElementById('login-form').addEventListener('submit', async function(event) {
//     event.preventDefault(); // Evita el envío predeterminado del formulario
//     const email = document.getElementById('emailRegister').value;
//     const password = document.getElementById('passwordRegister').value;

//     fetch('/session/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//     })
//     .then(response => {
//         console.log(response , 5555555555555555555555555);
//         if (!response) {
//             throw new Error('Credenciales incorrectas'); // Puedes personalizar el mensaje de error
//         }
//         return response.json();
//     })
//     .then(data => {
//         const jwtToken = await data.token

//        if(data.token) {
//         fetch('/products', {
//             method:'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + jwtToken
//             }
//         }
//         .then(response => response.json())
//         .then(data => {
//             console.log(7777777777777777777);
//             window.location.href = '/products'
//             console.log(data, 'respuesta con token');
//         })
//     )}
//     })
//     .catch(error => {
//        console.error('Error en la solicitud:', error);
//     });
// });
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;

    try {
        const response = await fetch('/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log(response , 5555555555555555555555555);

        if (!response.ok) {
            throw new Error('Credenciales incorrectas'); // Puedes personalizar el mensaje de error
        }

        const data = await response.json();

        if (data.token) {
            const jwtToken = data.token;

            const productsResponse = await fetch('/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken,
                },
            });

            const productsData = await productsResponse.json();
            console.log(7777777777777777777);
            window.location.href = '/products';
            console.log(productsData, 'respuesta con token');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
