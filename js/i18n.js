'use strict';

var gCurrLang = 'en';

var gTrans = {
  title: {
    en: 'Books!',
    he: 'ספרים!',
  },

  'book-title': {
    en: 'Title',
    he: 'כותרת',
  },

  'book-price': {
    en: 'Price',
    he: 'מחיר',
  },

  actions: {
    en: 'actions',
    he: 'פעולות',
  },

  read: {
    en: 'Read',
    he: 'קרא',
  },

  update: {
    en: 'Update',
    he: 'עדכן',
  },

  remove: {
    en: 'Remove',
    he: 'הסר',
  },

  'book-id': {
    en: 'Id',
    he: 'מק"ט',
  },

  'add-book': {
    en: 'Add Book',
    he: 'הוסף ספר',
  },
};

function setLang(lang) {
  gCurrLang = lang;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    var txt = getTrans(el.dataset.trans);
    if (el.nodeName === 'INPUT') el.placeholder = txt;
    else el.innerText = txt;
  });
}

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) return keyTrans.en;
  return txt;
}
