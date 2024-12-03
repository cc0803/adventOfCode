const fs = require("fs");

function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error("Failed to read file");
	}
}

function createTwoArrays(arr) {
	let element = [];
	let selected = true;
	let space = false;

	arr.forEach((item) => {
		if (item != " " && item != "\n") {
			element.push(item);
			space = false;
		} else if (selected && !space) {
			arr1.push(Number(element.join("")));
			element = [];
			selected = false;
			space = true;
		} else if (!selected && !space) {
			arr2.push(Number(element.join("")));
			element = [];
			selected = true;
			space = true;
		}
	});
	arr2.push(Number(element.join("")));
}

const data = readFile("./input1.txt");

const arr1 = [];
const arr2 = [];

createTwoArrays(data);

let total = 0;
let multiplier = 0;

arr1.forEach((one) => {
	arr2.forEach((two) => {
		if (one == two) {
			multiplier++;
		}
	});
	total += Number(one) * multiplier;
	multiplier = 0;
});

console.log(total);
