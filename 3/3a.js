const fs = require("fs");

const data = readFile("input3.txt");

let regex = /mul\(\d{1,3},\d{1,3}\)/g;
let matches = data.match(regex);

let regex2 = /\d{1,3}/g;
let accumulator = 0;
matches.forEach((element) => {
	let buffer = [];
	buffer = element.match(regex2);
	console.log(buffer);
	accumulator += Number(buffer[0]) * Number(buffer[1]);
});

console.log(accumulator);

function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString();
	} catch (error) {
		throw new Error(error);
	}
}
