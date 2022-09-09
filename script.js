/*== LISTA ==*/
const inputElement  = document.querySelector('.new-list-input');
const addListButton = document.querySelector('.new-list-button');
const listContainer = document.querySelector('.list-container');

// Valida Input
const validateInput = () => inputElement.value.trim().length > 0;

// Inclui lista
const handleAddList = () => {
    const inputIsValid = validateInput();

    /*== Verifica se o input é valido ==*/
    if (!inputIsValid){
        return inputElement.classList.add("error");
    }

    var listItemContainer = document.createElement("ul");
    listItemContainer.classList.add("list-item");

    const listContent = document.createElement("p");
    listContent.innerText = inputElement.value;
    listContent.style.fontWeight = "bold";

    const plusItem = document.createElement("i");
    plusItem.classList.add("fa-solid");
    plusItem.classList.add("fa-plus");

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    const completedList = document.createElement("i");
    completedList.classList.add("fa-solid");
    completedList.classList.add("fa-check"); 

    const showList = document.createElement("i");
    showList.classList.add("fa-solid");
    showList.classList.add("fa-caret-down");

    const alignButtons = document.createElement("div");
    alignButtons.classList.add("alignButtons");
    alignButtons.appendChild(showList);
    alignButtons.appendChild(completedList);
    alignButtons.appendChild(deleteItem);
    alignButtons.appendChild(plusItem);

    completedList.addEventListener("click", () => handleClick(listContent));

    deleteItem.addEventListener("click", () => handleDeleteClick(listItemContainer, listContent));

    listItemContainer.appendChild(listContent);
    listItemContainer.appendChild(alignButtons);
    
    listContainer.appendChild(listItemContainer);

    /*== Abre os campos de informação do item  ==*/
    plusItem.addEventListener("click", () =>{

        alignButtons.removeChild(plusItem);

        const closeItem = document.createElement("i");
        closeItem.classList.add("fa-solid");
        closeItem.classList.add("fa-xmark"); 

        alignButtons.appendChild(closeItem);

        const InputItem       = document.createElement("input");
        const InputValItem    = document.createElement("input");
        const InputQuantlItem = document.createElement("input");
    
        const addListItem = document.createElement("button");
        const cancelListItem = document.createElement("button");
        var verificaListItem = listItemContainer.querySelector(".new-list-item");

        if(verificaListItem == null){
            InputItem.classList.add("new-list-item");
            InputItem.placeholder = "Insira um Item...";
    
            InputQuantlItem.classList.add("item-quant");
            InputQuantlItem.placeholder = "Quantidade";
    
            InputValItem.classList.add("item-val");
            InputValItem.placeholder = "Valor...";
    
            addListItem.innerText = "Adicionar";
            addListItem.classList.add("new-button-item");
    
            cancelListItem.innerText = "Cancelar";
            cancelListItem.classList.add("cancel-button-item");
    
            listItemContainer.appendChild(InputItem);
            listItemContainer.appendChild(InputQuantlItem);
            listItemContainer.appendChild(InputValItem);
            listItemContainer.appendChild(addListItem);

            /*==  Fecha opção de incluir item==*/
            closeItem.addEventListener("click", () =>{
                alignButtons.removeChild(closeItem);
                alignButtons.appendChild(plusItem);

                listItemContainer.removeChild(InputItem);
                listItemContainer.removeChild(InputQuantlItem);
                listItemContainer.removeChild(InputValItem);
                listItemContainer.removeChild(addListItem);
            });
   
            /*== Adiciona itens a lista ==*/
            addListItem.addEventListener("click", () =>{
                const liItem     = document.createElement("li");
                const pLi        = document.createElement("span");
                const itemVal    = document.createElement("span");
                const itemQuant  = document.createElement("span");
                const menuPoints = document.createElement("i");
        
                pLi.innerText = InputItem.value;
                itemVal.innerText = "R$" + (parseFloat(InputValItem.value) * 
                                            parseFloat(InputQuantlItem.value));
                itemVal.classList.add("itemVal");
    
                itemQuant.innerText = InputQuantlItem.value;
                itemQuant.classList.add("itemQuant");
    
                menuPoints.classList.add("fa-solid");
                menuPoints.classList.add("fa-ellipsis-vertical");
    
                var alignMenuLi = document.createElement("div");
                alignMenuLi.classList.add("menuLi");
    
                const deleteOption = document.createElement("i");
                deleteOption.classList.add("far");
                deleteOption.classList.add("fa-trash-alt");
    
                const completedOption = document.createElement("i");
                completedOption.classList.add("fa-solid");
                completedOption.classList.add("fa-check");
    
                const editOption = document.createElement("i");
                editOption.classList.add("fa-solid");
                editOption.classList.add("fa-pen");

                /*editOption.addEventListener("click", () => editClick(pLi, liItem));*/
    
                alignMenuLi.appendChild(completedOption);
                alignMenuLi.appendChild(editOption);
                alignMenuLi.appendChild(deleteOption);
                alignMenuLi.appendChild(menuPoints);
    
                liItem.appendChild(alignMenuLi);
    
                menuPoints.addEventListener("click", () =>{     
                    alignMenuLi.style.width = "150px";
    
                    alignMenuLi.classList.toggle("mudaMenuLi");
                });
    
                var dataItems = document.createElement("div");
                dataItems.classList.add("dataItems")
    
                dataItems.appendChild(pLi)
                dataItems.appendChild(itemQuant);
                dataItems.appendChild(itemVal);
    
    
                liItem.appendChild(dataItems);
                listItemContainer.appendChild(liItem);
    
                plusItem.classList.remove("disabled");
    
                /*updateLocalStorage();*/
    
                showList.addEventListener("click", () =>{
                    mostraLi(liItem);
                })
            })   
        }

    });

    inputElement.value = "";

    updateLocalStorage();
};

