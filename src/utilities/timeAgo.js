import moment from "moment";

const timeAgo = (date) => moment(date).fromNow();

export default timeAgo;
