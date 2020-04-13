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

    addTag("head", "link", ["src"], ["https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"]);
    addTag("head", "link", ["src"],["https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"]);
    addTag("head", "link", ["src"],["themeBootstrap/assets/vendor/perfect-scrollbar/js/perfect-scrollbar.min.js"]);
    addTag("head", "link", ["src"],["themeBootstrap/assets/vendor/stickykit/js/stickykit.min.js"]);


    //Firebase Stuff
    addTag("html", "script", ["src"], ["/__/firebase/7.13.2/firebase-app.js"])
    addTag("html", "script", ["src"], ["/__/firebase/7.13.2/firebase-analytics.js"])
    addTag("html", "script", ["src"], ["/__/firebase/init.js"])




});





