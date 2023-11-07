const emailValidation =  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
const textValidation = /[a-zA-Z0-9._-]{20}/
const btnSubmit = document.getElementById('btnSubmit')
const form = document.getElementById('formulario')
const response1 = document.getElementById('response1')
const response2 = document.getElementById('response2')
response1.classList.remove('d-none')

form.addEventListener('submit', (e)=>{
  const formData = Object.fromEntries(new FormData(e.target))
  if (emailValidation.test(formData.email) && textValidation.test(formData.consulta)) {
    
  } else{
    if (emailValidation.test(formData.email)) {
      response1.classList.add('d-none')
    } if (textValidation.test(formData.consulta)) {
      response2.classList.add('d-none')
    }
    e.preventDefault()
    btnSubmit.setAttribute('data-bs-toggle', 'offcanvas')
    btnSubmit.setAttribute('data-bs-target', '#offcanvasWithBothOptions')
    btnSubmit.click()
    btnSubmit.removeAttribute('data-bs-target', '#offcanvasWithBothOptions')
  }
})

const closeOffCanvas = document.getElementById('closeOffCanvas')
closeOffCanvas.addEventListener('click', ()=>{
  setTimeout(() => {
    response1.classList.remove('d-none')
    response2.classList.remove('d-none')
  }, 2000);
})

const frecuentQuestions = [{
  question: '¿Qué es eso de los juegos gratis?',
  answer: 'Game Boy ofrecerá un nuevo juego gratis disponible cada semana. Cuando reclames un juego gratis, será tuyo para siempre, incluso después de que el juego ya no esté disponible para nuevos clientes de forma gratuita.'
},{
  question: '¿Puedo probar un juego antes de comprarlo?',
  answer: 'En ocasiones, algunas editoras ofrecen demos o periodos de prueba gratuitos para ciertos juegos de pago (por ejemplo, una prueba gratuita de fin de semana). Durante un periodo de prueba gratuito, puedes descargar una versión de prueba del juego y usarla antes de decidirte a comprarlo, pero no podrás acceder a él cuando finalice dicho periodo.'
},{
  question: '¿Hasta cuándo se pueden devolver los productos?',
  answer: 'Los juegos y productos se pueden devolver dentro de un plazo de 14 días desde su compra si están marcados como "reembolsable" o "autoreembolsable". Sin embargo, debes haber jugado menos de 2 horas. Los productos que incluyen monedas virtuales u otros consumibles y los productos o juegos marcados como "no reembolsable" no son aptos para su reembolso.'
},{
  question: '¿Qué métodos de pago se admiten?',
  answer: 'La Game Boy Store admite tarjetas de crédito, PayPal y una variedad de métodos de pago alternativos.'
},{
  question: '¿Qué divisas aceptan y en qué monedas muestran los precios?',
  answer: 'En la actualidad, la Game Boy Store acepta 43 divisas (USD, EUR, GBP, PLN, BRL, UAH, RUB, KRW, JPY, TRY, AUD, CAD, DKK, NOK, SEK, CZK, ILS, CHF, MXN, PEN, HUF, CLP, SAR, AED, RON, NZD, ZAR, INR, COP, CRC, UYU, HKD, IDR, MYR, PHP, SGD, THB, VND, KZT, QAR, BGN, TWD, CNY). Estamos trabajando para añadir más divisas.'
},
]
const questionsContainer = document.getElementById('questionsContainer')
frecuentQuestions.forEach(element => {
  let container = document.createElement('div')
  container.innerHTML = `<h5 class='display-6 fs-4'>${element.question}</h5> <p>${element.answer}</p>`
  questionsContainer.appendChild(container)
})