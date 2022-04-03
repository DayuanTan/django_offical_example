function addwords(event){
    document.getElementById("testforjs").textContent = "This is added by JS.";
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', addwords);