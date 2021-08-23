import { Author } from "./Author.js";
import { Dom } from "./Dom.js";
import { Modal } from "./Modal.js";
import {Validation} from "./Validation.js";
import { Form } from "./Form.js";

export class Book extends Validation {
    constructor(data) {
        super()
        this.id = data.id ?? null;
        this.name = data.name ?? '';
        this.numberPages = data.numberPages ?? 0;
        this.author = (data.author)? data.author : {};
        // this.authorId = data.author ?? '';
        this.dom = new Dom();
    }

    render(authors) {
        let container = window.container;
        let row;
        for (var i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].className == "row") {
              row = container.childNodes[i];
              break;
            }        
        }
        if(row) {
            let row = document.getElementsByClassName("row")[0];
        }else {
            row = Dom.makeRow(container);
        }
        window.row = row;

        // Make book item
        row = this.dom.createElement("div", ["item"], "", row);
        row.innerHTML = "<p>" + this.name + "</p>";
        // window.container = container;
        let editButton = document.createElement("i");
        editButton.classList.add("fa");
        editButton.classList.add("fa-edit");
        editButton.classList.add("book-edit-icon");
        editButton.addEventListener("click", () => {
            alert(this.id);
        })
        // console.log(editButton);
        row.appendChild(editButton);

        // Add users who order this book
        let html = '';
        row.addEventListener("click",(e) => {

            // open edit modal
            if(e.target.nodeName == 'svg' || e.target.nodeName == 'path') {
                Modal.openEditInfoModal(this, authors);
            }else {
                Modal.openBookInfoModal(this, html ,[])
            }
            // if(e.target == 'svg')
        });
    }

    // static addPlusContainer() {
    //     console.log('dsfsdg');
    //     let container = new Dom().createElement("div", ["item", "no-image"], "", document.getElementsByClassName("row")[0]);
    //     new Dom().createElement("i", ["fa","fa-plus"], "", container)
    // }

    static makeBookForm(authors) {
        let container = new Dom().createElement("div", ["item", "no-image", "last-book-form"], "", document.getElementsByClassName("row")[0]);
        
        let bookFormContainer = new Dom().createElement("div", ["form-book", "p-1"], "",window.container);
        let bookForm = Form.makeForm("/author/insert", "", "form");

        Form.makeTextInput(bookForm, "Name", "name", "", "book");
        Form.makeTextInput(bookForm, "Number of Pages", "numberPages","", "book");
        Form.makeSelectInput(bookForm, "Author", "author", "","author", "author", authors);

        let submit = Form.makeFormButton("book","Submit", bookForm);

        bookForm.appendChild(submit);

        bookFormContainer.appendChild(bookForm);

        container.appendChild(bookFormContainer);

        if(window.row)
            window.row = container;
    }

    static validateGetData() {
        let data = localStorage.getItem("book");
        data = JSON.parse(data);
        let book = new Book(data);
        console.log(book);
        if(book.validatedFields()) {
            return {
                name: book.name,
                NumberPages: book.numberPages,
                AuthorId: book.author
            }
        }else {
            console.dir("Validation failed");
            return false;
        }
    }

    validatedFields() {
        let validated = true;
        let fields = ["name", "numberPages", "authorId"];
        for(let i=0; i<fields.length; i++) {
            let field = fields[i];
            if(!this.validated(field))
                validated = false;
                break;
        }
        console.log(validated);
        return validated;
    }
}