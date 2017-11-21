import React from 'react';


const VoteScore = ({ id, updater, parentId}) => {

    const voteClick = (vote) => {
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
