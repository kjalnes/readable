import React from 'react';
import PropTypes from 'prop-types';
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

VoteScore.propTypes = {
    id: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired,
    parentId: PropTypes.string
}

export default VoteScore;
