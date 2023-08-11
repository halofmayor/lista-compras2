let listaCompras = [];
let i = 1;

const texto = document.querySelector('.afazer')
const botao = document.querySelector('.butao')
const precao = document.querySelector('.preco')
console.log(botao)
// Updates localStorage.
function updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(listaCompras));
}

//checks localStorage if there is an item called "data" then executes the code
const savedData = localStorage.getItem("data");
if (savedData) {
    listaCompras = JSON.parse(savedData);
    render();
}

// Picks inputs value and add it to listaCompras object and save it in localStorage. (listaCompras is an array with objects inside)
function adicionar() {
    console.log(precao.value)
    const name = texto.value;
    const preco = precao.value ? `${precao.value} €` : "" ;
    if (name === "" && preco === "") {
        return;
    }
    if (name === "") {
        return;
    }
    listaCompras.push({ name, preco });
    updateLocalStorage();
}


function render() {
    let listaComprasHTML = "";
    listaCompras.forEach( (todoObject => {
        const { name, preco } = todoObject;
        const html = `
        <div>${name}</div>
        <div>${preco}</div>
        <button class="delete-todo js-delete">Delete</button>`;
        listaComprasHTML += html;
    }
    ))
    //Updates the html
    document.querySelector('.lista-compras')
        .innerHTML = listaComprasHTML;
    // const deleteButton = document.querySelectorAll('.js-delete'), for each delete button we add the eventListener
    document.querySelectorAll('.js-delete')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                listaCompras.splice(index, 1);
                updateLocalStorage();
                render();
            } );
        });
}

//Add button 
botao
    .addEventListener("click", () => {
        adicionar(); 
        render();
        texto.value = "";
    })

//Enter function
texto
    .addEventListener("keyup", event => {
        if (event.key === "Enter") {
            adicionar();
            render();
            texto.value = "";
        }
    })










