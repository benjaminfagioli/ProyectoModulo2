import data from '/database/db.json' assert { type: "json" }
const {users} = data

const $register = document.getElementById('register')
const $logIn = document.getElementById('logIn')
const $errorLogIn = document.getElementById('errorLogIn')
const $errorRegister = document.getElementById('errorRegister')

const emailValidation =  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
const minLengthValidation = /[a-zA-Z0-9._-]{3}/

localStorage.removeItem('Usuario Actual')

const comprobarSiExisteElUsuario = (data, spanError) =>{
  const result = (users.find(user => user.email === data.email))
  if (result.password === data.contraseña) {
    localStorage.setItem('Usuario Actual', JSON.stringify(result))
  } else {
    spanError.innerHTML = 'La contraseña no coincide'
  }
}

$logIn.addEventListener('submit', (e)=>{
  $errorLogIn.innerHTML = ''
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  try {
    console.log(comprobarSiExisteElUsuario(data, $errorLogIn));
  } catch (error) {
    $errorLogIn.innerHTML = 'El usuario o la contraseña son incorrectos'
  }
  if (localStorage.getItem('Usuario Actual')) {
    window.location.replace('../index.html')
  }
  }
)

$register.addEventListener('submit', (e)=>{
  e.preventDefault()
  $errorRegister.innerText= ''
  const data = Object.fromEntries(new FormData(e.target))
  const {name, lastName, email, password} = data
  mostrarErrores(name, lastName, email, password)
  validar(name, lastName, email, password, data)
})

const validar = (n,a,e,c, data) =>{
  if (minLengthValidation.test(n,a) && emailValidation.test(e) && passwordValidation.test(c)) {
    users.push(data)
    localStorage.setItem('Usuarios', JSON.stringify(users))
    $errorRegister.innerHTML='Registro exitoso!'
    window.location.reload()
  }
}

const mostrarErrores = (nombre, apellido, email, contraseña) =>{
  let message = []
  if (!minLengthValidation.test(nombre, apellido)){
    message.push('El nombre y apellido deben contar con entre 3-20 caracteres' )
  } if(!emailValidation.test(email)){
    message.push('El email debe tener un formato mail, por ejemplo: ejemplo@gmail.xx')
  } if (!passwordValidation.test(contraseña)){
    message.push('La contraseña debe tener minimo 8 caracteres, una mayuscula y un número')
  }
  $errorRegister.innerHTML = message.join('. ')
}