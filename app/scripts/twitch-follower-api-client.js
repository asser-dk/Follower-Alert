function listenForNewTwitchFollowers(channelName, newFollowerCallback)
{
    getFollowers(channelName, 0, 100, [], newFollowerCallback);

    function getFollowers(channelName, offset, limit, followers, newFollowerCallback)
    {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + encodeURIComponent(channelName) + '/follows?direction=DESC&offset=' + offset + '&limit=' + limit + '&callback=?', function (data)
        {
            if (data.follows.length > 0)
            {
                console.log('[Twitch] Fetched ' + data.follows.length + ' followers from offset ' + offset);

                data.follows.forEach(function (follow)
                {
                    followers.push(follow.user._id);
                });

                if (data.follows.length == limit)
                {
                    getFollowers(channelName, offset + limit, limit, followers, newFollowerCallback);

                } else
                {
                    console.log('[Twitch] Done fetching all followers.');
                    checkForNewFollowers(channelName, followers, limit, newFollowerCallback);
                    setInterval(checkForNewFollowers, 10000, channelName, followers, limit, newFollowerCallback);
                }
            }
        });
    }

    function checkForNewFollowers(channelName, followers, limit, newFollowerCallback)
    {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + encodeURIComponent(channelName) + '/follows?direction=DESC&offset=0&limit=' + limit + '&callback=?', function (data)
        {
            console.log('[Twitch] Checking for new followers.');
            if (data.follows.length > 0)
            {
                var newFollower;

                for (var i = 0; i < data.follows.length; i++)
                {
                    var follower = data.follows[i];

                    if (followers.indexOf(follower.user._id) < 0)
                    {
                        console.log('[Twitch] ' + follower.user._id + ' (' + follower.user.display_name + ') is a new follower.');
                        newFollower = {user: follower.user.display_name, provider: 'Twitch'};
                        followers.push(follower.user._id);
                        break;
                    }
                }

                if (newFollower)
                {
                    console.log('[Twitch] Found a new follower.');
                    newFollowerCallback(newFollower);
                } else
                {
                    console.log('[Twitch] No new followers.');
                }
            }
        });
    }
}
