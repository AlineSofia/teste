
//function verlink(){
    //Gosto++;
    //$("#counterlike").text=Gosto + " Pessoas gostaram";
    //Biblioteca.changebook();
    
//}

//function outro(){
    //$("#counterdislike").text=++NGosto + " Pessoas não gostaram";
    //Biblioteca.changebook();
//}
 
//$("button[data-Opinion]").click(function()
$("#classeNgosto,#classeGosto").click(function(){
    var opinion = $(this).attr("data-Opinion");
    biblioteca.livro.addopinion(opinion);
    biblioteca.changebook();
});

class livro{
    constructor(titulo,descricao,imagem,link){
        //this.bgimagem = bgimagem;
        this.titulo = titulo;
        this.descricao = descricao;
        if (imagem != "undefined"){this.imagem=imagem}
        else {this.imagem=""};
        this.link = link;
    }

    addopinion(opinion){
        this.opinion = opinion;
    }
}

class Biblioteca{
    constructor(){
        this.livros = [];
        var livrodata = this.livrodata;
        this.livrosvistos = [];
        this.livro;
    }
    addbook(livro){
        this.livros.push(livro);
    }
    changebook(){
        var livroanterior = this.livros.shift();
        this.livrosvistos.push(livroanterior);
        if (this.livros.length){
            this.loadbook();
        }
        else {
            $("#final").show();
            this.loadresults();
            $("#biblioteca").hide();
        }
    }
    loadbook(){
        this.livro = this.livros[0];
        //$('#livro').css("background-image","url("+this.livro.bgimagem+")");
        $('#livro img').attr("src",this.livro.imagem);
        $('#livro h1').text(this.livro.titulo);
        $('#livro p').text(this.livro.descricao);
        $('#wook').attr("href",this.livro.link);
    }

    loadresults (){
        for (var i = 0; i < this.livrosvistos.length; i++){
            this.livrosvistos[i];
            var html = `
            <tr> 
                <td> ` + this.livrosvistos[i].titulo +` </td>
                <td> ` + this.livrosvistos[i].opinion +` </td>
            </tr>`;
            $("#Resultados tbody").append(html);
        }

    }
}

var biblioteca = new Biblioteca();

// var livro1 = new livro("https://static.fnac-static.com/multimedia/Images/PT/NR/12/a2/0d/893458/1540-1/tsp20160819064838/Torre-de-Belem.jpg","Torre de belem","bla bla bla bla bla","https://static.fnac-static.com/multimedia/Images/PT/NR/12/a2/0d/893458/1540-1/tsp20160819064838/Torre-de-Belem.jpg",{linkwook:{link: "https://www.wook.pt/livro/seis-ruas-de-inspiracao-jorge-pincoruja/17599064",texto:"Wook"}},{linkfnac:{link:"https://www.fnac.pt/Seis-Ruas-de-Inspiracao-Jorge-Pincoruja/a957180?omnsearchpos=4",texto:"Fnac"}});

// var livro2 = new livro("https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg","Mercado de Inverno","bla bla bla bla bla","https://static.fnac-static.com/multimedia/Images/PT/NR/7e/e1/0d/909694/1540-1/tsp20160819033009/Mercado-de-Inverno.jpg",{linkwook:{link: "https://www.wook.pt/livro/mercado-de-inverno-philip-kerr/16728563",texto:"Wook"}},{linkfnac:{link: "https://www.fnac.pt/Mercado-de-Inverno-Philip-Kerr/a917821?omnsearchpos=2",texto:"Fnac"}});

// var livro3 = new livro("https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg","Seis Ruas de Inspiracão","bla bla bla bla bla","https://static.fnac-static.com/multimedia/Images/PT/NR/3d/78/0e/948285/1540-1/tsp20160818124625/Seis-Ruas-de-Inspiracao.jpg",{linkwook:{link: "https://www.wook.pt/livro/seis-ruas-de-inspiracao-jorge-pincoruja/17599064",texto:"Wook"}},{linkfnac:{link:"https://www.fnac.pt/Seis-Ruas-de-Inspiracao-Jorge-Pincoruja/a957180?omnsearchpos=4",texto:"Fnac"}});

