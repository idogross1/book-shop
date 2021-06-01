'use strict';

var gForm = false;

function onInit() {
  renderBooks();
}

function renderBooks() {
  //   console.log(gBooks);
  var books = getBooks();
  var strHtmls = `   
    <table>
        <thead>
            <tr>
                <th data-trans="book-id">Id</th>
                <th data-trans="book-title" class="sort" onclick="onSort('title')">Title</th>
                <th data-trans="book-price" class="sort" onclick="onSort('price')">Price</th>
                <th data-trans="actions" colspan="3">Actions</th>
            </tr>
        </thead>
        <tbody>
      `;
  strHtmls += books
    .map(function (book) {
      return `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button data-trans="read" class="btn read-btn"  onclick="onReadBook('${book.id}')">Read</button></td>
            <td>
              <button data-trans="update" class="btn update-btn update-btn-${book.id}" onclick="onUpdateBook('${book.id}')">Update</button>
              <form name="update-price-${book.id}" class="new-price-form-${book.id} hide" onsubmit="onUpdatePrice(event, '${book.id}')">
                <input class="new-price" data-id="${book.id}" placeholder="New Price"></input>
                <button class="btn" type="submit">Submit</button>
              </form>
              </td>
            <td><button data-trans="remove" class="btn remove-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`;
    })
    .join('');
  strHtmls += `
    </tbody>
  <table>`;
  document.querySelector('.books-container').innerHTML = strHtmls;
}

function onUpdatePrice(event, bookId) {
  event.preventDefault();
  var elBook = document.querySelector(`form[name="update-price-${bookId}"]`);
  var price = elBook.querySelector('input.new-price').value;
  updatingBook(bookId, price);
  renderBooks();
}

function onUpdateBook(bookId) {
  var elBtn = document.querySelector(`.update-btn-${bookId}`);
  elBtn.classList.add('hide');
  var elPriceForm = document.querySelector(`.new-price-form-${bookId}`);
  elPriceForm.classList.remove('hide');
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function onSort(sortBy) {
  setSort(sortBy);
  sortBooks();
  renderBooks();
}

function onAddBookOpenForm() {
  var elAddingForm = document.querySelector('.book-form');
  elAddingForm.classList.toggle('hide');
}

function onAddingBook(ev) {
  ev.preventDefault();

  var elAddingForm = document.querySelector('form[name="add-book-form"]');
  var elTitle = elAddingForm.querySelector('input.book-title');
  var elPrice = elAddingForm.querySelector('input.book-price');

  var title = elTitle.value;
  var price = elPrice.value;

  addingBook(title, price);

  elTitle.value = '';
  elPrice.value = '';

  renderBooks();
}
/*
 */

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector('.modal');
  elModal.querySelector('.book-title').innerText = book.title;
  elModal.querySelector(
    '.book-cover'
  ).innerHTML = `<img src="img/${book.title.toLowerCase()}.jpg" alt="${
    book.title
  }">`;
  elModal.querySelector('p').innerText = book.description;
  elModal.querySelector(
    '.rate-panel'
  ).innerHTML = `<button class="btn" onclick="onChangeRating('${book.id}', -1)">-</button>
  <span>${book.rating}</span>
  <button class="btn" onclick="onChangeRating('${book.id}', 1)">+</button>`;

  elModal.classList.toggle('hide');
}

function onCloseModal() {
  document.querySelector('.modal').classList.add('hide');
}

function onChangeRating(bookId, diff) {
  var book = getBookById(bookId);
  changeRating(bookId, diff);
  var elRating = document.querySelector('.rate-panel span');
  elRating.innerText = book.rating;
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl');
  else document.body.classList.remove('rtl');
  renderBooks();
  doTrans();
}

function onNextPage() {
  movePage(1);
  renderBooks();
}

function onPrevPage() {
  movePage(-1);
  renderBooks();
}
