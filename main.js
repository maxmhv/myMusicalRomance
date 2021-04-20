//f1ce59a3 app key
//Create dynamic "on submit"-listeners for the search bars, and save the inputted value to a variable
var inputs = document.getElementsByClassName("inputSearch");
for (i=0; i<inputs.length; i++){
    inputs[i].addEventListener("submit", function (ev){
        event.preventDefault();
        var inputData = ev.target.children[0].value
        if (inputData == ""){
            window.alert("Write something first!");
        }
        else{
            console.log("Submitted value: "+ev.target.children[0].value);
            ev.target.children[0].value ="";
            goFetch(inputData);
        }
    })
}
/*//Add functionality to the dropdown menu
document.getElementById("dropbtn").addEventListener("click", function(){
    document.getElementById("dropdownList").classList.toggle("show");
    console.log("toimii");
})
window.onclick = function(e) {
    if (!e.target.matches('#dropbtn')){
        var x = document.getElementById("dropdownList");
        if (x.classList.contains("show")) {
            x.classList.remove("show");
            console.log("This")
        }
    }
}*/
//Fetch the data based on the input value
function goFetch(inputData){
    fetch("http://www.omdbapi.com/?apikey=f1ce59a3&s="+inputData)
        .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        createList(data);
        toggleVisible();
    })
}

function createList(data) {
    console.log("Logging...")
    console.log(data.Search[0].Title);
    if(document.getElementById("movieList") == null){
        console.log("Creating table...");
        var searchResult = data.Search;
        var movieTable = document.createElement("TABLE");
        movieTable.id = "movieList";
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
        console.log("Done");
        var x = document.getElementById("listDiv"); 
        x.appendChild(movieTable);
        x.classList.toggle("hidden");
        }
}
