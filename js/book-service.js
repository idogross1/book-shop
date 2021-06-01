'use strict';

const KEY = 'books';
const PAGE_SIZE = 4;

var gPageIdx = 0;
var gBooks;
var gSortBy;

function getBooks() {
  var startIdx = gPageIdx * PAGE_SIZE;
  console.log('starting from', startIdx);
  var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);
  console.log('showing books', books);
  return books;
}

function movePage(diff) {
  gPageIdx += diff;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
  if (gPageIdx < 0) gPageIdx = Math.floor(gBooks.length / PAGE_SIZE);
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex((book) => bookId === book.id);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage(KEY, gBooks);
}

function addingBook(title, price) {
  gBooks.push(_createBook(title, price));
  _saveBooksToStorage(KEY, gBooks);
}

function updatingBook(bookId, newPrice) {
  var book = gBooks.find((book) => bookId === book.id);
  book.price = newPrice;
  _saveBooksToStorage(KEY, gBooks);
}

function getBookById(bookId) {
  return gBooks.find((book) => bookId === book.id);
}

function changeRating(bookId, diff) {
  var book = getBookById(bookId);
  if ((book.rating === 10 && diff > 0) || (book.rating === 0 && diff < 0))
    return;
  book.rating += diff;
  _saveBooksToStorage(KEY, gBooks);
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function sortBooks() {
  if (gSortBy === 'title') {
    gBooks.sort(function (a, b) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
    });
    return;
  }

  if (gSortBy === 'price') {
    gBooks.sort((a, b) => a.price - b.price);
    return;
  }
}

function _createBook(name, price = makePrice()) {
  return {
    id: makeId(),
    title: name,
    price: price,
    description: makeLorem(),
    rating: 5,
  };
}

function _createBooks() {
  var books = _loadFromStorage(KEY);
  var books;
  if (!books || !books.length) {
    var bookTitles = [
      'Harry Potter',
      'Peter Pan',
      'Game Of Thrones',
      'Pride and Prejudice',
      "My Sister's Keeper",
    ];
    books = bookTitles.map((title) => _createBook(title));
  }
  gBooks = books;
  _saveBooksToStorage(KEY, gBooks);
}

function _saveBooksToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function _loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}

_createBooks();
