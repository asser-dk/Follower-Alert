function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

function addArgumentToUrl(url, argumentName, argumentValue)
{
    if (url.indexOf('?') < 0)
    {
        return url + '?' + argumentName + '=' + encodeURIComponent(argumentValue);
    }
    else
    {
        return url + '&' + argumentName + '=' + encodeURIComponent(argumentValue);
    }
}
