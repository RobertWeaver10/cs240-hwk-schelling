/**
 * Schelling's Model simulator
 * @author Robert Weaver
 */

//query selectors for the elements
let tableDimensions = document.querySelector('#dimension');
let simThresholdField = document.querySelector(`#threshold`); //how similar does an agent's neighbors have to be
let vacancyField = document.querySelector(`#vacantRatio`);
let popSplitField = document.querySelector(`#popRatio`);
let popXColorField = document.querySelector(`#popXcolor`);
let popYColorField = document.querySelector(`#popYcolor`);
let randButton = document.querySelector('#randomize');
let runButton = document.querySelector('#runstop');
let generationText = document.querySelector(`#generations`);

//values of the selected elements
let simThreshold = simThresholdField.value; 
let vacancy = vacancyField.value;
let popSplit = popSplitField.value;
let popXColor = popXColorField.value;
let popYColor = popYColorField.value;
let tableDimensionsVal = tableDimensions.value;
let vacantSpots = [];

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
                distTable[i][j] = "#FFFFFF";                    //store the color white
                let vacantIndex = {                             //create a new object that stores the index
                    iIndex: i,                                  //store the i index
                    jIndex: j                                   //store the j index
                }
                vacantSpots.push(vacantIndex);                  //store the object to a list of vacant spots
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
    tableDimensionsVal = tableDimensions.value;
    createTable();
});

simThresholdField.addEventListener("change", () => {
    simThreshold = simThresholdField.value;
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

vacancyField.addEventListener("change", () => {
    document.getElementById("board").innerHTML = "";
    vacancy = vacancyField.value;
    createTable();
});

popSplitField.addEventListener("change", () => {
    document.getElementById("board").innerHTML = "";
    popSplit = popSplitField.value;
    createTable();
});

randButton.addEventListener("click", () => {
    for (var i = 0; i < tableDimensions.value; i++){
        for (var j = 0; j < tableDimensions.value; j++){
            let temp = distTable[i][j];
            let rngI = Math.floor((Math.random() * tableDimensions.value))
            let rngJ = Math.floor((Math.random() * tableDimensions.value));
            distTable[i][j] = distTable[rngI][rngJ];
            distTable[rngI][rngJ] = temp;
        }
    }
    document.getElementById("board").innerHTML = "";
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
})

runButton.addEventListener("click", async () => {
    runButton.innerHTML = "Stop";
    console.log("running");
    let converged = 0;
    let generation = 0;
    let numMoves = 0;
    let coolNeighbors = 0;
    let totalNeighbors = 0;
    console.log(vacantSpots);
    
    while (converged < 1){
        generationText.innerHTML = "Generations " + generation;
        numMoves = 0;
        for (var i = 0; i < tableDimensions.value; i++){
            for (var j = 0; j < tableDimensions.value; j++){
                coolNeighbors = 0;
                totalNeighbors = 0;
                if (i-1<0 && j-1 < 0){//corner case (top left, -5 possible neighbors)
                    //console.log(`this is the top left corner`);
                    totalNeighbors = 3;
                    if (distTable[i+1][j] == distTable[i][j]){//if the neighbor is the same increment cool neighbors
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j] == `#FFFFFF`){ //if neighboring a vacant spot decrement total neighbors
                        totalNeighbors--;
                    }

                    if (distTable[i][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }

                    if (distTable[i+1][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                }
                else if (i-1<0 && j+1 == tableDimensions.value){//corner case (top right, -5 possible neighbors)
                    //console.log(`this is the top right corner`);
                    totalNeighbors = 3;
                    if (distTable[i][j-1] == distTable[i][j]){//if the neighbor is the same increment cool neighbors
                        coolNeighbors++;
                    }
                    else if (distTable[i][j-1] == `#FFFFFF`){//if neighboring a vacant spot decrement total neighbors
                        totalNeighbors--;
                    }

                    if (distTable[i+1][j] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j] == `#FFFFFF`){
                        totalNeighbors--;
                    }

                    if (distTable[i+1][j-1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j-1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                }
                else if (i+1 == tableDimensions.value && j-1 < 0){//corner case (bottom left, -5 possible neighbors)
                    //console.log(`this is the bottom left corner`);
                    totalNeighbors = 3;
                    if (distTable[i-1][j] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i-1][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                }
                else if (i+1 == tableDimensions.value && j+1 == tableDimensions.value){//corner case (bottom right, -5 pos neighbors)
                    //console.log(`this is the bottom right corner`);
                    totalNeighbors = 3;
                    if (distTable[i-1][j] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i][j-1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i][j-1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i-1][j-1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j-1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                }
                else if (i-1 < 0 || i + 1 == tableDimensions.value){//we are on an i edge (-3 possible neighbors)
                    //console.log(`this is an i edge index`);
                    totalNeighbors = 5;
                    if (i-1<0){//we are in the top row
                        if (distTable[i][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                    }
                    else{//we are in the bottom row
                        if (distTable[i][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i-1][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i-1][j] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i-1][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                    }
                }
                else if (j-1 < 0 || j+1 == tableDimensions.value){//we are on a j edge (-3 possible neighbors)
                    //console.log(`this is a j edge`);
                    totalNeighbors = 5;
                    if (j-1<0){//we are in the left most column
                        if (distTable[i-1][j] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i-1][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j+1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j+1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                    }
                    else{//we are in the right most column
                        if (distTable[i-1][j] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i-1][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i-1][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                        if (distTable[i+1][j-1] == distTable[i][j]){
                            coolNeighbors++;
                        }
                        else if (distTable[i+1][j-1] == `#FFFFFF`){
                            totalNeighbors--;
                        }
                    }
                }
                else{//if none of the other cases satisfied then it is a normal entry
                    //console.log(`this is a normal entry`);
                    totalNeighbors = 8;
                    if (distTable[i-1][j-1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j-1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i-1][j] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i-1][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i-1][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i][j-1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i][j-1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i+1][j-1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j-1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i+1][j] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                    if (distTable[i+1][j+1] == distTable[i][j]){
                        coolNeighbors++;
                    }
                    else if (distTable[i+1][j+1] == `#FFFFFF`){
                        totalNeighbors--;
                    }
                }
                
                //TODO: fix bug here to switch an unhappy entity with a vacant spot
                if ((coolNeighbors / totalNeighbors)  < simThreshold){ //move to a random vacant spot
                    numMoves++;
                    var newHome = Math.floor(Math.random() * vacantSpots.length) //get a random vacant spot
                    distTable[vacantSpots[newHome].iIndex][vacantSpots[newHome].jIndex] = distTable[i][j]; //ISSUE HERE
                    distTable[i][j] = "#FFFFFF";      //after morving the spot set the former location to vacant
                    vacantSpots[newHome].iIndex = i;  //update the index we changed so it corresponds to the right loc
                    vacantSpots[newHome].jIndex = j;

                    //TODO: want to also update and show the move in the board on the html
                }
                
            }
        }



        generation++;
        if (numMoves == 0){ //no on moved in that round
            console.log(`leaving loop`);
            converged++;
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve(); // do nothing after waiting 500 ms, just alert the calling thread
            }, 500)
        );
    }
    runButton.innerHTML = "Run";
});