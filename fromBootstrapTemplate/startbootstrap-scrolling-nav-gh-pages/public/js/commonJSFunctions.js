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

function errorAlert(errType){

    if(errType === 'loginError'){

        if(getUidFromEmail(getValue('loginEmail')) == null){
            $('body').append(`
                <div class="alert d-flex align-items-center pl-2 align-content-center alert-warning alert-dismissible fade show" role="alert">
                    <span class="font-size-lg d-block d-40 mr-2 text-center">
                        <i class="far fa-question-circle"></i>
                    </span>
                    <span>
                        <strong class="d-block">Warning!</strong> This is a warning alert—check it out!
                    </span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            `);
        }
    }
}

function redirectPage(fileName) {
    location.replace(fileName);
}

function errorAction()
