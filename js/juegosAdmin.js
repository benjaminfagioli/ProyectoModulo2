
import { Gift } from "./clasesJuegosAdmin.js";
import {cargaDeDatos} from "./funciones.js";
import data from "../database/db.json" assert {type: 'json'} 
const {users, products} = data

let datos= []
const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));

let idGiftUpdate = null;

window.mostrarModal = (i) => {
  console.log(i);
  idGiftUpdate = i;
  let index = datos.findIndex((item) => item.id == idGiftUpdate);

  document.querySelector("#giftModal").value = products[i].name;
  document.querySelector("#tipoModal").value = products[i].categories[0];
  document.querySelector("#tiempoModal").value = products[i].tiempo;
  document.querySelector("#precioModal").value = products[i].price;
  document.querySelector("#imagenModal").value = products[i].images[0];

  myModal.show();
  return idGiftUpdate
};

const giftUpdate = (e) => {
  e.preventDefault();
  products[idGiftUpdate].name = document.querySelector("#giftModal").value;
  products[idGiftUpdate].price = document.querySelector("#precioModal").value;
  products[idGiftUpdate].images[0] = document.querySelector("#imagenModal").value;
  localStorage.setItem('Juegos',JSON.stringify(products));
  cargarTabla();
  myModal.hide();
};

const cargarTabla = () => {
  let juegos = JSON.parse(localStorage.getItem("Juegos"));
  cuerpoTabla.innerHTML = "";
  juegos.map((item) => {
    const fila = document.createElement("tr");
    const celdas = `<th>${item.name}</th>
        <td>${item.categories}</td>
        <td>$${item.price}</td>
        <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id - 1})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button class="btn btn-outline-danger" onclick="borrarGift(${item.id - 1})"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        </td>
        `;

    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
};

const agregarGift = (event) => {
  event.preventDefault();

  let id = products.at(-1).id + 1;
  let gift = document.querySelector("#gift").value;
  let precio = document.querySelector("#precio").value;
  let tipo = document.querySelector("#tipo").value;

  products.push(new Gift(id, gift, precio, tipo));
  document.querySelector("#formGift").reset();
 
  localStorage.setItem("Juegos",JSON.stringify(products));
  cargarTabla();
};

window.borrarGift = (id) => {

  let validar = confirm(
    `Está seguro que quiere eliminar la gift card ${products[id].name}?`
  );

  if (validar) {
    let productos = JSON.parse(localStorage.getItem('Juegos'))
    productos.splice(id,1)
    localStorage.setItem("Juegos", JSON.stringify(productos));
    cargarTabla();
  }
};
cargaDeDatos()
cargarTabla();

document.querySelector("#formGift").addEventListener("submit", agregarGift);
document.querySelector("#formModal").addEventListener("submit", giftUpdate);
