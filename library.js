"use strict";

const cardContainer = document.querySelector(".card-container");
const newBookBtn = document.querySelector(".book-btn");
const bookForm = document.querySelector(".book-form");
const inputs = bookForm.querySelectorAll("input");
let formError = false;
// For status update event listener
let bookStatus;
let update;
let updateSelect;

let myLibrary = [];

class Book {
	constructor(title, author, pages, genre, status) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.genre = genre;
		this.status = status;
		this.position = "";
	}
	// this function allows correlation between the book and it's position in the library array
	getPosition() {
		this.position = myLibrary.indexOf(this);
	}
}

// helper function for rendering cards
const capitalize = function (str) {
	let newStr = str.split(" ");
	return newStr
		.map((str) => {
			return str.slice(0, 1).toUpperCase() + str.slice(1);
		})
		.join(" ");
};

// to reset form fields after each use
const reset = function () {
	inputs.forEach((input) => {
		input.value = "";
		if (input.checked) input.checked = false;
	});
};

// helper function
const addBookToLibrary = function (bookObj) {
	myLibrary.push(bookObj);
};

// adds a new card to the page with all the book info gathered from form
const cardGenerator = function (libraryArr) {
	cardContainer.innerHTML = "";
	libraryArr.forEach((book) => {
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
        <button class="update-submit" disabled>Update</button>
    </div>
    <button class="remove-btn">Remove</button>
`;
		cardContainer.appendChild(newCard);
	});
};

// makes form modal pop up/appear to create new book
newBookBtn.addEventListener("click", function (e) {
	bookForm.classList.remove("hidden");
});

// to creat new book for library using revealed form modal
bookForm.addEventListener("submit", function (e) {
	e.preventDefault();
	formError = false;
	const newBook = new Book();
	inputs.forEach((input) => {
		if (!input.value && input.type !== "radio") {
			// formError to prevent submition of empty sections
			formError = true;
			return;
		}
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
	if (formError) return;
	myLibrary.push(newBook);
	newBook.getPosition();
	bookForm.classList.add("hidden");
	cardGenerator(myLibrary);
	reset();
});

// this event listener handles button clicks on book cards once they're created since they actual buttons only exist in the DOM
cardContainer.addEventListener("click", function (e) {
	const book = e.target.closest(".book-card");
	const position = +book.dataset.position;
	const updateSubmitBtn = book.querySelector(".update-submit");

	// to remove card from lobrary array and card from UI
	if (e.target.classList.contains("remove-btn")) {
		console.log(myLibrary[position]);
		myLibrary.splice(myLibrary[position].position, 1);
		// this resets position value to correlate correctly with position in library array after a book is removed
		myLibrary.forEach((book) => {
			book.getPosition();
		});
		cardGenerator(myLibrary);
	}
	// initiate update status by revealing select menu
	if (e.target.classList.contains("update-read")) {
		bookStatus = book.querySelector("#status");
		update = book.querySelector(".update");
		updateSelect = book.querySelector(".update-select");
		update.classList.remove("hidden");
		updateSubmitBtn.removeAttribute("disabled");
		console.log(updateSubmitBtn.hasAttribute("disabled"));
	}
	// to submit once option is selected and then remove from view
	if (
		e.target.classList.contains("update-submit") &&
		!update.classList.contains("hidden")
	) {
		const newStatus = updateSelect.options[updateSelect.selectedIndex].text;
		bookStatus.innerHTML = newStatus;
		myLibrary.forEach((obj) => {
			if (obj.position === position) {
				obj.status = newStatus;
			}
		});

		update.classList.add("hidden");
		updateSubmitBtn.setAttribute("disabled", "");
	}
});

cardGenerator(myLibrary);
