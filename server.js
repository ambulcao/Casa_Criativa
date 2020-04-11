//express para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")  //exportando o db atraves do require

//const ideas = [
//    {
//        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//        title: "Cursos de Programação",
//        category: "Estudo",
//        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa autem atque est accusantium",
//        url: "http://rocketseat.com.br"
//    },
//    {
//        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//        title: "Exercícios",
//        category: "Saúde",
//        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa autem atque est accusantium",
//        url: "http://rocketseat.com.br"
//    },
//    {
//        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//        title: "Meditação",
//        category: "Mentalidade",
//        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa autem atque est accusantium",
//        url: "http://rocketseat.com.br"
//    },
//    {
//        img: "https://image.flaticon.com/icons/svg/2726/2726252.svg",
//        title: "Jogos",
//        category: "Diversao em Familia",
//        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa autem atque est accusantium",
//        url: "http://rocketseat.com.br"
//    },
//    {
//        img: "https://image.flaticon.com/icons/svg/2794/2794653.svg",
//        title: "PetShop",
//        category: "Animais",
//        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa autem atque est accusantium",
//        url: "http://rocketseat.com.br"
//    }
//]

//configurar arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuracao do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,  //boolean, nao guarda o cache.
})

//criacao da rota /
//capturar o pedido do cliente para responder
server.get("/", function (req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Ops! Erro no banco de dados.")
        }
            //mostra somente duas ideas    
            const reversedIdeas = [...rows].reverse() //variavel criado para receber um array com todos os conteudos de [...ideas] //aplicando a funcao JS reverse()

            let lastIdeas = [] //let permite mudar o valor de uma variavel
            for (let idea of reversedIdeas) { //reverse, reverte os ultimos adicionados como primeiro
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea) //adiciona no push uma nova idea
            }
        }

            return res.render("index.html", {
                ideas: lastIdeas
            }) //renderizar
    })
    
})

server.get("/ideias", function (req, res) {



    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Ops! Erro no banco de dados.")
        }
            const reversedIdeas = [...rows].reverse()
            return res.render("ideias.html", { ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    //inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    const values = [
       req.body.image,
       req.body.title,
       req.body.category,
       req.body.description,
       req.body.link,
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("Ops! Erro no banco de dados.")
        }
        //redirecionamento para a pagina de ideias
        return res.redirect("/ideias")
    })
})

server.listen(3000) // servidor ligado na porta 3000

