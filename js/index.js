document.addEventListener("DOMContentLoaded", function() {

    getBooksArray()

});

//Grab the books from the localserver
//Iterate through them and for every book, create an li
//li's textContent would be the books title
//for every li there is an event listener for click --> goes to another function
// apend that li to the ul with the id "list"

function getBooksArray(){
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => eachBook(books))
}

function eachBook(books){
    const bookList = document.getElementById("list")
        books.forEach(book => {
            const li = document.createElement("li")
            li.textContent = book.title
            li.addEventListener("click", () => showBook(book))

            bookList.appendChild(li)
        });
}
// get the div to append to
// for each book, get and create element for the following:
// image(img), title, subtitle, author(h3), description(p)
// a (ul) to append to with an id and a list of users (li), a like (button)


function showBook(book){
    const showPanel = document.getElementById("show-panel")
    showPanel.textContent = ""

    const bookDiv = document.createElement("div")
    bookDiv.id = "book-div"

    const img = document.createElement("img")
    img.src = book.img_url

    const title = document.createElement("h3")
    title.textContent = book.title

    const subtitle = document.createElement("h3")
    subtitle.textContent = book.subtitle

    const author = document.createElement("h3")
    author.textContent = book.author

    const description = document.createElement("p")
    description.textContent = book.description

    const userList = document.createElement("ul")
    userList.id = "user-list"
    userList.textContent = ""
    
    book.users.forEach(user =>  {
        const userLi = document.createElement("li")
        userLi.textContent = user.username
        userList.appendChild(userLi)
    })

    // if the users in this book has the user id of 1 then the button should be unlike otheriwse like
    // button has an event listener go to another function
    
    likeBtn = document.createElement("button")
    likeBtn.addEventListener("click", (e) => bookUsers(e, book))

    for (const user of book.users){
        if (user.id == 1){
            likeBtn.textContent = "UNLIKE"
        }
        else { likeBtn.textContent = "LIKE"}
    }

    bookDiv.append(img, title, subtitle, author, description, userList, likeBtn)
    showPanel.appendChild(bookDiv)

}

// if the button's text content is UNLIKE then filter the users for this book without the user id of 1
//else take the array of the users and add a hash for user id 1

function bookUsers(e, book){
    if (e.target.textContent == "UNLIKE"){
        let userArr = book.users.filter(user => user.id != 1)
        let formData = {users: userArr}
        likeBook(formData, book)
    }
    else 
    {
        let userArr = book.users 
        userArr.push({"id":1, "username":"pouros"})
        let formData = {users: userArr}
        likeBook(formData, book)
    }
}

function likeBook(formData, book){

        configObj = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(formData)
        }
    
        fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(resp => resp.json())
        .then(book => showBook(book))
    }
    
    

    




