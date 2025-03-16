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

// Make rules readable
let rulesRaw = readFile("./5aRules.txt");
let rules = [];

let buffer = [];
let str = "";
for (let i = 0; i < rulesRaw.length; i++) {
	if (rulesRaw[i] == "|") {
		buffer.push(str);
		str = "";
	} else if (rulesRaw[i] == "\n") {
		buffer.push(str);
		rules.push(buffer);
		buffer = [];
		str = "";
	} else {
		str += rulesRaw[i];
	}
}
str = "";
buffer = [];

// Make printer Arguments readable;
let printerRaw = readFile("./5aPrint.txt");
let printer = [];

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

function conformsToRule(input, rule) {
	let i1 = input.indexOf(rule[0]);
	let i2 = input.indexOf(rule[1]);
	if (i1 == -1 || i2 == -1) {
		return true;
	}
	if (i2 < i1) {
		return false;
	} else {
		return true;
	}
}

function checkPrint(input) {
	let check = true;
	for (let i = 0; i < rules.length; i++) {
		if (!check) {
			return false;
		}
		check = conformsToRule(input, rules[i]);
	}
	return true;
}

let correct = [];

for (let i = 0; i < printer.length; i++) {
	if (checkPrint(printer[i])) {
		correct.push(printer[i]);
	}
}

function middleValue(input) {
	let accumulator = 0;
	for (let i = 0; i < input.length; i++) {
		let middle = Math.floor(input[i].length / 2 - 0.5);
		accumulator += Number(input[i][middle]);
	}
	return accumulator;
}

console.log(middleValue(correct));
