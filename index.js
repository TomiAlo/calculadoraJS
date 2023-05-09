var runningTotal=0;
var buffer="0";
var previousOperator;

const screen=document.querySelector('.screen');

/*
    every time that the user makes click in one button
    this function executes and passes the value of the button
    as an argument
*/
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText=buffer;
}

/*
    this function executes when the user clicks in a button
    that is not a number
*/
function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer='0';
            runningTotal=0;
            break;

        case '=':
            if(previousOperator===null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator=null;
            buffer=runningTotal;
            runningTotal=0;
            break;
            
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;    
    }
}
/*
    this function executes when the user clicks in a button
    that is a mathematical operator
*/
function handleMath(symbol){
    if(buffer==='0'){
        return;
    }

    const intBuffer=parseInt(buffer);

    if(runningTotal===0){
        runningTotal=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator=symbol;
    buffer='0';
}
/*
    this function executes when the user clicks in a button
    that is = or another mathematical operator
*/
function flushOperation(intBuffer){
    if(previousOperator==='+'){
        runningTotal+=intBuffer;
    }else if(previousOperator==='-'){
        runningTotal-=intBuffer;
    }else if(previousOperator==='×'){
        runningTotal*=intBuffer;
    }else if(previousOperator==='÷'){
        runningTotal/=intBuffer;
    }
}
/*
    this function executes when the user clicks in a button
    that is a number
*/
function handleNumber(numberString){
    if(buffer==="0"){
        buffer=numberString;
    }else{
        buffer+=numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}

init();