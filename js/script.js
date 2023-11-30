//CONSTANTS
const OPERATION_DEFAULT = 0;
const OPERATION_SUBTRACT = 1;
const OPERATION_ADD = 2;
const OPERATION_DIVIDE = 3;
const OPERATION_MULTIPLY = 4;



let calc_value_one = "";
let calc_value_two = "";
let calc_value_result = "";
let calc_value_operation = OPERATION_DEFAULT;

init();

function init()
{
    //Assign listeners to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', onButtonClick);
    }
    )

    //Set text
    updateScreen("0");

    return;
}

//==========
function onButtonClick(){
    switch(this.id){

        case "n1":
            updateCalcFields("1");
            break

        case "n2":
            updateCalcFields("2");
            break

        case "n3":
            updateCalcFields("3");
            break

        case "n4":
            updateCalcFields("4");
            break
        
        case "n5":
            updateCalcFields("5");
            break

        case "n6":
            updateCalcFields("6");
            break

        case "n7":
            updateCalcFields("7");
            break

        case "n8":
            updateCalcFields("8");
            break

        case "n9":
            updateCalcFields("9");
            break
        
        case "n0":
            updateCalcFields("0");
            break

        case "decimal":
            updateCalcFields(".");
            break

        case "divide":
            updateCalcFields("/");
            break;

        case "multiply":
            updateCalcFields("x");
            break;

        case "add":
            updateCalcFields("+");
            break;
        
        case "subtract":
            updateCalcFields("-");
            break;

        case "result":
            updateResult();
            break;

        case "clear":
            clearCalculator();
            break;

        case "delete":
            onDeleteButton();
            break;
    }
    return;
}

function updateResult(){
    if(calc_value_one == "31085" && calc_value_two == "")
    {
        updateScreen("POK POK!");
        return
    }
    
    if(calc_value_one == "" || calc_value_operation == OPERATION_DEFAULT || calc_value_two == "")
    {
        return
    }

    if(calc_value_one === "0" && calc_value_operation == OPERATION_DIVIDE)
    {
        clearCalculator();
        updateScreen("ERROR");
        return;
    }

    if(calc_value_two === "0" && calc_value_operation == OPERATION_DIVIDE)
    {
        clearCalculator();
        updateScreen("ERROR");
        return;
    }

    calc_value_result = calc_operation(calc_value_one, calc_value_two, calc_value_operation);
    updateScreen(calc_value_result);
    return;
}

function onDeleteButton()
{
    if(calc_value_result != "")
    {
        clearCalculator();
    }
    else if(calc_value_two != "")
    {
        calc_value_two = calc_value_two.substring(0, calc_value_two.length-1);
    }
    else if(calc_value_operation != OPERATION_DEFAULT)
    {
        calc_value_operation = OPERATION_DEFAULT;
    }
    else if(calc_value_one != "")
    {
        calc_value_one = calc_value_one.substring(0, calc_value_one.length-1);
    }
    updateScreen();
}

function clearCalculator()
{
    calc_value_one = "";
    calc_value_two = "";
    calc_value_operation = OPERATION_DEFAULT;
    calc_value_result = "";
    updateScreen();
    return;
}

function updateCalcFields(str){
    //Determines which value field is being used
    let valueSelected;
    if(calc_value_result != "")
    {
        calc_value_one = calc_value_result;
        calc_value_two = "";
        calc_value_operation = OPERATION_DEFAULT;
        calc_value_result = "";
    }
    if(calc_value_one == null || calc_value_one === "" || calc_value_one === "0")
    {
        valueSelected = 1;
    }
    else if(calc_value_operation == null || calc_value_operation === OPERATION_DEFAULT)
    {
        valueSelected = 1;
    }
    else if(calc_value_operation != 0 && calc_value_operation != OPERATION_DEFAULT)
    {
        valueSelected = 2;
    }
    else
    {
        updateScreen("ERROR");
        return;
    }
    
    //Check if string is number
    if(!isNaN(str))
    {
        if(valueSelected == 1)
        {
            if(str === "0" && calc_value_one === "")
            {
                return;
            }
            else
            {
                calc_value_one = calc_value_one+str;
            }
        }
        else if(valueSelected == 2)
        {
            if(str === "0" && calc_value_two === "0")
            {
                return;
            }
            else if (str != "0" && calc_value_two === "0")
            {
                calc_value_two = str;
            }
            else
            {
                calc_value_two = calc_value_two+str;
            }
        }
    }
    else
    {
        if(str === ".")
        {
            if(valueSelected == 1)
            {
                if(!calc_value_one.includes("."))
                {
                    calc_value_one = calc_value_one+"."
                }
            }
            else if(valueSelected == 2)
            {
                if(!calc_value_two.includes("."))
                {
                    calc_value_two = calc_value_two+"."
                }
            }
        }
        if(calc_value_one != null && calc_value_one != "")
        {
            switch(str){
                case("+"):
                    calc_value_operation = OPERATION_ADD;
                    break;
                case("-"):
                    calc_value_operation = OPERATION_SUBTRACT;
                    break;
                case("/"):
                    calc_value_operation = OPERATION_DIVIDE;
                    break;
                case("x"):
                    calc_value_operation = OPERATION_MULTIPLY;
                    break;            
            }
        }
    }
    updateScreen();
}

function updateScreen(specificText = "")
{
    const text = document.querySelector('.screenBoxText');
    if(specificText === "")
    {
        let str = "";
        if(calc_value_one == "")
        {
            str = "0";
        }
        else if(calc_value_one && calc_value_one != "0")
        {
            str = str+calc_value_one;
        }
        if(calc_value_operation != null && calc_value_operation != OPERATION_DEFAULT)
        {
            switch(calc_value_operation){
                case OPERATION_ADD:
                    str = str+" + ";
                    break;
                
                case OPERATION_SUBTRACT:
                    str = str+" - ";
                    break

                case OPERATION_MULTIPLY:
                    str = str+" X ";
                    break

                case OPERATION_DIVIDE:
                    str = str+" / ";
                    break;
            }
        }
        
        {
            str = str + calc_value_two;
        }
        text.textContent = str;
    }
    else
    {
        text.textContent = specificText;
    }
}

function calc_operation(valueOne, valueTwo, valueOperation)
{
    if(valueOperation == OPERATION_SUBTRACT)
    {
        return calc_subtract(valueOne, valueTwo);
    }
    else if(valueOperation == OPERATION_ADD)
    {
        return calc_add(valueOne, valueTwo);
    }
    else if(valueOperation == OPERATION_DIVIDE)
    {
        return calc_divide(valueOne, valueTwo);
    }
    else if(valueOperation == OPERATION_MULTIPLY)
    {
        return calc_multiply(valueOne, valueTwo);
    }
}

//Basic calculations
function calc_subtract(valueOne, valueTwo)
{
    return valueOne - valueTwo;
}

function calc_add(valueOne, valueTwo)
{
    return valueOne + valueTwo;
}

function calc_divide(valueOne, valueTwo)
{
    return valueOne / valueTwo;
}

function calc_multiply(valueOne, valueTwo)
{
    return valueOne * valueTwo;
}