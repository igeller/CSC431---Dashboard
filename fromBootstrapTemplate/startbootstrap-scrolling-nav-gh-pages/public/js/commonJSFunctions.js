var mystorage = window.sessionStorage;
function getValue(id) {
    console.log(id);
    var x = document.getElementById(id);
    if(x != null){
        console.log(x.value);
        return x.value;
    }
    console.log(x.value);
    return "";
}

function redirectPage(fileName) {
    location.replace(fileName);
}

