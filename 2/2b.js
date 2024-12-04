const fs = require("fs");

let data = readFile("input2.txt");

let report = createArrays(data);

let total = 0;
report.forEach((arr) => {
	if (analyzeArray(arr)) {
		total++;
	}
});

console.log(total);

// Helper Functions
function readFile(path) {
	try {
		let data = fs.readFileSync(path);
		return data.toString().split("");
	} catch (error) {
		throw new Error("Failed to read file");
	}
}

function createArrays(input) {
	let complete = [];
	let line = [];
	let element = [];

	for (let i = 0; i < input.length; i++) {
		if (input[i] == " ") {
			line.push(Number(element.join("")));
			element = [];
		} else if (input[i] == "\n") {
			line.push(Number(element.join("")));
			complete.push(line);
			line = [];
			element = [];
		} else {
			element.push(input[i]);
		}
	}
	// for last line
	line.push(Number(element.join("")));
	complete.push(line);
	return complete;
}

function analyzeArray(arr, fault = false) {
	let secondToLast = null;
	let last = null;
	let faulty = fault;
	let element;

	for (let i = 0; i < arr.length; i++) {
		// just so i dont have to change element to arr[i]
		element = arr[i];
		// last is not yet assigned a value
		if (!last) {
			last = element;
			secondToLast = element;
			continue;
		}

		if (
			(element == last + 1 ||
				element == last + 2 ||
				element == last + 3) &&
			last >= secondToLast
		) {
			secondToLast = last;
			last = element;
			continue;
		} else if (
			(element == last - 1 ||
				element == last - 2 ||
				element == last - 3) &&
			last <= secondToLast
		) {
			secondToLast = last;
			last = element;
			continue;
		} else if (!faulty) {
			let buffer1 = arr.slice(0, i).concat(arr.slice(i + 1));
			let buffer2 = arr.slice(0, i - 1).concat(arr.slice(i));
			let buffer3 = arr.slice(0, i - 2).concat(arr.slice(i - 1));

			if (
				analyzeArray(buffer1, true) ||
				analyzeArray(buffer2, true) ||
				analyzeArray(buffer3, true)
			) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	return true;
}
