const fs = require("fs");

function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error("Failed to read file");
	}
}

let rulesRaw = readFile("./5arules.txt");
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
buffer.push(str);
rules.push(buffer);
buffer = [];
str = "";

// Make printer Arguments readable;
let printerRaw = readFile("./5aprint.txt");
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
buffer.push(str);
printer.push(buffer);
buffer = [];
str = "";

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
		check = conformsToRule(input, rules[i]);
		if (!check) {
			return false;
		}
	}
	return true;
}

let incorrect = [];

for (let i = 0; i < printer.length; i++) {
	if (!checkPrint(printer[i])) {
		incorrect.push(printer[i]);
	}
}

function needsRules(input) {
	let apply = [];
	for (let i = 0; i < rules.length; i++) {
		if (rules[i][0] == input) {
			apply.push(rules[i][1]);
		}
	}
	return apply;
}

function reorder(input) {
	let rulesApply = [];
	let usedRule = false;
	let newlyOrdered = input;

	for (let i = 1; i < input.length; i++) {
		if (usedRule) {
			usedRule = false;
		}

		rulesApply = needsRules(input[i]);

		for (let k = 0; k < i; k++) {
			if (rulesApply.indexOf(newlyOrdered[k]) != -1) {
				newlyOrdered.splice(k, 0, input[i]);
				newlyOrdered.splice(i + 1, 1);
				usedRule = true;
				i--;
			}
		}

		rulesApply = [];
	}
	return newlyOrdered;
}

let ordered = [];
for (let i = 0; i < incorrect.length; i++) {
	ordered.push(reorder(incorrect[i]));
}

function middleValue(input) {
	let accumulator = 0;
	for (let i = 0; i < input.length; i++) {
		let middle = Math.floor(input[i].length / 2 - 0.5);
		accumulator += Number(input[i][middle]);
	}
	return accumulator;
}

console.log(middleValue(ordered));
