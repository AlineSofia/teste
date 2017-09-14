
// $("button.number").click(function(){
//     var digit = $(this).val();
//     $("#Results").text()= calculadora.createnumber();
// });
 
// $("button.operator").click(function(){
//     var operator = $(this).val();
// });



class operations{
    constructor(){
        $("button.number").click(function(){
            this.digit = $(this).val();
            $("#Results").text()= calculadora.createnumber();
        });
         
        $("button.operator").click(function(){
            this.operator = $(this).val();
        });
        this.primeiravariavel =[];
        //this.primeiravariavel;
        this.segundavariavel =[];
        //this.segundavariavel;
    }
    
    createnumber (){
        if ($(this).attr("data-Type")=="operator"){
            this.segundavariavel.push(this.digit);
            // this.segundavariavel += digit;
        }
        else{
            this.primeiravariavel.push(this.digit);
            // this.primeiravariavel += digit;
        };
        this.primeiravariavel.toString()+this.operator+this.segundavariavel.toString();      
    }

    deletedigit(){
        if (!this.segundavariavel.length&&!this.operator.length){
            this.primeiravariavel.pop();
        }
        if (!this.segundavariavel.length&&this.operator.length){
            this.operator="";
        }
        else {
            this.segundavariavel.pop();
        }
    }

    soma (){
        this.primeiravariavel.toString() + this.segundavariavel.toString()
        // this.primeiravariavel + this.segundavariavel

    }
    subtr (){
        this.primeiravariavel.toString()  - this.segundavariavel.toString()
        // this.primeiravariavel - this.segundavariavel 

    }
    mult (){
        this.primeiravariavel.toString()  * this.segundavariavel.toString()
        // this.primeiravariavel * this.segundavariavel 

    }
    div (){
        this.primeiravariavel.toString()  / this.segundavariavel.toString()
        // this.primeiravariavel / this.segundavariavel 

    }

};

calculadora = new operations ();

$("#igual").click(function(){
    var results = ""; 
    switch(this.operator){
        case "+":
        results = calculadora.soma();
        break;
        case "-":
        results = calculadora.subtr();
        break;
        case "":
        results = calculadora.mult();
        break;
        case"":
        results = calculadora.div();
        break;
    }
    $("#Results").text() = results;
});

$("#apagar").click(function(){
    calculadora.deletedigit();
});

