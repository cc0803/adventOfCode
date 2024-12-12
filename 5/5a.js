const fs = require("fs");

let rulesRaw = readFile("./test5rules.txt");
let printerRaw = readFile("./test5print.txt");

let rules = [];
let printer = [];
cleanRules();
cleanPrinter();
console.log(printer);

function cleanPrinter() {
	let buffer = [];
	let el = [];

	for (let i = 0; i < printerRaw.length; i++) {
		if (printerRaw[i] == ",") {
			buffer.push(Number(el.join("")));
			el = [];
		} else if (printerRaw[i] == "\n") {
			buffer.push(Number(el.join("")));
			printer.push(buffer);
			buffer = [];
			el = [];
		} else {
			el.push(printerRaw[i]);
		}
	}
}

function cleanRules() {
	let buffer = [];
	let el = [];
	for (let i = 0; i < rulesRaw.length; i++) {
		if (rulesRaw[i] == "|") {
			buffer.push(Number(el.join("")));
			el = [];
		} else if (rulesRaw[i] == "\n") {
			buffer.push(Number(el.join("")));
			rules.push(buffer);
			buffer = [];
			el = [];
		} else {
			el.push(rulesRaw[i]);
		}
	}
}

function readFile(path) {
	try {
		const data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error(error);
	}
}
