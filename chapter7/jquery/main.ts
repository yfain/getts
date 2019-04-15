import "core-js/es6/array";

declare var $: any

$("#customers").selectMenu();


const data = [1, 2, 3, 4, 5];

const array2 = data.find( item => item > 3 );


let x: string[];
x = ["Joe", "Mary"];

let y: [string, number];
y = ["Julia", 29];
// y = ["Julia", "Roberts"]; // error

let z: Array<string | number>;

z = ["Joe", 20, 52, 12];
// z = ["Joe", 20, 52, true];  // error
