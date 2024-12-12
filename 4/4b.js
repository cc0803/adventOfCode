const fs = require("fs");

let file = readFile("input4.txt");
const table = cleanUpData(file);

let result = searchXMAS(table);
console.log(result);

function searchXMAS(input) {
	let counter = 0;
	let left = [];
	let right = [];

	for (let i = 1; i < input.length - 1; i++) {
		for (let k = 1; k < input[0].length - 1; k++) {
			if (input[i][k] == "A") {
				left.push(input[i - 1][k - 1]);
				left.push(input[i][k]);
				left.push(input[i + 1][k + 1]);
				right.push(input[i - 1][k + 1]);
				right.push(input[i][k]);
				right.push(input[i + 1][k - 1]);

				if (
					(left.join("") == "SAM" || left.join("") == "MAS") &&
					(right.join("") == "SAM" || right.join("") == "MAS")
				) {
					console.log(right.join(""), left.join(""));
					counter++;
				}
				right = [];
				left = [];
			}
		}
	}

	return counter;
}

function readFile(path) {
	try {
		const data = fs.readFileSync(path);
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
