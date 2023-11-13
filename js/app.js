import data from "../database/db.json" assert {type: 'json'} // COMENTAR CON JSON SERVER
const products = data.products // COMENTAR CON JSON SERVER
const users = data.users // COMENTAR CON JSON SERVER

const botonComenzar= document.querySelector('.neon')
const sectionHero = document.querySelector('.hero')
botonComenzar.addEventListener('click', ()=> {
  setTimeout(() => {
    sectionHero.style.display = 'none'
    window.location.hash = ''
  }, 1000);
})
const getUsers = async ()=>{
  try {
      // let data = await fetch('http://localhost:3000/users') //descomentar con json server
      // let results = await data.json() //descomentar con json server
      let results = users // COMENTAR CON JSON SERVER
      console.log(results);
  } catch (error) {
    console.log(error.mesage);
  }
}

const getGames = async ()=>{
  try {
    // let data = await fetch('http://localhost:3000/products') //descomentar con json server
    // let results = await data.json() //descomentar con json server
    let results = products // COMENTAR CON JSON SERVER
    return results
  } catch (error) {
    console.log(error.message);
  }
}

const getFeaturedsGame = async() =>{
  try {
    let results = await getGames()
    let featuredsGame = results.filter(result => result.outstanding == true)
    return featuredsGame
  } catch (error) {
    console.log(error.message);
  }
}
const divGrande = document.getElementById('carrouselImages')
const carrouselBtns = Array.from(document.getElementsByClassName('carrouselBtn'))
carrouselBtns.forEach((punto,i) =>{
  punto.addEventListener('click', ()=>{
    let posicion = i
    let operacion = posicion * -(100/3)
    divGrande.style.transform = `translateX(${operacion}%)`
    divGrande.style.transition = 'transform .5s'
    carrouselBtns.forEach((punto) => punto.classList.remove('activo'))
    punto.classList.add('activo')
  })
})

const juegoDestacado = document.getElementById('infoFeaturedGame')
const printFeaturedGame = async (id)=>{
  juegoDestacado.innerHTML= ''
  let featuredsGame = (await getFeaturedsGame())[id]
  let gameCard = document.createElement('div')
  gameCard.innerHTML =  `<h1 class= 'display-3'>${featuredsGame.name}<h1> <p class ='fs-2 d-none d-lg-block'>${featuredsGame.description}</p><p class ='fs-5 d-lg-none'>${featuredsGame.description}</p> 
  <div class='row justify-content-center'>
    <div class='pb-3 fs-3 col-md-7 col-lg-8 align-self-center'>${featuredsGame.categories.join(' ')}</div> 
    <div class='col-md-5 col-lg-4 pb-2 pb-md-0 d-none d-md-block align-self-center'><a href='./views/404.html' class='text-decoration-none text-white'>
      <a href='./views/404.html' class='text-decoration-none text-white'>
        <div class="payment-button">
        <span class="label">Comprar ahora</span>
        <span class="price">$${featuredsGame.price}</span> </a>
        </div>
      </a>
    
  </div>
  </div>`
  juegoDestacado.appendChild(gameCard)
  divGrande.innerHTML =`<img width="33.33333%"  src="${featuredsGame.images[0]}"><img width="33.33333%" src="${featuredsGame.images[1]}"><img width="33.33333%" height="100%" src=${featuredsGame.images[2]}>`
}
printFeaturedGame(4)

const chooseFeaturedGameToPrint = async () =>{
  let featuredsGames = await getFeaturedsGame()
  let array = [] 
  featuredsGames.forEach((game, i)=> {
    array.push(`${i}, ${game.name}`)
  }) 
  let posicion = prompt(`Ingresa el juego que quieres destacar:\n${array.join('\n')}`)
  if (posicion != undefined && posicion<6 && posicion!='') {
    printFeaturedGame(parseInt(posicion))
  }
}
document.getElementById('testbtn').addEventListener('click', chooseFeaturedGameToPrint)

let allCategories = new Set
const getAllCategories = async ()=>{
  let products = await getGames() //comentar sin json server
  products.forEach((product, i) =>{
    let categories = product.categories
    categories.forEach(categoria => allCategories.add(categoria))
  })
  return Array.from(allCategories).sort()
}
const btnCategories = Array.from(document.getElementsByClassName('categoryBtn'))
const printCategoriesButtons = async ()=> {
  let botones = btnCategories
  let categorias = await getAllCategories()
  const fiveRandomNumbers = new Set
  do {
    fiveRandomNumbers.add(parseInt(Math.random() * (categorias.length)))
  } while (fiveRandomNumbers.size<5);
  let numerosAleatorios= Array.from(fiveRandomNumbers)
  botones.forEach((boton, i) => { 
    boton.innerHTML = categorias[numerosAleatorios[i]]
  })
}
printCategoriesButtons()


