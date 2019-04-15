"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/es6/array");
$("#customers").selectMenu();
var data = [1, 2, 3, 4, 5];
var array2 = data.find(function (item) { return item > 3; });
var x;
x = ["Joe", "Mary"];
var y;
y = ["Julia", 29];
// y = ["Julia", "Roberts"]; // error
var z;
z = ["Joe", 20, 52, 12];
// z = ["Joe", 20, 52, true];  // error
