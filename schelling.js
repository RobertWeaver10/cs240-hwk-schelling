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

let tableDimensionsVal = tableDimensions.value;

/**
 * this function creates a table of the specified dimensions from the dimensions input box
 */
function createTable (){
    var distTable = new Array(tableDimensionsVal);
    for (let i = 0; i < tableDimensionsVal; i++){
        distTable[i] = new Array(tableDimensionsVal);
    }
    var vacantSpots = (tableDimensionsVal**2) * vacancy;
    var populationX = (tableDimensionsVal**2) * popSplit;
    var populationY = (tableDimensionsVal**2) - (vacantSpots + populationX);

    //loop for all columns
        //loop for all rows
            //create rng that goes 0-99
            //if (rng < vacancy * 100)
                //distTable[i][j] gets no color assignment
            //else if (rng > vacancy *100 && rng <= (vacancy+popSplit) *100)
                //distTable[i][j] gets popX color
            //else rng > (vacancy + popSplit) *100
                //distTable[i][j] gets popY color

    //create a new table
        //each row of the table gets a row of the array
        
    //append the table to the html page
}

tableDimensions.addEventListener('change', () => {
    tableDimensionsVal = tableDimensions.value;
    console.log(tableDimensionsVal);
    //createTable();
});