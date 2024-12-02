const fs = require("fs");

function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error("Failed to read file");
	}
}

let file = readFile("input1.txt");
const arr1 = [];
const arr2 = [];
createTwoArrays(file);

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
// sorting the arrays
arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

// calculate difference
let sum = 0;
for (let i = 0; i < arr1.length; i++) {
	sum += Math.abs(arr1[i] - arr2[i]);
}

console.log(sum);
