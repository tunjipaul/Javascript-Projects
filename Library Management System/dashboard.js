// ====== INITIAL SETUP ======
// If books not in localStorage, create sample books
if (!localStorage.getItem("books")) {
  const sampleBooks = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, status: "Available" },
    { title: "1984", author: "George Orwell", year: 1949, status: "Checked Out" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, status: "Available" }
  ];
  localStorage.setItem("books", JSON.stringify(sampleBooks));
}

// ====== LOAD BOOKS INTO TABLE ======
function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const tbody = document.querySelector("#bookTable tbody");
  tbody.innerHTML = "";

  books.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.status}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle Status</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ====== ADD BOOK ======
const bookForm = document.getElementById("bookForm");
if (bookForm) {
  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const books = JSON.parse(localStorage.getItem("books")) || [];

    const newBook = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      year: document.getElementById("year").value,
      status: document.getElementById("status").value
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    bookForm.reset();
    loadBooks();
  });
}

// ====== TOGGLE STATUS ======
function toggleStatus(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books[index].status = (books[index].status === "Available") ? "Checked Out" : "Available";
  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
}

// ====== DELETE BOOK ======
function deleteBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
}

// ====== SEARCH BOOKS ======
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const term = this.value.toLowerCase();
    const rows = document.querySelectorAll("#bookTable tbody tr");
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? "" : "none";
    });
  });
}

// ====== LOGOUT FUNCTIONALITY ======
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "library-login.html";
  });
}

// ====== LOGIN VALIDATION ======
if (window.location.pathname.includes("library-login.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "dashboard.html";
  } else {
    loadBooks();
  }
}
