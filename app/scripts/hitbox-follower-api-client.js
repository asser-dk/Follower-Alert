function listenForNewHitboxFollowers(channelName, newFollowerCallback)
{
    getFollowers(channelName, 0, 100, [], newFollowerCallback);

    function getFollowers(channelName, offset, limit, followers, newFollowerCallback)
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
                    getFollowers(channelName, (offset + limit), limit, followers, newFollowerCallback);

                } else
                {
                    console.log('[Hitbox] Done fetching all follows.');
                    checkForNewFollowers(channelName, followers, limit, newFollowerCallback);
                    setInterval(checkForNewFollowers, 10000, channelName, followers, limit, newFollowerCallback);
                }
            }
        });
    }

    function checkForNewFollowers(channelName, followers, limit, newFollowerCallback)
    {
        var offset = 0;
        if (followers.length > limit / 2)
        {
            offset = Math.floor(followers.length / limit) - limit / 2;
        }

        $.getJSON('https://api.hitbox.tv/followers/user/' + encodeURIComponent(channelName) + '?offset=' + offset + '&limit=' + limit, function (data)
        {
            console.log('[Hitbox] Checking for new follows.');
            if (data.followers.length > 0)
            {
                var newFollower;

                for(var i = 0; i < data.followers.length; i++)
                {
                    var follower = data.followers[i];

                    if (followers.indexOf(follower.user_id) < 0)
                    {
                        console.log('[Hitbox] ' + follower.user_id + ' (' + follower.user_name + ') is a new follower.');
                        newFollower = {user: follower.user_name, provider: 'Hitbox'};
                        followers.push(follower.user_id);
                        break;
                    }
                }

                if (newFollower)
                {
                    console.log('[Hitbox] Found a new follower.');
                    newFollowerCallback(newFollower);
                } else
                {
                    console.log('[Hitbox] No new followers.');
                }
            }
        });
    }
}
