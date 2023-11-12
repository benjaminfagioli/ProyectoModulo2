try {
  let game = JSON.parse(localStorage.getItem('Juego Seleccionado'))
  let container = document.getElementById('printGameContainer')
  let gameCard = document.createElement('div')
  gameCard.innerHTML = `
  <h1 class='display-4'>${game.name}</h1>
  <h2 class='fs-4'>${game.categories.join(' - ')}</h2>
  <p class='fs-6'>${game.description}</p>`
  container.appendChild(gameCard)

  const reqMinContainer = document.getElementById('reqMinContainer')
  for (const key in game.requirementsMin) {
    const element = game.requirementsMin[key];
    let component = document.createElement('div')
    component.innerHTML = `${key.toUpperCase()}: ${element}`
    reqMinContainer.appendChild(component)
  }

  const reqRecContainer = document.getElementById('reqRecContainer')
  for (const key in game.requirementsMax) {
    const element = game.requirementsMax[key];
    let component = document.createElement('div')
    component.innerHTML = `${key.toUpperCase()}: ${element}`
    reqRecContainer.appendChild(component)
  }

  let carrouselItems = Array.from(document.getElementsByClassName('carousel-item'))
  carrouselItems.forEach((item, i) => {
    item. innerHTML = `<img src="${game.images[i]}" class="d-block w-100" alt="Foto de ${game.name}">`
  })

  document.getElementById('trailer').innerHTML = `${game.trailer}`

  document.querySelector('.price').innerHTML = `$${game.price}`
  // document.querySelector('.payment-button').addEventListener('click', ()=> window.location.replace('./404.html'));
  document.title = `${game.name} - Game Boy Store`
} catch (error) {
  window.location.replace('../views/404.html') 
}
