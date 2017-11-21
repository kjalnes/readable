import moment from 'moment';

const firstLetterUppercase = (str) => str.slice(0,1).toUpperCase() + str.slice(1);

const parseDate = (date) => moment(date).format('MMMM Do YYYY');

const sortCollection = (collection, filter) => {
    filter = filter ? filter : 'voteScore';
    return collection.sort( (elA, elB) => {
        // return filter === 'timestamp' ?
            // elA[filter] - elB[filter] :
          return  elB[filter] - elA[filter]
    })
}

export { firstLetterUppercase, parseDate, sortCollection }


