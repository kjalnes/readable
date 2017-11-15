import moment from 'moment';

const firstLetterUppercase = (string) => {
    return string.slice(0,1).toUpperCase() + string.slice(1);
}

const parseDate = (date) => {
    return moment(date).format('MMMM Do YYYY');
}

export { firstLetterUppercase, parseDate }
