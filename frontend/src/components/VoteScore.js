import React from 'react';

const VoteScore = ({ id, updater, parentId}) => {

    const voteClick = (vote) => {
        // console.log('being clicked')
        // console.log('id', id)
        // console.log('updater', updater)
       updater(id, vote, parentId)
    }

    return (
        <span>
            <button onClick={ () => voteClick('upVote')}>Upvote</button>
            <button onClick={ () => voteClick('downVote')}>Downvote</button>
        </span>
    )
}

export default VoteScore;
