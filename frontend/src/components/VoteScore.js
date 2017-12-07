import React from 'react';
import upvote from '../assets/images/upvote.png';
import downvote from '../assets/images/downvote.png';


const VoteScore = ({ id, updater, parentId}) => {

    const voteClick = (vote) => {
       updater(id, vote, parentId)
    }

    return (
        <span className='vote-box'>
            <button className='vote-btn' onClick={ () => voteClick('upVote')}>
                <img src={upvote} className='upvote' alt='up-vote'/>
            </button>
            <button className='vote-btn' onClick={ () => voteClick('downVote')}>
                <img src={downvote} className='downvote' alt='down-vote'/>
            </button>
        </span>
    )
}

export default VoteScore;
