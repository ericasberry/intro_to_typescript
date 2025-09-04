type Pizza = {
  id?: number,
  name: string,
  price: number
};

type Order = {
  id: number,
  pizza: Pizza,
  status: "ordered" | "completed" // example of a union type
};

let cashInRegister: number = 100;
let nextOrderId: number = 1;
let nextPizzaId: number = 1;
const orderQueue: Order[] = [];

const menu: Pizza[] =[
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 9 }
]


// contrived generics example
function addToArray<T>(array: T[], item: T): T[] {
    array.push(item);
    return array;
}

addToArray<Pizza>(menu, { id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 13 });
addToArray<Order>(orderQueue, { id: nextOrderId++, pizza: menu[2], status: "completed"});


// Omit<T, K> makes properties specified in K optional for type T
// K can be a union type, e.g. "id" | "price"
// void return type means that the function does not return a value
function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
      id: nextPizzaId++,
      ...pizzaObj
  }
  menu.push(pizzaObj);
  return pizzaObj;
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
  if(!selectedPizza) {
      console.error(`${pizzaName} does not exist in the menu.`);
      return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order: Order | undefined = orderQueue.find(order => order.id === orderId);
  if(!order) {
    console.error(`Order id ${orderId} does not exist in the order queue.`);
    return;
  }
  order.status = "completed";
  return order;
}

// example of type narrowing
function getPizzaDetail(identifier: string | number) : Pizza | undefined {
    let selectedPizza;
    if(typeof identifier === "string") {
      selectedPizza = menu.find(pizzaObj => pizzaObj.name.toLowerCase() === identifier.toLowerCase());
    } else if(typeof identifier === "number") {
      selectedPizza = menu.find(pizzaObj => pizzaObj.id === identifier);
    } else {
        console.error(`Identifier ${identifier} must be a string or a number.`);
    }
    if(!selectedPizza) {
        console.error(`Identifier ${identifier} does not exist in the menu.`);
        return;
    }
   return selectedPizza;
}

addNewPizza({name: "Chicken Bacon Ranch", price: 12})
addNewPizza({name: "BBQ Chicken", price: 12})
addNewPizza({name: "Spicy Sausage", price: 11})

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);

