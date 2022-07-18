"use strict";

const cardContainer = document.querySelector(".card-container");
const newBookBtn = document.querySelector(".book-btn");
const bookForm = document.querySelector(".book-form");
const inputs = document.querySelectorAll("input");
const removeBtn = document.querySelector(".remove-btn");
let myLibrary = [];

function Book(title, author, pages, genre, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.status = status;
}

const capitalize = function (str) {
	let newStr = str.split(" ");
	return newStr
		.map((str) => {
			return str.slice(0, 1).toUpperCase() + str.slice(1);
		})
		.join(" ");
};

const reset = function () {
	inputs.forEach((input) => {
		input.value = "";
		if (input.checked) input.checked = false;
	});
};

const removeBook = function (target) {
	myLibrary.forEach((book) => {
		if (book === e.target) {
			myLibrary.splice(myLibrary.indexOf(book));
		}
	});
};
const leviathanWakes = new Book(
	"Leviathan Wakes",
	"James S. A. Corey",
	577,
	"sci-fi",
	"read"
);

const calibansWar = new Book(
	"Caliban's War",
	"James S. A. Corey",
	605,
	"sci-fi",
	"read"
);

Book.prototype.shoutOut = function () {
	return `I love ${this.title}!`;
};

console.log(leviathanWakes.shoutOut());

const addBookToLibrary = function (bookObj) {
	myLibrary.push(bookObj);
};

addBookToLibrary(leviathanWakes);
addBookToLibrary(calibansWar);

console.log(myLibrary);

// add a new card to the page with all the book info gathered from form
const cardGenerator = function (bookObj) {
	const newCard = document.createElement("div");
	newCard.classList.add("book-card", `${bookObj.genre}`);

	newCard.innerHTML = `<div class="book-title">
    <h3>Title:</h3>
    <p>${bookObj.title}</p>
</div>
<div class="book-author">
    <h3>Author:</h3>
    <p>${bookObj.author}</p>
</div>
<div class="book-pages">
    <h3>Pages:</h3>
    <p>${bookObj.pages}</p>
</div>
<div class="book-genre">
    <h3>Genre:</h3>
    <p>${capitalize(bookObj.genre)}</p>
</div>
<div class="book-progress">
    <h3>Status:</h3>
    <p>${bookObj.status}</p>
</div>
<button class="remove-btn">Remove</button>
`;
	cardContainer.appendChild(newCard);
};

newBookBtn.addEventListener("click", function (e) {
	bookForm.classList.remove("hidden");
});

cardContainer.addEventListener("click", function (e) {
	console.log(e.target);
	// removeBook();
});

bookForm.addEventListener("submit", function (e) {
	e.preventDefault();
	cardContainer.innerHTML = "";
	const newBook = {};
	inputs.forEach((input) => {
		if (input.checked) {
			console.log(input.id);
			input.name === "genre"
				? (newBook.genre = input.id)
				: (newBook.status = capitalize(input.id));
		}
		if (input.type !== "radio") {
			const objKey = `${input.name}`;
			console.log(input.value);

			newBook[objKey] = capitalize(input.value);
		}
	});
	newBook.prototype = Object.create(Book.prototype);
	console.log(newBook);
	myLibrary.push(newBook);
	bookForm.classList.add("hidden");
	myLibrary.forEach((book) => cardGenerator(book));
	reset();
});
