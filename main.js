//Create dynamic "on submit"-listeners for the search bars, and save the inputted value to a variable
var inputs = document.getElementsByClassName("inputSearch");
for (i=0; i<inputs.length; i++){
    inputs[i].addEventListener("submit", function (ev){
        event.preventDefault();
        if (ev.target.children[0].value == ""){
            window.alert("Write something first!");
        }
        else{
            var searchValue = ev.target.children[0].value;
            console.log("Submitted value: "+ev.target.children[0].value);
            ev.target.children[0].value ="";
        }
    })
}