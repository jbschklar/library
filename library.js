"use strict";

function Book(title, author, pages, read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		return `${title} by ${author}, ${pages} pages, ${
			read ? "read" : "not read yet"
		}.`;
	};
}

const leviathanWakes = new Book(
	"Leviathan Wakes",
	"James S. A. Corey",
	577,
	true
);

console.log(leviathanWakes.info());

Book.prototype.shoutOut = function () {
	return `I love ${this.title}!`;
};

console.log(leviathanWakes.shoutOut());
