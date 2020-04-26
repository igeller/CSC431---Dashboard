var mystorage = window.sessionStorage;
function getValue(id) {
    console.log(id);
    var x = document.getElementById(id);
    if(x != null){
        console.log(x.value);
        return x.value;
    }
    return "";
}

function errorAlert(errType){
    mystorage.setItem(errType, 'y');
}

function redirectPage(fileName) {
    location.replace(fileName);
}
