function generateFollowerAlertUrl(twitchChannelName, hitboxChannelName, imageSource, soundSource, previewNotification)
{
    var url = 'http://followeralert.sexyfishhorse.com/follower-alert.htm';

    if (twitchChannelName)
    {
        url = addArgumentToUrl(url, 'twitchChannelName', twitchChannelName);
    }

    if (hitboxChannelName)
    {
        url = addArgumentToUrl(url, 'hitboxChannelName', hitboxChannelName);
    }

    if (imageSource)
    {
        url = addArgumentToUrl(url, 'imageSource', imageSource);
    }

    if (soundSource)
    {
        url = addArgumentToUrl(url, 'soundSource', soundSource);
    }

    if (previewNotification)
    {
        url = addArgumentToUrl(url, 'preview', 1);
    }

    return url;
}

function launchFollowerAlert(twitchChannelName, hitboxChannelName, imageSource, soundSource, previewNotification)
{
    window.open(generateFollowerAlertUrl(twitchChannelName, hitboxChannelName, imageSource, soundSource, previewNotification));
}
