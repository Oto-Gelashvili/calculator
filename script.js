    // for adding theme styles we give class to all html elemenets and remove accordingly
    const allThemes = document.querySelectorAll("input");
    function addClassToEveryElement(className){
        const allElements = document.querySelectorAll('*');
        for(i=0;i<allElements.length;i++){
            allElements[i].classList.add(className);
        }
    };
    function removeClassToEveryElement(className){
        const allElements = document.querySelectorAll('*');
        for(i=0;i<allElements.length;i++){
            allElements[i].classList.remove(className);
        }
    }
    for(i=0;i<allThemes.length;i++){
        allThemes[i].addEventListener('change', function() {
            if(allThemes[0].checked){
                removeClassToEveryElement("third-theme");
                removeClassToEveryElement("second-theme");
            }
            else if (allThemes[1].checked) {
                addClassToEveryElement("second-theme");
                removeClassToEveryElement("third-theme");
            }else if(allThemes[2].checked){
                addClassToEveryElement("third-theme");
                removeClassToEveryElement("second-theme");
            }
        });
    };
    // calculator
    const output = document.querySelector("h2");
    const buttons = document.querySelectorAll("button");
    const operatorButtons = document.querySelectorAll(".operator");
    let outputValue = 0;
    let numOne = "";
    let dotCounter = 0;
    let operatorClicked = false;
    let numTwo = "";
    let operator = '';
    // function that calulates ouput when equal button is clicked and also updated innerHTML of ouput(h2)
    function showOutput(){
        // first  2 if statement are needed to use operators as first inputs, so  for example to get negative number at start
        if(numOne == ""){
            numOne = 0;
        }
        if(numTwo == ""){
            numTwo = 0;
        }
        if(operator == "+"){
            outputValue = parseFloat(numOne) + parseFloat(numTwo);
        }else if(operator == "-"){
            outputValue = parseFloat(numOne) - parseFloat(numTwo);
        }else if(operator == "/"){
            outputValue = parseFloat(numOne) / parseFloat(numTwo);
        }else if(operator == "x"){
            outputValue = parseFloat(numOne) * parseFloat(numTwo);
        }
        // convertion to string important for "DEL" button to work properly as it cant slice numbers only strings
        numOne = outputValue.toString();
        output.innerHTML = numOne;
    };
    function showNumOne(operator){
        output.innerHTML = numOne;
    };
    function showNumTwo(operator){
        output.innerHTML = numTwo;
    };
    for(i=0;i<buttons.length;i++){
        buttons[i].addEventListener("click",function(){
            // so we have to part of operations, before operator clicked(numOne) and after(numTwo)
            if(operatorClicked === false){
            if(!isNaN(this.innerHTML) ){
                //  we do this so string gets replaced by new one not just updated
                if(outputValue == numOne){
                    numOne = "";
                    numOne += this.textContent;
                    showNumOne();
                }else{
                    numOne += this.textContent;
                    showNumOne();
                }
            // we dont want to have more than one dot in our Number
            }else if(this.innerHTML == "." && dotCounter <1){
                dotCounter++;
                numOne += this.textContent;
                showNumOne();
            }else if(this.innerHTML == "DEL" ){
                numOne = numOne.slice(0,numOne.length-1);
                showNumOne();
            }else if(this.innerHTML == "C" ){
                output.innerHTML = 0;
                numOne = "";
                numTwo = "";
                dotCounter = 0;
                operatorClicked = false;
                operator = '';
                // we iterate over every operator button and reset  styles
                for(j=0;j<operatorButtons.length;j++){
                operatorButtons[j].style.color = "";
                operatorButtons[j].style.backgroundColor = "";
                }
                // if we click on equal before any operators it reutrs numOne and emptys it
            }else if(this.innerHTML == "=" ){
                showNumOne();
                numOne = "";
                dotCounter = 0;
                operator = '';
                for(j=0;j<operatorButtons.length;j++){
                    operatorButtons[j].style.color = "";
                    operatorButtons[j].style.backgroundColor = "";
                }

            }
            // we store this.innerHTML in operator variable and update selected buttons css
            else if(this.innerHTML == "+" || this.innerHTML == "-" || this.innerHTML == "x" || this.innerHTML == "/"){
                operator = this.innerHTML;
                this.style.backgroundColor = "#398286";
                this.style.color = "white";
                operatorClicked = true;
                dotCounter = 0;
            }
        }
        if(operatorClicked === true){
            if(!isNaN(this.innerHTML) ){
                numTwo += this.textContent;
                showNumTwo();
                }else if(this.innerHTML == "+" || this.innerHTML == "-" || this.innerHTML == "x" || this.innerHTML == "/"){
                    // we reset operator buttons and select new one
                    for(j=0;j<operatorButtons.length;j++){
                        operatorButtons[j].style.color = "";
                        operatorButtons[j].style.backgroundColor = "";
                    }
                    operator = this.innerHTML;
                    this.style.backgroundColor = "#398286";
                    this.style.color = "white";
                }else if(this.innerHTML == "." && dotCounter <1){
                    dotCounter++;
                    numTwo += this.textContent;
                    showNumTwo();
                }else if(this.innerHTML == "DEL" ){
                    numTwo = numTwo.slice(0,numTwo.length-1);
                    showNumTwo();
                }else if(this.innerHTML == "C" ){
                    output.innerHTML = 0;
                    numOne = "";
                    numTwo = "";
                    dotCounter = 0;
                    operatorClicked = false;
                    operator = '';
                    for(j=0;j<operatorButtons.length;j++){
                        operatorButtons[j].style.color = "";
                        operatorButtons[j].style.backgroundColor = "";
                        }

                }
                else if(this.innerHTML == "=" ){
                    showOutput();
                    numTwo = "";
                    dotCounter = 0;
                    operatorClicked = false;
                    operator = '';
                    for(j=0;j<operatorButtons.length;j++){
                        operatorButtons[j].style.color = "";
                        operatorButtons[j].style.backgroundColor = "";
                        }

                }
        }
        });

    };