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
