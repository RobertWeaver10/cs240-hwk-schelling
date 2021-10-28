/**
 * Schelling's Model simulator
 * @author Robert Weaver
 */

//query selectors for the elements
let tableDimensions = document.querySelector('#dimension');
let simThreshold = document.querySelector('#threshold').value;
let vacancy = document.querySelector('#vacantRatio').value;
let popSplit = document.querySelector('#popRatio').value;
let popXColor = document.querySelector('#popXcolor').value;
let popYColor = document.querySelector('#popYcolor').value;
let randButton = document.querySelector('#randomize');
let runButton = document.querySelector('#runstop');

//let tableDimensionsVal = tableDimensions.value;

/**
 * this function creates a table of the specified dimensions from the dimensions input box
 */
function createTable (){
    let tableDimensionsVal = tableDimensions.value;
    var distTable = new Array(tableDimensionsVal);
    for (let i = 0; i < tableDimensionsVal; i++){
        distTable[i] = new Array(tableDimensionsVal);
    }
    var vacantSpots = Math.floor((tableDimensionsVal**2) * vacancy);
    var populationX = Math.floor((tableDimensionsVal**2) * popSplit);
    var populationY = Math.floor((tableDimensionsVal**2) - (vacantSpots + populationX));

    console.log("vacantSpots: " + vacantSpots);
    console.log("populationX: " + populationX);
    console.log("populationY: " + populationY);
    for (var i = 0; i < tableDimensionsVal; i++){   //for every row
        for (var j = 0; j < tableDimensionsVal; j++){  //for every column
            let rng = Math.floor((Math.random() * 100)); //get a random # between 0-99
            if (rng < vacancy * 100){ //if the random number is less than just the vacancy then it is a vacant spot
                //do nothing this spot in the table will be vacant
            }
            else if (rng > (vacancy * 100) && rng <= ((vacancy + popSplit) * 100)){
                distTable[i][j] = popXColor; //if the random number is in the range between vacancy + popSplit then we assign
            }                                //the population X color
            else{
                distTable[i][j] = popYColor; //otherwise store the population y color
            }
        }
    }
    let tableNode = document.createElement('table'); //create an html table element
    for (var i = 0; i < tableDimensionsVal; i++){   //for each row in the array create a new table row element
        var rowNode = document.createElement('tr');
        for (var j = 0; j < tableDimensionsVal; j++){ //for each data slot in the array create a new table data element
            var dataNode = document.createElement('td');
            dataNode.style.color = distTable[i][j]; //set the color of the dataNode to the appropriate color
            rowNode.appendChild(dataNode);  //append the data to the row
        }
        tableNode.appendChild(rowNode); //append the row to the table
    }
    document.getElementById("board").appendChild(tableNode); //append table to html div
}

createTable();
tableDimensions.addEventListener('change', () => {
    tableDimensionsVal = tableDimensions.value;
    console.log("new table dimensions: " + tableDimensionsVal);
    createTable();
});