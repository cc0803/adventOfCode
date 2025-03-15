const { constants } = require("buffer");
const fs = require("fs");

function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error("Failed to read file");
	}
}

let rulesRaw = readFile("./test5rules.txt");
let printerRaw = readFile("./test5print.txt");

let printer = [];
let buffer = [];
let str = "";
for (let i = 0; i < printerRaw.length; i++) {
	if (printerRaw[i] == ",") {
		buffer.push(str);
		str = "";
	} else if (printerRaw[i] == "\n") {
		buffer.push(str);
		printer.push(buffer);
		buffer = [];
		str = "";
	} else {
		str += printerRaw[i];
	}
}

console.log(printer);
