const main = document.querySelector('.main');
const library = document.querySelector('.library');
const newBookButton = document.querySelector('.new-book-button');
const form = document.querySelector('.new-book-form');
const formButton = document.querySelector('.form-button');
const titleSelector = document.querySelector('#title');
const authorSelector = document.querySelector('#author');
const pagesSelector = document.querySelector('#pages');
const haveReadSelector = document.querySelector('#read');
const addBookButton = document.querySelector('.form-button');



function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.getInfo = () => {
        return title + ' by ' + author + ' ' + numPages + ' pages';
    };
};

const guiness = new Book('World Records', 'Jim', 300, true);
const dictionary = new Book('Dictionary', 'Bob', 1000, false);

let myLibrary = [];

const addBookToLibrary = (book) => {
    myLibrary.push(book);
}
const displayBooks = () => {
    library.innerHTML = '';
    myLibrary.forEach((book) => {

        let newDiv = document.createElement('div');
        newDiv.classList.add('book-card',`book-card-${myLibrary.indexOf(book)+ 1}`);

        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', (e) => {
            toggleRead(e.target);
            e.target.textContent = e.target.textContent == 'read' ? 'unread' : 'read'
        })

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = book.title;

        let authorDiv = document.createElement('div');
        authorDiv.classList.add('author');
        authorDiv.textContent = `by ${book.author}`;

        let pagesDiv = document.createElement('div');
        pagesDiv.classList.add('pages');
        if (book.numPages === '') {
            pagesDiv.textContent = 'unknown page count'
        } else {
            pagesDiv.textContent = `${book.numPages} pages`;
        }
        
        let readIndicator = document.createElement('button');
        readIndicator.classList.add('read-button');
        if (book.haveRead !== true) {
            readIndicator.classList.add('unread');
        }
        readIndicator.textContent = book.haveRead ? 'read' : 'unread';

        newDiv.append(removeButton, titleDiv, authorDiv, pagesDiv, readIndicator);

        removeButton.addEventListener('click', (e) => {
            for (let book of myLibrary) {
                if (book['title'] == e.target.nextSibling.textContent) {
                    myLibrary.splice(myLibrary.indexOf(book), 1)
                    displayBooks();
                } 
            }
        })

        library.appendChild(newDiv);

        const readButton = document.querySelectorAll('.read-button');

        readButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                toggleRead(e.target);
                e.target.textContent = e.target.textContent == 'read' ? 'unread' : 'read'
            })
        })
    })
}

const toggleForm = () => {
    form.classList.toggle('hidden');
}

newBookButton.addEventListener('click', toggleForm);

const getNewBookInfo = () => {

    let titleVal = titleSelector.value;
    let authorVal = authorSelector.value;
    let pagesVal = pagesSelector.value;

    if (titleVal === '' || authorVal === '') {
        alert('Please fill in the required fields *');
    } else {
        let haveReadVal = haveReadSelector.checked;
        let thisBook = new Book(titleVal, authorVal, pagesVal, haveReadVal)
        addBookToLibrary(thisBook);
    }
    
};

const toggleRead = (book) => {
    book.classList.toggle('unread');
}

addBookButton.addEventListener('click', () => {
    getNewBookInfo();
    titleSelector.value = '';
    authorSelector.value = '';
    pagesSelector.value = '';
});

addBookButton.addEventListener('click', toggleForm);
addBookButton.addEventListener('click', displayBooks);

formButton.addEventListener('click', toggleForm);





