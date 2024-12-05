const fs = require("fs");

let counter = 0;
const data = readFile("test4a.txt");

let table = cleanUpData(data);
let row = table.length;
let col = table[0].length;
let colArr = createColArr(table);

// table.forEach((r) => {
// 	testRowFront(r);
// });

colArr.forEach((c) => {
	testRowFront(c);
});
console.log(counter);

function createColArr(input) {
	let output = [];
	let buffer = [];

	for (let i = 0; i < row; i++) {
		for (let k = 0; k < col; k++) {
			buffer.push(input[k][i]);
		}
		output.push(buffer);
		buffer = [];
	}
	return output;
}

function testRowFront(input) {
	let buffer = [];

	for (let i = 0; i < row; i++) {
		if (input[i] == "X" && i < row - 3) {
			for (let k = 0; k < 4; k++) {
				buffer.push(input[i + k]);
			}
			if (buffer.join("") == "XMAS") {
				counter++;
			}
			buffer = [];
		}
	}
}

function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error(error);
	}
}

function cleanUpData(input) {
	let output = [];
	let buffer = [];

	for (let i = 0; i < input.length; i++) {
		if (input[i] != "\n") {
			buffer.push(input[i]);
		} else {
			output.push(buffer);
			buffer = [];
		}
	}
	output.push(buffer);

	return output;
}
