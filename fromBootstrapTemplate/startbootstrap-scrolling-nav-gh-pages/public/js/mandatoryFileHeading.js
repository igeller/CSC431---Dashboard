$(document).ready(function(){


    function addTag(parentTag, tagName, attr, val){
        const parent = document.getElementsByTagName(parentTag);
        var tag = document.createElement(tagName);
        let len = attr.length;
        var i;

        for (i = 0; i < len; i++) {
            tag.setAttribute(attr[i], val[i]);
        }
        if(i === len--){
            parent[0].appendChild(tag)
        }
    }
    //Head Stuff
    addTag("head", "meta",["charset"], ["utf-8"]);
    addTag("head", "meta",["httpEquiv", "content"], ["X-UA-Compatible", "IE=edge"]);
    addTag("head", "meta",["httpEquiv","content"], ["Content-Language", "en"]);
    addTag("head", "meta",["httpEquiv", "content"], ["Content-Type", "text/html; charset=utf-8"]);

    addTag("head", "title", [], []);
    document.title = "Dashboard";

    addTag("head", "meta",["name", "content"], ["viewport", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"])

    addTag("head", 'link', ["rel", "type", "href"], ["stylesheet", "text/css", "./css/mandatoryStylings.css"])

    addTag("head", "script", ["src", "integrity", "crossorigin"], ["https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo\n", "anonymous"]);
    addTag("head", "script", ["src", "integrity", "crossorigin"],["https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js", "sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6", "anonymous"]);



    addTag("head", "link", ["src"],["themeBootstrap/assets/vendor/perfect-scrollbar/js/perfect-scrollbar.min.js"]);
    addTag("head", "link", ["src"],["themeBootstrap/assets/vendor/stickykit/js/stickykit.min.js"]);


    // //Firebase Stuff
    // addTag("html", "script", ["src"], ["/__/firebase/7.13.2/firebase-app.js"])
    // addTag("html", "script", ["src"], ["/__/firebase/7.13.2/firebase-analytics.js"])
    // addTag("html", "script", ["src"], ["/__/firebase/init.js"])


    $("body").append(
        `<nav class="navbar navbar-expand-lg navbar-light bg-neutral-dark rounded p-3">
            <div class="container">
                <a href="index.html" class="navbar-brand align-middle text-center d-40 p-0" style="width: 88px!important;" href="#">
                    <img src="img/navBarLogo.png" class="h-100">
                </a>
                <button class="navbar-toggler is-active collapsed hamburger hamburger--elastic border-0" type="button" data-toggle="collapse" data-target="#nav-primary" aria-controls="nav-primary" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="nav-primary">
                    <ul class="navbar-nav w-100 mt-3">
                        <li class="nav-item">
                            <a class="nav-link py-0" href="">Tasks</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link py-0" href="#">Calendar</a>
                        </li>
                        <li id='settings' class="nav-item ml-auto">
                            <a class="nav-link py-0" href="settings.html"> <i class="fas fa-cog"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`
    );



});





