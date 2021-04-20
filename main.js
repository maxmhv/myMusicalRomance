//Attaches a listener for the "Clear results"-button
document.getElementById("resultClear").onclick = function(){removeResults()};

//Add listeners for the forms/input fields
var inputs = document.getElementsByClassName("inputSearch");
for (i=0; i<inputs.length; i++){
    inputs[i].addEventListener("submit", function (ev){
        event.preventDefault();
        var inputData = ev.target.children[0].value //Saves the input value
        if (inputData == ""){
            window.alert("Try writing something first!");
        }
        else{//Logs the input, clears the input field and transfers the input value to a function
            console.log("Submitted value: "+ev.target.children[0].value);
            ev.target.children[0].value ="";
            goFetch(inputData);
        }
    })
}
//Basic fetch API, uses the saved input for the fetch
function goFetch(inputData){
    fetch("http://www.omdbapi.com/?apikey=f1ce59a3&s="+inputData)
        .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data); // Logs the fetched data
        createList(data); 
    })
}
//Creates a new table based on the fetch, and deletes previous table (if there is one)
function createList(data) {
    console.log("Logging...")
    console.log(data.Search);
    if (document.getElementById("movieList") != null){
        console.log("Previous list detected");
        removeResults(); // Does the same thing as the "Clear results"-button
        insertResults(data); //Proceeds to insert the data
    }

    else {
        console.log("Creating table...");
        insertResults(data); //Proceeds to insert the data
        
    }
        console.log("Done");
}
//Removes the existing table created with the previous fetch
function removeResults(){
    console.log("Deleting table...")
    document.getElementsByTagName("tbody")[0].innerHTML="";
    document.getElementById("movieList").children[0].remove();
    document.getElementById("movieList").remove();
    document.getElementById("listDiv").classList.toggle("hidden");
    console.log("Done");
}
//Creates a new table with the ID "movieList", and inserts the poster, title and year into cells
function insertResults(data){
    console.log("Inserting data...")
    var movieTable = document.createElement("TABLE");
    movieTable.id = "movieList";

    var searchResult = data.Search;
    for (i=0; i<searchResult.length; i++){
        console.log("Inserting row "+[i+1]+"...")
        var row = movieTable.insertRow(-1);
        var cellPoster = row.insertCell(0);
        cellPoster.innerHTML = "<img src = '"+data.Search[i].Poster+"'>";
        var cellTitle = row.insertCell(1);
        cellTitle.innerHTML = data.Search[i].Title;
        var cellYear = row.insertCell(2);
        cellYear.innerHTML = data.Search[i].Year;
    }
    var x = document.getElementById("listDiv"); 
        x.appendChild(movieTable);
        x.classList.toggle("hidden");
}