const containerCategoryGames = document.getElementById('gamesByCategory')


const printCategoryGames = async (i)=>{
  containerCategoryGames.innerHTML=''
  browser.value= ''
  let botonPulsado = btnCategories[i]
  let categoriaSeleccionada = botonPulsado.innerText
  let products = await getGames() //comentar sin json server
  let resultados = products.filter(game => game.categories.includes(categoriaSeleccionada))
  resultados.forEach((game) => {
    let gameCard = document.createElement('div')
    gameCard.innerHTML= `<div class='p-2'> <h5 class='gameName display-6 fs-4 text-center my-2'>${game.name}</h5> <p class='ms-2 mb-1 text-end'><b class='text-primary'>$${game.price}<span class='masInfo d-block d-lg-none'>Mas info</span></b></p><p  id='descripcionJuegos'>${game.description}<span class='verMas'>Ver más</span></p> </div><img src='${game.images[1]}'>`
    gameCard.classList= 'card cardGame col-md-4 col-lg-2 m-md-3 my-2 d-flex flex-column justify-content-between'
    containerCategoryGames.appendChild(gameCard)
  }
  )
}
setTimeout(() => {
  document.querySelector('.categoriaActual').click()
}, 100);

btnCategories.forEach((boton, i ) => {
  boton.addEventListener('click', ()=> {
    printCategoryGames(i) 
    btnCategories.forEach(boton => boton.classList.remove('categoriaActual'))
    boton.classList.add('categoriaActual')
    abrirJuegoSeleccionado()
  })
})

const browser = document.getElementById('browser')
const sortByName =  async ()=> {
    containerCategoryGames.innerHTML=''
    let value = browser.value.toLowerCase()
    btnCategories.forEach(boton => boton.classList.remove('categoriaActual'))
    let products = await getGames() //comentar sin json server
    let resultados = products.filter(game => game.name.toLowerCase().includes(value))
    if (value != '') {
      resultados.forEach((game) => {
        let gameCard = document.createElement('div')
        gameCard.innerHTML= `<div class='p-2'> <h5 class='gameName display-6 fs-4 text-center my-2'>${game.name}</h5> <p class='ms-2 mb-1 text-end'><b class='text-primary'>$${game.price} <span class='masInfo d-block d-lg-none'>Mas info</span></b></p>  <p id='descripcionJuegos'>${game.description}<span class='verMas d-none d-lg-block'>Ver más</span></p> </div><img src='${game.images[1]}'>`
        gameCard.classList= 'card cardGame col-md-4 col-lg-2 m-md-3 my-2 d-flex flex-column justify-content-between'
        containerCategoryGames.appendChild(gameCard)
      }
      )
    }
    abrirJuegoSeleccionado()
}
browser.addEventListener('keyup', sortByName)
browser.addEventListener('focus', () => browser.placeholder= '')
browser.addEventListener('blur', () => browser.placeholder= 'Nombre del juego') 


// AGREGAR FUNCION PARA IR A LA PAGINA DE CADA JUEGO

const abrirJuegoSeleccionado = () =>{
setTimeout(() => {
  let botonesVerMas = Array.from(document.getElementsByClassName('verMas'))
  let botonesMasInfo = Array.from(document.getElementsByClassName('masInfo'))
  let gameNames = Array.from(document.getElementsByClassName('gameName'))
  botonesVerMas.forEach((boton,i) => {
    boton.addEventListener('click', async ()=>{
      let juegoSeleccionado = gameNames[i]
      let juegos = await getGames()
      let result = juegos.find(juego => juego.name.includes(juegoSeleccionado.innerHTML))
      localStorage.setItem('Juego Seleccionado', JSON.stringify(result))
      window.location.replace('./views/game.html')
    })
  })
botonesMasInfo.forEach((boton,i) => {
  boton.addEventListener('click', async ()=>{
    let juegoSeleccionado = gameNames[i]
    let juegos = await getGames()
    let result = juegos.find(juego => juego.name.includes(juegoSeleccionado.innerHTML))
    localStorage.setItem('Juego Seleccionado', JSON.stringify(result))
    window.location.replace('./views/game.html')
  })
})
}, 100);
}

// si tengo una sesion iniciada reemplazar el ingresar con un Mi cuenta