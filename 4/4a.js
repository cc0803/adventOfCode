const fs = require("fs");

let counter = 0;
const data = readFile("input4.txt");

let table = cleanUpData(data);
let row = table.length;
let col = table[0].length;
let colArr = createColArr(table);

table.forEach((r) => {
	testRowBack(r);
	testRowFront(r);
});

colArr.forEach((c) => {
	testRowBack(c);
	testRowFront(c);
});
testUpRight(table);
testUpLeft(table);
testDownLeft(table);
testDownRight(table);

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

function testRowBack(input) {
	let buffer = [];

	for (let i = 0; i < row; i++) {
		if (input[i] == "X" && i > 2) {
			for (let k = 0; k < 4; k++) {
				buffer.push(input[i - k]);
			}
			if (buffer.join("") == "XMAS") {
				counter++;
			}
			buffer = [];
		}
	}
}

function testUpRight(input) {
	let buffer = [];

	for (let i = 0; i < row; i++) {
		for (let k = 0; k < col; k++) {
			if (input[i][k] == "X") {
				if (i > 2 && k < row - 3) {
					for (let z = 0; z < 4; z++) {
						buffer.push(input[i - z][k + z]);
					}
					if (buffer.join("") == "XMAS") {
						counter++;
					}
					buffer = [];
				}
			}
		}
	}
}

function testUpLeft(input) {
	let buffer = [];

	for (let i = 0; i < row; i++) {
		for (let k = 0; k < col; k++) {
			if (input[i][k] == "X") {
				if (i > 2 && k > 2) {
					for (let z = 0; z < 4; z++) {
						buffer.push(input[i - z][k - z]);
					}
					if (buffer.join("") == "XMAS") {
						counter++;
					}
					buffer = [];
				}
			}
		}
	}
}

function testDownLeft(input) {
	let buffer = [];

	for (let i = 0; i < row; i++) {
		for (let k = 0; k < col; k++) {
			if (input[i][k] == "X") {
				if (i < col - 3 && k > 2) {
					for (let z = 0; z < 4; z++) {
						buffer.push(input[i + z][k - z]);
					}
					if (buffer.join("") == "XMAS") {
						counter++;
					}
					buffer = [];
				}
			}
		}
	}
}

function testDownRight(input) {
	let buffer = [];

	for (let i = 0; i < row; i++) {
		for (let k = 0; k < col; k++) {
			if (input[i][k] == "X") {
				if (i < col - 3 && k < row - 3) {
					for (let z = 0; z < 4; z++) {
						buffer.push(input[i + z][k + z]);
					}
					if (buffer.join("") == "XMAS") {
						counter++;
					}
					buffer = [];
				}
			}
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
