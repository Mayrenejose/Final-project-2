// const goToChat = document.getElementById('goChat')
// const url = 'http://localhost:8080/chat'

// goToChat.addEventListener('click', function() {
//     window.location.href = url
// })

// document.getElementById('submitRegister').addEventListener('click', function() {
//     const username = document.getElementById('username').value
//     const password = document.getElementById('password').value

//     if ( username && password ) {
//         fetch('http://localhost:8080/session/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password})
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Verifica si se obtuvo el token JWT en la respuesta
//             console.log(data);
//             // if (data.token) {
//             //     const jwtToken = data.token;
//             //     console.log(jwtToken,4444);
//             //     // Ahora puedes usar el token en las solicitudes subsiguientes
//             //     fetch('http://localhost:8080/products', {
//             //         method: 'GET', // o el método que necesites
//             //         headers: {
//             //             'Content-Type': 'application/json',
//             //             'Authorization': 'Bearer ' + jwtToken,
//             //         },
//             //     })
//             //     .then(response => response.json())
//             //     .then(data => {
//             //         console.log(data, 'respuesta con token');
//             //     })
//             //     .catch(error => {
//             //         console.error('error con token:', error);
//             //     });
//             // } else {
//             //     console.error('No se obtuvo el token en la respuesta.');
//             // }
//         })
//         .catch(error => {
//             console.error('error:', error);
//         })
//     }

// })

// document.getElementById('submitLogin').addEventListener('click', function(event) {
//     event.preventDefault(); // Evita el envío del formulario por defecto
//     console.log('entro');
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//      if (username && password) {
//         fetch('http://localhost:8080/session/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         })
//         .then(response => response.json())
//         .then(data => {
//            // Verifica si se obtuvo el token JWT en la respuesta
//            console.log(data);
//            // if (data.token) {
//               const jwtToken = data.token;
//               console.log(jwtToken,4444);
//               // Ahora puedes usar el token en las solicitudes subsiguientes
//               fetch('http://localhost:8080/products', {
//                   method: 'GET', // o el método que necesites
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authorization': 'Bearer ' + jwtToken,
//                   },
//               })
//               .then(response => response.json())
//               .then(data => {
//                   console.log(data, 'respuesta con token');
//               })
//               .catch(error => {
//                   console.error('error con token:', error);
//               });
           
//             })
//         .catch(error => {
//             console.error('error:', error);
//         });
// }
// });
document.getElementById('goChat').addEventListener('click', function(){
    console.log('entro');
})