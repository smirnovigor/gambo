'use strict';

angular.module('gambo.posts')
    .constant('PostsQueries',
    {
        ACCESS_TOKEN : 'CAAJHtfz9wpIBAIKjQCKIZAa9SDb6iT26k87m2705dQFLZAsfAnK1EoxzKqmidd8ilFIIcCoV8u4ZB9VZC21lVawo3VQ7kmYwxJ8na325spvkgcnZCcD0VtZBuKz3pQnWt46Ii0nTRhHJIueTrEU3MlmGdov3nZA1y4HJgUf07qsalB8RB9nQsCWJyuRewQjUz2mjNnZBMQiA1AZDZD',

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
                '(like_info.like_count * comment_info.comment_count * share_count)',
            ' FROM stream',
            ' WHERE filter_key = "owner" and type in (128,247,308)',
            ' ORDER BY (like_info.like_count * comment_info.comment_count * share_count) DESC '
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
                '(like_info.like_count * comment_info.comment_count * share_count)',
            ' FROM stream',
            ' WHERE source_id in (SELECT gid FROM group_member WHERE uid in (SELECT uid1 from friend where uid2 = me())) and type in (128,247,308)',
            ' ORDER BY (like_info.like_count * comment_info.comment_count * share_count) DESC '
        ].join(''),


        POPULAR : ''
    }
);