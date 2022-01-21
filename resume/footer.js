var loc = window.location.href;
      
var linkStr = '<a href="http://validator.w3.org/check?uri=';
linkStr += loc;
linkStr += '">\n<strong> HTML </strong> Valid! </a> |';
linkStr +=' <a href="http://jigsaw.w3.org/css-validator/validator?uri='
linkStr += loc;
linkStr += '?profile=css3">\n<strong> CSS </strong> Valid! </a>'
    
var footer = document.getElementById("vLinks");
footer.innerHTML = linkStr;