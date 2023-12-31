import data from "../database/db.json" assert {type: 'json'} // COMENTAR CON JSON SERVER
const products = data.products // COMENTAR CON JSON SERVER
const users = data.users // COMENTAR CON JSON SERVER
// 
const botonComenzar= document.querySelector('.neon')
const sectionHero = document.querySelector('.hero')
botonComenzar.addEventListener('click', ()=> {
  setInterval(() => {
    sectionHero.style.display = 'none'
  }, 1000);
})
const getUsers = async ()=>{
  try {
      // let data = await fetch('http://localhost:3000/users')
      // let results = await data.json()
      let results = users // COMENTAR CON JSON SERVER
      console.log(results);
  } catch (error) {
    console.log(error.mesage);
  }
}

const getGames = async ()=>{
  try {
    // let data = await fetch('http://localhost:3000/products')
    // let results = await data.json()
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
  console.log(featuredsGame);
  let gameCard = document.createElement('div')
  gameCard.innerHTML =  `<h1 class= 'display-3'>${featuredsGame.name}<h1> <p class ='fs-2 d-none d-lg-block'>${featuredsGame.description}<p><p class ='fs-5 d-lg-none'>${featuredsGame.description}<p>`
  juegoDestacado.appendChild(gameCard)
  divGrande.innerHTML =`<img width="33.33333%"  src="${featuredsGame.images[0]}"><img width="33.33333%" src="${featuredsGame.images[1]}"><img width="33.33333%" height="100%" src=${featuredsGame.images[2]}>`
}
printFeaturedGame(5)

const chooseFeaturedGameToPrint = async () =>{
  let featuredsGames = await getFeaturedsGame()
  let array = [] 
  featuredsGames.forEach((game, i)=> {
    array.push(`${i}, ${game.name}`)
  }) 
  let posicion = prompt(`Ingresa el juego que quieres destacar:\n${array.join('\n')}`)
  printFeaturedGame(parseInt(posicion))
}
document.getElementById('testbtn').addEventListener('click', chooseFeaturedGameToPrint)

let allCategories = new Set
const getAllCategories = ()=>{
  products.forEach((product, i) =>{
    let categories = product.categories
    categories.forEach(categoria => allCategories.add(categoria))
  })
  return Array.from(allCategories).sort()
}

const btnCategories = Array.from(document.getElementsByClassName('categoryBtn'))
const printCategoriesButtons = ()=> {
  let botones = btnCategories
  botones.forEach( boton => {
    let categorias = getAllCategories()
    let categoriaAleatoria = categorias[parseInt(Math.random() * (categorias.length))]
    boton.innerHTML = categoriaAleatoria
  })
}
printCategoriesButtons()


const containerCategoryGames = document.getElementById('gamesByCategory')


const printCategoryGames = (i)=>{
  containerCategoryGames.innerHTML=''
  let botonPulsado = btnCategories[i]
  let categoriaSeleccionada = botonPulsado.innerText
  let resultados = products.filter(game => game.categories.includes(categoriaSeleccionada))
  resultados.forEach((game) => {
    let gameCard = document.createElement('div')
    gameCard.innerHTML= `<div class='p-2'> <h5 class=' display-6 fs-3 text-center my-2'> ${game.name} </h5> <p class='ms-2 text-end'>Precio: <b class='text-success'>${game.price}</b></p> </div><img src='${game.images[1]}'>`
    gameCard.classList= 'card col-md-4 col-lg-2 m-md-3 my-2 d-flex flex-column justify-content-between'
    containerCategoryGames.appendChild(gameCard)
  }
  )
}
printCategoryGames(0)
btnCategories.forEach((boton, i ) => {
  boton.addEventListener('click', ()=> {
    printCategoryGames(i) 
    btnCategories.forEach(boton => boton.classList.remove('categoriaActual'))
    boton.classList.add('categoriaActual')
  })
})