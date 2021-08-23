import { Form } from "./Form.js";

export class Dom {
    createElement(el, classNames = [], html, parent) {
        let element = document.createElement(el);
        if(classNames.length) {
            classNames.forEach(className => {
                element.classList.add(className); 
            });
        }
        element.innerHTML = html;
        parent.appendChild(element);
        return element;
    }

    static openBookInfoModal() {
        
    }

    static makeRow(container) {
        return new Dom().createElement("div", ["row"],"", container =window.container)

    }

    static AddFormsLeft(users, books) {
        let fContainer = Form.makeFormContainer();
        // Author
        let authorFormContainer = new Dom().createElement("div", ["form-author", "p-1"], "",window.container);
        let authorForm = Form.makeForm("/author/insert", "Add author", "form");

        Form.makeTextInput(authorForm, "First name", "firstName", "", "author");
        Form.makeTextInput(authorForm, "Last name", "lastName","", "author");
        Form.makeTextInput(authorForm, "City", "city","", "author");

        let submit = Form.makeFormButton("author","Submit", authorForm);

        authorForm.appendChild(submit);

        // User
        let userFormContainer = new Dom().createElement("div", ["form-user", "p-1"],"", window.container);
        let userForm = Form.makeForm("/user/insert", "Add user", "form");

        Form.makeTextInput(userForm, "First name", "firstName", "", "user");
        Form.makeTextInput(userForm, "Last name", "lastName","", "user");
        Form.makeTextInput(userForm, "Email", "email","", "user");
        
        let userSubmit = Form.makeFormButton("user", "Submit", userForm);
        userForm.appendChild(userSubmit);

        let orderFormContainer = new Dom().createElement("div", ["form-order", "p-1"], "", window.container);
        let orderForm = Form.makeForm("/order/insert", "Add order", "form");

        Form.makeSelectInput(orderForm, "User", "userId", "","order", "user", users);
        Form.makeSelectInput(orderForm, "Book", "bookId","","order", "book", books);
        
        let orderSubmit = Form.makeFormButton("order", "Submit", orderForm);
        orderForm.appendChild(orderSubmit);

        authorFormContainer.appendChild(authorForm);
        userFormContainer.appendChild(userForm);
        orderFormContainer.appendChild(orderForm);

        fContainer.appendChild(authorFormContainer);
        fContainer.appendChild(userFormContainer);
        fContainer.appendChild(orderFormContainer);
    }
}