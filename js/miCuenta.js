let usuarioActual = JSON.parse(localStorage.getItem('Usuario Actual'))
console.log(usuarioActual);

document.getElementById('email').innerHTML = `Email: ${usuarioActual.email}`

document.getElementById('nombre').innerHTML = `Nombre: ${usuarioActual.name || usuarioActual.gift}`

document.getElementById('tiempo').innerHTML = `Tiempo de suscripcion restante: ${usuarioActual.tiempo}`

document.getElementById('precio').innerHTML = `Valor de suscripcion: ${usuarioActual.precio}`

document.getElementById('cerrarSesion').addEventListener('click',() => {
  localStorage.removeItem('Usuario Actual')
  window.location.replace('../index.html')
})