// biblioteca.addbook(livro1);
// biblioteca.addbook(livro2);
// biblioteca.addbook(livro3);

// biblioteca.loadbook();

function getDataFromGoogle(){
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=harrypotter&key=AIzaSyDRlJkV6r_mlDoU-Um0kvBlQmMuwmLrhhw",
      }).done(function(data) {
        $.each(data.items,function(index,livroharry){
            var livroharry = new livro(livroharry.volumeInfo.title,livroharry.volumeInfo.description,livroharry.volumeInfo.imageLinks.thumbnail,livroharry.volumeInfo.infoLink);
            biblioteca.addbook(livroharry);
        });
        biblioteca.loadbook();
      })    
};
getDataFromGoogle();

$("#Pesquisar").click(function(){
    var keywords = $("#InputSearch").val();
    //var selectedoption = $("#selection").val();
    var urlpesq = "harrrypotter";
     switch ($("#selection").val()){
        case "Pesquisar":
        urlpesq="";
        break;
        case "Titulo":
        urlpesq="intitle:";
        break;
        case "Autor":
        urlpesq="inauthor:";
        break;
        case "Categoria":
        urlpesq="subject:";
        break;         
     }
    if (keywords.length > 3){
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + urlpesq + keywords,
        }).done(function(data) {
            biblioteca.livros=[];
            $.each(data.items,function(index,livrodata){
                var livrodata = new livro(livrodata.volumeInfo.title,livrodata.volumeInfo.description,livrodata.volumeInfo.imageLinks.thumbnail,livrodata.volumeInfo.infoLink);
                biblioteca.addbook(livrodata);
            });
            biblioteca.loadbook();
          })    
        }
});


// $("#buttontitle").click(function(){
//     var keywords = $("#InputSearch").val();
//     if (keywords.length > 3){
//         $.ajax({
//              url: "https://www.googleapis.com/books/v1/volumes?q=intitle:" + keywords,
//         }).done(function(data) {
//                 $.each(data.items,function(index,livrodata){
//                     var livrodata = new livro(livrodata.volumeInfo.title,livrodata.volumeInfo.description,livrodata.volumeInfo.imageLinks.thumbnail,livrodata.volumeInfo.infoLink);
//                     biblioteca.addbook(livrodata);
//                 });
//                 biblioteca.loadbook();
//               })    
//         }
// });

// $("#buttonauthor").click(function(){
//     var keywords = $("#InputSearch").val();
//     if (keywords.length > 3){
//         $.ajax({
//              url: "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + keywords,
//         }).done(function(data) {
//                 $.each(data.items,function(index,livrodata){
//                     var livrodata = new livro(livrodata.volumeInfo.title,livrodata.volumeInfo.description,livrodata.volumeInfo.imageLinks.thumbnail,livrodata.volumeInfo.infoLink);
//                     biblioteca.addbook(livrodata);
//                 });
//                 biblioteca.loadbook();
//               })    
//         }
// });

// $("#buttongener").click(function(){
//     var keywords = $("#InputSearch").val();
//     if (keywords.length > 3){
//         $.ajax({
//              url: "https://www.googleapis.com/books/v1/volumes?q=insubject:" + keywords,
//         }).done(function(data) {
//                 $.each(data.items,function(index,livrodata){
//                     var livrodata = new livro(livrodata.volumeInfo.title,livrodata.volumeInfo.description,livrodata.volumeInfo.imageLinks.thumbnail,livrodata.volumeInfo.infoLink);
//                     biblioteca.addbook(livrodata);
//                 });
//                 biblioteca.loadbook();
//               })    
//         }
// });