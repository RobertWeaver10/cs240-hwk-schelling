/**
 * Schelling's Model simulator
 * @author Robert Weaver
 */

//query selectors for the elements
let tableDimensions = document.querySelector('#dimension');
let simThresholdField = document.querySelector(`#threshold`);
let vacancyField = document.querySelector(`#vacantRatio`);
let popSplitField = document.querySelector(`#popRatio`);
let popXColorField = document.querySelector(`#popXcolor`);
let popYColorField = document.querySelector(`#popYcolor`);
let randButton = document.querySelector('#randomize');
let runButton = document.querySelector('#runstop');

//values of the selected elements
let simThreshold = simThresholdField.value; 
let vacancy = vacancyField.value;
let popSplit = popSplitField.value;
let popXColor = popXColorField.value;
let popYColor = popYColorField.value;
let tableDimensionsVal = tableDimensions.value;

let distTable = new Array(tableDimensionsVal);
for (let i = 0; i < tableDimensionsVal; i++){
    distTable[i] = new Array(tableDimensionsVal);
}

/**
 * this function creates a table of the specified dimensions from the dimensions input box
 */
function createTable (){
    tableDimensionsVal = tableDimensions.value;
    distTable = new Array(tableDimensionsVal);
    for (let i = 0; i < tableDimensionsVal; i++){               //create 2d array to store the populations
        distTable[i] = new Array(tableDimensionsVal);
    }

    for (var i = 0; i < tableDimensionsVal; i++){               //for every row
        for (var j = 0; j < tableDimensionsVal; j++){           //for every column
            let rng = Math.floor((Math.random() * 100));        //get a random # between 0-99
        
            if (rng < vacancy * 100){                           //if the random number is less than just the vacancy then it is a vacant spot
                distTable[i][j] = "#FFFFFF";                    //do nothing this spot in the table will be vacant
            }
            else{                                               //else it is not a vacant spot
                let rng2 = Math.floor((Math.random() * 100));   //create a new rng
                if (rng2 < +popSplit * 100){                    //if the random number is in the range between vacancy + popsplit 
                    distTable[i][j] = popXColor;                //assign population x color
                }
                else{
                    distTable[i][j] = popYColor;                //otherwise store the population y color
                }
            }
        }
    }

    let tableNode = document.createElement('table');            //create an html table element
    for (var i = 0; i < tableDimensionsVal; i++){               //for each row in the array
        var rowNode = document.createElement('tr');             //create a new table row element
        for (var j = 0; j < tableDimensionsVal; j++){           //for each data slot in the array
            var dataNode = document.createElement('td');        //create a new table data element
            dataNode.style.backgroundColor = distTable[i][j];   //set the color of the dataNode to the appropriate color
            rowNode.appendChild(dataNode);                      //append the data to the row
        }
        tableNode.appendChild(rowNode);                         //append the row to the table
    }
    document.getElementById("board").appendChild(tableNode);    //append table to html div
}

createTable();

tableDimensions.addEventListener("change", () => {
    document.getElementById("board").innerHTML = "";
    simThreshold = document.querySelector('#threshold').value;
    vacancy = document.querySelector('#vacantRatio').value;
    popSplit = document.querySelector('#popRatio').value;
    popXColor = document.querySelector('#popXcolor').value;
    popYColor = document.querySelector('#popYcolor').value;
    createTable();
});

popXColorField.addEventListener("change", () => {
    let prevXcolor = popXColor;                              //save the previous color to check against
    popXColor = popXColorField.value;                       //grab the new color for population x

    for (var i = 0; i < tableDimensions.value; i++){        //for every row in the table
        for(var j = 0; j <tableDimensions.value; j++){      //for every data slot
            if (distTable[i][j] == prevXcolor){              //if the color saved is the same as the previous x color
                distTable[i][j] = popXColor;                //store the new color
            }                                               //otherwise do nothing
        }
    }


    let tableNode = document.createElement('table');            //create an html table element
    for (var i = 0; i < tableDimensionsVal; i++){               //for each row in the array
        var rowNode = document.createElement('tr');             //create a new table row element
        for (var j = 0; j < tableDimensionsVal; j++){           //for each data slot in the array
            var dataNode = document.createElement('td');        //create a new table data element
            dataNode.style.backgroundColor = distTable[i][j];   //set the color of the dataNode to the appropriate color
            rowNode.appendChild(dataNode);                      //append the data to the row
        }
        tableNode.appendChild(rowNode);                         //append the row to the table
    }
    document.getElementById("board").innerHTML="";
    document.getElementById("board").appendChild(tableNode);    //append table to html div
});

popYColorField.addEventListener("change", () => {
    let prevYcolor = popYColor;                              //save the previous color to check against
    popYColor = popYColorField.value;                       //grab the new color for population x

    for (var i = 0; i < tableDimensions.value; i++){        //for every row in the table
        for(var j = 0; j <tableDimensions.value; j++){      //for every data slot
            if (distTable[i][j] == prevYcolor){              //if the color saved is the same as the previous x color
                distTable[i][j] = popYColor;                //store the new color
            }                                               //otherwise do nothing
        }
    }


    let tableNode = document.createElement('table');            //create an html table element
    for (var i = 0; i < tableDimensionsVal; i++){               //for each row in the array
        var rowNode = document.createElement('tr');             //create a new table row element
        for (var j = 0; j < tableDimensionsVal; j++){           //for each data slot in the array
            var dataNode = document.createElement('td');        //create a new table data element
            dataNode.style.backgroundColor = distTable[i][j];   //set the color of the dataNode to the appropriate color
            rowNode.appendChild(dataNode);                      //append the data to the row
        }
        tableNode.appendChild(rowNode);                         //append the row to the table
    }
    document.getElementById("board").innerHTML="";
    document.getElementById("board").appendChild(tableNode);    //append table to html div
});