import data from "../database/db.json" assert {type: 'json'} 
const {users, products} = data


export const cargaDeDatos=() => {
    const baseDeDatos=JSON.parse(localStorage.getItem("Usuarios"));
    const baseDeJuegos = JSON.parse(localStorage.getItem("Juegos"));
    console.log(baseDeJuegos);
    if(!baseDeDatos) {
        localStorage.setItem("Usuarios",JSON.stringify(data.users));
    }if(!baseDeJuegos) {
        localStorage.setItem("Juegos",JSON.stringify(data.products));
    }
};