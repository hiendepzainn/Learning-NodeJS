const object = {
  name: "Dinh Xuan Hien",
  age: 22,
  address: "59 Pham Van Dong",
};

const { address, age } = object;

console.log(`address: ${address}, age: ${age}`);

const myArray = [1410, 910, 2003, 2004];

const [a, b, c, d] = myArray;

console.log(`${a} - ${c}; ${b} - ${d}`);
