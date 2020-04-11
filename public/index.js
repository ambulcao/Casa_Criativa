function onOff() {
    document
        .querySelector("#modal")
        .classList //propriedade do toogle
        .toggle("hide") //aparecer e desaparecer
    
    document   //esconde o Scroll no NovaIdeias
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document   //corrigir quando o documento eh maior e o cliente fica preso sem poder sair
        .querySelector("#modal")  //tudo que for no modal
        .classList                //em todas as classes vai aplicar  
        .toggle("addScroll")      //adicionar o Scroll (somente nele)
}

//funcao que evita o preenchimento do formulario fazio ou em branco algum campo
function checkFields(event) {
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]
    //criacao de uma variavel (isEmpty) que recebe o valor do (valuesToCheck), que vamos procurar dentro dele (funcao(.find())) que e aplicado em todos os arrays que recebe uma outra passado como parametro.  
    const isEmpty = valuesToCheck.find(function(value) {
        const checkIfIsString = typeof event.target[value].value === "string" //a palavra chave (typeof) vai procurar dentro do objeto e verifica se eh uma string
        const checkIfIsEmpty = !event.target["value"].value.trim()
        if (checkIfIsString && checkIfIsEmpty){
            return true
        }
    })
    if(isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos.")
    }
}