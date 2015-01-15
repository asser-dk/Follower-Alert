function getFollowers(channelName, offset, limit, followers, newFollowersCallback)
{
    $.getJSON('https://api.hitbox.tv/followers/user/' + encodeURIComponent(channelName) + '?offset=' + offset + '&limit=' + limit, function (data)
    {
        if (data.followers.length > 0)
        {
            console.log('[Hitbox] Fetched ' + data.followers.length + ' followers from offset ' + offset);

            data.followers.forEach(function (follow)
            {
                followers.push(follow.user_id);
            });

            if (data.followers.length == limit)
            {
                getFollowers(channelName, (offset + limit), limit, followers, newFollowersCallback);

            } else
            {
                console.log('[Hitbox] Done fetching all follows.');
                checkForNewFollowers(channelName, followers, limit, newFollowersCallback);
                setInterval(checkForNewFollowers, 10000, channelName, followers, limit, newFollowersCallback);
            }
        }
    });
}

function listenForNewFollowers(channelName, callbackForNewFollowers)
{
    getFollowers(channelName, 0, 100, [], callbackForNewFollowers);
}

function checkForNewFollowers(channelName, followers, limit, callbackForNewFollowers)
{
    var offset = Math.floor(followers.length / limit);
    $.getJSON('https://api.hitbox.tv/followers/user/' + encodeURIComponent(channelName) + '?offset=' + offset + '&limit=' + limit, function (data)
    {
        console.log('[Hitbox] Checking for new follows.');
        if (data.followers.length > 0)
        {
            var newFollows = [];

            data.followers.forEach(function (follower)
            {
                if (followers.indexOf(follower.user_id) < 0)
                {
                    console.log('[Hitbox] ' + follower.user_id + '(' + follower.user_name + ') is a new follower.');
                    newFollows.push({user: follower.user_name, provider: 'Hitbox'});
                    followers.push(follower.user_id);
                }
            });

            if (newFollows.length > 0)
            {
                console.log('[Hitbox] Found ' + newFollows.length + ' new follows.');
                callbackForNewFollowers(newFollows);
            } else
            {
                console.log('[Hitbox] No new followers.');
            }
        }
    });
}
