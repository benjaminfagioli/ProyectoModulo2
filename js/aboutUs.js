const devs = [{
  nombre: 'Benja',
  imagen: 'https://i.pinimg.com/564x/ee/c1/5f/eec15fdbdd2a0a2fb739f4ff5b0a73ad.jpg',
  descipcion: 'El dev benjamín se destacó en procesos como diseño de interfaz y la creacion de las paginas: principal, detalle de juego, error 404, contáctanos y acerca de nosotros.'
},{
  nombre: 'Julian',
  imagen: 'https://trello-members.s3.amazonaws.com/64aef38bacd63741b5527054/4be3c174de975461cff61e6d06e44d1f/170.png',
  descipcion: 'El dev Julian se destacó en procesos como la creación y animacion del footer, las paginas de login y register con sus respectivas UI y validaciones.'
},{
  nombre: 'Carlos',
  imagen: 'https://ca.slack-edge.com/THQU1MGPN-U05EQ19U9SM-324118025678-512',
  descipcion: 'El dev Carlos se destacó en procesos como la creación de la pagina de administrador, junto con toda su interfaz y lógica.'
}
]

const $divs = Array.from(document.getElementsByClassName('col-lg-4'))
$divs.forEach((div, i) => {
  div.innerHTML = `<h1>${devs[i].nombre}</h1> <img class="rounded-circle my-3" width="100px" height="100px" src="${devs[i].imagen}"</img> <p>${devs[i].descipcion}</p>`
})
