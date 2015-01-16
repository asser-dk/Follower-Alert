function getUrlParameterValue(parameter)
{
    var url = window.location.search.substring(1);
    var urlVariables = url.split('&');

    for (var i = 0; i < urlVariables.length; i++)
    {
        var parameterName = urlVariables[i].split('=');

        if (parameterName[0] == parameter)
        {
            return decodeURIComponent(parameterName[1]);
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