function mostraLi(li){
    let itens = li;
        
    itens.classList.toggle("mostraLi");
}

// Deleta a lista
const handleDeleteClick = (listItemContainer, listContent) =>{
    const lists = listContainer.childNodes;

    for (const list of lists){
        const currentListIsBeingClicked = list.firstChild.isSameNode(listContent);

        if (currentListIsBeingClicked) {
            listItemContainer.remove();
        }
    }

    /*updateLocalStorage();*/
};

const handleClick = (listContent) => {
    /*=== Pega os filhos da div ===*/
    const lists = listContainer.childNodes;

    for (const list of lists){
        /*=== Verifica se o registro corrente é o mesmo que foi passado ===*/
        const currentListIsBeingClicked = list.firstChild.isSameNode(listContent);
        if (currentListIsBeingClicked) {
            list.firstChild.classList.toggle("completed");
        }
    }
    
    /*updateLocalStorage();*/
};

// Atualiza o localStorage
const updateLocalStorage = () => {
    const lists = listContainer.childNodes;

    const localStorageLists = [...lists].map(list => {
        const content = list.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted};
    });
    localStorage.setItem("lists", JSON.stringify(localStorageLists));
}

// Mantém os dados após refreseh
const refreshListUsingLocalStorage = () => {
    const listsFromLocalStorage = JSON.parse(localStorage.getItem("lists"))

    if (!listsFromLocalStorage) return;

    for (const list of listsFromLocalStorage) {
        var listItemContainer = document.createElement("ul");
    
        listItemContainer.classList.add("list-item");

        const listContent = document.createElement("p");
        listContent.innerText = list.description;

        if (list.isCompleted){
            listContent.classList.add('completed');
        }

        listContent.addEventListener("click", () => handleClick(listContent));

        var plusItem = document.createElement("i");
        plusItem.classList.add("fa-solid");
        plusItem.classList.add("fa-plus");

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");

        const alignButtons = document.createElement("div");
        alignButtons.classList.add("alignButtons");
        alignButtons.appendChild(deleteItem);
        alignButtons.appendChild(plusItem);


        deleteItem.addEventListener("click", () => handleDeleteClick(listItemContainer, listContent));

        listItemContainer.appendChild(listContent);
        listItemContainer.appendChild(alignButtons);

        /*listItemContainer.appendChild(plusItem);
        listItemContainer.appendChild(deleteItem);*/
    
        listContainer.appendChild(listItemContainer);

        // Qunado insere o nome da lista o registro "se perde"
        plusItem.addEventListener("click", () =>{
            //const addItem = document.querySelector(".newItem");
            /*const nomeListaItem = document.querySelector(".nomeListaItem");
            nomeListaItem.innerHTML = list.description;*/

            const InputItem = document.createElement("input");
            InputItem.classList.add(".new-list-item");

            //addItem.style.display = 'block';

            addListItem.addEventListener("click", () =>{
                const liItem = document.createElement("li");
                const pLi    = document.createElement("p");

                console.log(listItemContainer);
                pLi.innerText = InputItem.value;
                console.log(pLi);
                liItem.appendChild(pLi)
                listItemContainer.appendChild(liItem);
                console.log(liItem);
            })
        });
    }
}

// Remove erro caso digite novamente
const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const editClick = (item, li) => {
    var editNome = item;
    var addButtom = li;

    var saveEdit = document.createElement("buttom");
    saveEdit.innerText = "Salvar";
    saveEdit.classList.add("saveEdit");

    addButtom.appendChild(saveEdit);

    editNome.contentEditable= "true";
    editNome.classList.add("editItem");
    
}

// Mantém os dados após o refresh
/*refreshListUsingLocalStorage();*/

// Inclui lista
addListButton.addEventListener("click", () => handleAddList());


//addListItem.addEventListener("click", () => handleAddIten());

// Remove erro após começar a digitar
inputElement.addEventListener("change", () => handleInputChange());