export class Gift {
  constructor(id, name, precio, categories) {
    this.id = id
    this.name = name;
    this.price = precio;
    this.categories = categories
  }
}
export class User {
  constructor(name, tipo, tiempo, email) {
    this.gift = name;
    this.tipo = tipo;
    this.tiempo = tiempo;
    this.email = email;
  }
}