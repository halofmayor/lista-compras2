let listaCompras = [];
let i = 1;
let total = 0;

const texto = document.querySelector('.afazer')
const botao = document.querySelector('.butao')
const precao = document.querySelector('.preco')
const remover = [];
// Updates localStorage.
function updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(listaCompras));
    localStorage.setItem("total", total);
}


//checks localStorage if there is an item called "data" then executes the code
const savedTotal = localStorage.getItem("total");
const savedData = localStorage.getItem("data");
if (savedData) {
    listaCompras = JSON.parse(savedData);
    total = Number(savedTotal)
    render();
}

// Picks inputs value and add it to listaCompras object and save it in localStorage. (listaCompras is an array with objects inside)
function adicionar() {
    total += Number(precao.value);
    console.log(total)
    const name = texto.value;
    const preco = precao.value ? precao.value : "" ;
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
        <div>${preco} €</div>
        <button class="delete-todo js-delete">Delete</button>`;
        listaComprasHTML += html;
    }
    ))
    //Updates the html
    document.querySelector('.lista-compras')
        .innerHTML = listaComprasHTML;
    document.querySelector('.valor')
        .innerHTML = `${total} €`
    // const deleteButton = document.querySelectorAll('.js-delete'), for each delete button we add the eventListener
    document.querySelectorAll('.js-delete')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                total = total - listaCompras[index].preco
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
        precao.value = "";
    })

//Enter function
texto
    .addEventListener("keyup", event => {
        if (event.key === "Enter") {
            adicionar();
            render();
            texto.value = "";
            precao.value = "";
        }
    })










