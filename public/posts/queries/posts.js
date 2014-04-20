'use strict';

angular.module('gambo.posts')
    .constant('PostsQueries',
    {
        ACCESS_TOKEN : window.accessToken,

        MY : [
            'SELECT ',
                'type,',
                'attachment,',
                'permalink,',
                'post_id,',
                'message,',
                'message_tags,',
                'like_info.like_count,',
                'comment_info.comment_count,',
                'share_count,',
                'claim_count,',
                '(1-like_info.like_count-comment_info.comment_count-share_count)',
            ' FROM stream',
            ' WHERE filter_key = "owner" and type in (128,247,308)',
            ' ORDER BY (1-like_info.like_count-comment_info.comment_count-share_count) '
        ].join(''),

        FRIENDS : [
            'SELECT ',
                'type,',
                'attachment,',
                'permalink,',
                'post_id,',
                'message,',
                'message_tags,',
                'like_info.like_count,',
                'comment_info.comment_count,',
                'share_count,',
                'claim_count,',
                '(1-like_info.like_count-comment_info.comment_count-share_count)',
            ' FROM stream',
            ' WHERE source_id in (SELECT gid FROM group_member WHERE uid in (SELECT uid1 from friend where uid2 = me())) and type in (128,247,308)',
            ' ORDER BY (1-like_info.like_count-comment_info.comment_count-share_count) '
        ].join(''),


        POPULAR : ''
    }
);