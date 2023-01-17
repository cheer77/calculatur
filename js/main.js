"use strict";

// Theme switch
const darkTheme = document.querySelector(".main");
const textSwitch = document.querySelector(".calc-block__text");

// Calc elements
const themSwitcher = document.querySelector(".them-switcher");
const calculator = document.querySelector(".calc");
let history = [];
let tempNumber = "";
let operationType = "";

//------------------ Switcher -------------------------------
themSwitcher.addEventListener("click", function () {
	calculator.classList.toggle("th-b");
	themSwitcher.classList.toggle("active");
	darkTheme.classList.toggle("active");
	textSwitch.classList.toggle("active");
});
//------------------ Switcher End -------------------------------

calculator.addEventListener("click", (e) => {
	const target = e.target;

	if (target.classList.contains("calc__btn")) {
		const data = target.dataset.type;
		operation(data);
		renderTotal(tempNumber);
		renderHistory(history);
	}
});

function operation(data) {
	if (data >= 0) {
		operationType = "number";
		tempNumber = tempNumber === "0" ? data : tempNumber + data;
	} else if (data === "float") {
		operationType = "number";

		if (!/\./.test(tempNumber)) {
			if (tempNumber) {
				tempNumber = tempNumber + ".";
			} else {
				tempNumber = "0.";
			}
		}
	} else if (data === "delete" && operationType === "number") {
		tempNumber = tempNumber.substring(0, tempNumber.length - 1);
		tempNumber = tempNumber ? tempNumber : "0";
	} else if (["+", "-", "/", "*"].includes(data) && tempNumber) {
		operationType = data;
		history.push(tempNumber, operationType);
		tempNumber = "";
	} else if (data === "=") {
		history.push(tempNumber);
		tempNumber = calculate(history);
		history = [];
	} else if (data === "clear") {
		history = [];
		tempNumber = "0";
	}
}

function renderTotal(value) {
	const totalBlock = calculator.querySelector(".calc__total");
	totalBlock.innerHTML = `<span>${value}</span>`;
}

function renderHistory(historyArray) {
	const historyBlock = calculator.querySelector(".calc__area");
	let htmlElements = " ";

	historyArray.forEach((item) => {
		if (item >= 0) {
			htmlElements = htmlElements + `<span>${item}</span>`;
		} else if (["+", "-", "/", "*"].includes(item)) {
			htmlElements = htmlElements + `<strong>${item}</strong>`;
		}
	});

	historyBlock.innerHTML = htmlElements;
}

function calculate(historyArray) {
	let total = 0;

	historyArray.forEach((item, inx) => {
		item = parseFloat(item) >= 0 ? parseFloat(item) : item;
		if (inx === 0) {
			total = parseFloat(item);
		} else if (inx - 2 >= 0) {
			const prevItem = historyArray[inx - 1];
			if (item >= 0) {
				if (prevItem === "+") {
					total = total + item;
				} else if (prevItem === "-") {
					total = total - item;
				} else if (prevItem === "*") {
					total = total * item;
				} else if (prevItem === "/") {
					total = total / item;
				}
			}
		}
	});

	console.log(total);
	return total;
}
