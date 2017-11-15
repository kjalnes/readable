import React from 'react';


const VoteScore = ({id, updater}) => {

    const voteClick = (vote) => {
       updater(id, vote)
    }

    return (
        <div>
            <button onClick={ () => voteClick('upVote')}>Upvote</button>
            <button onClick={ () => voteClick('downVote')}>Downvote</button>
        </div>

    )
}

export default VoteScore;
