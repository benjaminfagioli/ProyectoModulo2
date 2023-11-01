import data from "../database/db.json" assert {type: 'json'}
const products = data.products
const users = data.users
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
      let results = users
      console.log(results);
  } catch (error) {
    console.log(error.mesage);
  }
}

const getGames = async ()=>{
  try {
    // let data = await fetch('http://localhost:3000/products')
    // let results = await data.json()
    let results = products
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
const carrouselBtns = Array.from(document.getElementsByClassName('carrouselBtn'))
const divGrande = document.getElementById('carrouselImages')
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
  let featuredsGame = (await getFeaturedsGame())[id]
  console.log(featuredsGame);
  let gameCard = document.createElement('div')
  gameCard.innerHTML =  `<h1 class= 'display-3'>${featuredsGame.name}<h1> <p class ='fs-2 d-none d-lg-block'>${featuredsGame.description}<p><p class ='fs-5 d-lg-none'>${featuredsGame.description}<p>`
  juegoDestacado.appendChild(gameCard)
  document.getElementById('carrouselImages').innerHTML =`<img width="33.33333%"  src="${featuredsGame.images[0]}"><img width="33.33333%" src="${featuredsGame.images[1]}"><img width="33.33333%" height="100%" src=${featuredsGame.images[2]}>`
}
printFeaturedGame(5)
