/// <reference path="node_modules/@types/jquery/JQuery.d.ts" />
/// <reference path="typings.d.ts" />


// import * as $ from 'jQuery';

import "core-js/es6/array";

declare var $: any

$("#customers").selectMenu();

$.

const data = [1, 2, 3, 4, 5];

const array2 = data.find( item => item > 3 );

greeti


//     "@types/es6-shim": "^0.31.39",


let x: string[];
x = ["Joe", "Mary"];

let y: [string, number];
y = ["Julia", 29];
y = ["Julia", "Roberts"]; // error

let z: Array<string | number>;

z = ["Joe", 20, 52, 12];
z = ["Joe", 20, 52, true];  // error
