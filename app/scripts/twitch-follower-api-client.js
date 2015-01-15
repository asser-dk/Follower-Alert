function getFollows(channelName, offset, limit, follows, newFollowsCallback)
{
    $.getJSON('https://api.twitch.tv/kraken/channels/' + encodeURIComponent(channelName) + '/follows?direction=DESC&offset=' + offset + '&limit=' + limit + '&callback=?', function (data)
    {
        if (data.follows.length > 0)
        {
            console.log('[Twitch] Fetched ' + data.follows.length + ' follows from offset ' + offset);

            data.follows.forEach(function (follow)
            {
                follows.push(follow.user._id);
            });

            if (data.follows.length == limit)
            {
                getFollows(channelName, offset + limit, limit, follows, newFollowsCallback);

            } else
            {
                console.log('[Twitch] Done fetching all follows.');
                checkForNewFollows(channelName, follows, limit, newFollowsCallback);
                setInterval(checkForNewFollows, 10000, channelName, follows, limit, newFollowsCallback);
            }
        }
    });
}

function listenForNewFollows(channelName, callbackForNewFollows)
{
    getFollows(channelName, 0, 100, [], callbackForNewFollows);
}

function checkForNewFollows(channelName, follows, limit, callbackForNewFollows)
{
    $.getJSON('https://api.twitch.tv/kraken/channels/' + encodeURIComponent(channelName) + '/follows?direction=DESC&offset=0&limit=' + limit + '&callback=?', function (data)
    {
        console.log('[Twitch] Checking for new follows.');
        if (data.follows.length > 0)
        {
            var newFollows = [];

            data.follows.forEach(function (follow)
            {
                if (follows.indexOf(follow.user._id) < 0)
                {
                    console.log('[Twitch] ' + follow.user._id + '(' + follow.user.display_name + ') is a new follower.');
                    newFollows.push({user: follow.user.display_name, provider: 'Twitch'});
                    follows.push(follow.user._id);
                }
            });

            if (newFollows.length > 0)
            {
                console.log('[Twitch] Found ' + newFollows.length + ' new follows.');
                callbackForNewFollows(newFollows);
            } else
            {
                console.log('[Twitch] No new followers.');
            }
        }
    });
}
