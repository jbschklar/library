"use strict";

const cardContainer = document.querySelector(".card-container");
const newBookBtn = document.querySelector(".book-btn");
const bookForm = document.querySelector(".book-form");
const inputs = document.querySelectorAll("input");
let updateClicks = 0;
let myLibrary = [];

function Book(title, author, pages, genre, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.status = status;
	this.position = "";
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

const updateRead = function () {};

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
const cardGenerator = function (book) {
	cardContainer.innerHTML = "";
	myLibrary.forEach((book) => {
		const newCard = document.createElement("div");
		newCard.classList.add("book-card", `${book.genre}`);
		newCard.dataset.position = book.position;

		newCard.innerHTML = `
    <div class="book-title">
        <h3>Title:</h3>
        <p>${book.title}</p>
    </div>
    <div class="book-author">
        <h3>Author:</h3>
        <p>${book.author}</p>
    </div>
    <div class="book-pages">
        <h3>Pages:</h3>
        <p>${book.pages}</p>
    </div>
    <div class="book-genre">
        <h3>Genre:</h3>
        <p>${capitalize(book.genre)}</p>
    </div>
    <div class="book-progress">
        <h3>Status:</h3>
        <p id="status">${capitalize(book.status)}</p>
    </div>
    <button class="update-read">Update Status</button>
    <div class="update-btn-container update hidden">
        <select name="status" id="status-update" class="update-select">
            <option value="read">Read</option>
            <option value="in-progress">In progress</option>
            <option value="not-read">Not read</option>
        </select>
        <button class="update-submit">Update</button>
    </div>
    <button class="remove-btn">Remove</button>
`;
		cardContainer.appendChild(newCard);
	});
};

newBookBtn.addEventListener("click", function (e) {
	bookForm.classList.remove("hidden");
	console.log("working");
});

cardContainer.addEventListener("click", function (e) {
	const book = e.target.closest(".book-card");
	const position = +book.dataset.position;
	// console.log(position);
	if (e.target.classList.contains("remove-btn")) {
		myLibrary.splice(myLibrary.indexOf(book));
		cardGenerator(myLibrary);
	}
	if (e.target.classList.contains("update-read")) {
		const status = book.querySelector("#status");
		const update = book.querySelector(".update");
		const updateSelect = book.querySelector(".update-select");
		update.classList.remove("hidden");
		updateClicks++;
		if (e.target.classList.contains("update-submit")) {
			// put this in another eventlistener?
			const newStatus = updateSelect.options[updateSelect.selectedIndex].text;
			status.innerHTML = newStatus;
			myLibrary.forEach((obj) => {
				console.log(obj.position, position);
				if (obj.position === position) {
					obj.status = newStatus;
					console.log(obj.status);
				}
			});
			// console.log(book.status);
			updateClicks = 0;
			// update.classList.add("hidden");
		}
	}
});

bookForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const newBook = {};
	inputs.forEach((input) => {
		if (input.checked) {
			input.name === "genre"
				? (newBook.genre = input.id)
				: (newBook.status = capitalize(input.id));
		}
		if (input.type !== "radio") {
			const objKey = `${input.name}`;
			newBook[objKey] = capitalize(input.value);
		}
	});
	newBook.prototype = Object.create(Book.prototype);
	myLibrary.push(newBook);
	newBook.position = myLibrary.indexOf(newBook);
	bookForm.classList.add("hidden");
	cardGenerator(myLibrary);
	reset();
});
