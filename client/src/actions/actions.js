
export const success = () => {
    return {
        type: ACTION_TYPES.SUCCESS
    }
}

export const failure = () => {
    return {
        type: ACTION_TYPES.FAILURE
    }
}

export const fetch_db_posts = (posts) => {
    return {
        type: ACTION_TYPES.FETCH_DB_POSTS,
        payload: posts
    }
}

export const remove_db_posts = () => {
    return {
        type: ACTION_TYPES.REMOVE_DB_POSTS
    }
}

export const fetch_post_comments = (comments) => {
    return {
        type: ACTION_TYPES.FETCH_POST_COMMENTS,
        payload: comments
    }
}

export const remove_post_comments = () => {
    return {
        type: ACTION_TYPES.REMOVE_POST_COMMENTS
    }
}