import moment from "moment";

export const formatDateTime = (dateTime) => {
  const now = moment().startOf("day");
  const deadline = moment(dateTime).startOf("day");

  const deadlineFormatted = `Deadline: ${deadline.format("DD MMMM YYYY")}`;

  if (deadline.isBefore(now)) {
    return `${deadlineFormatted}, Deadline Passed`;
  }

  if (deadline.isSame(now)) {
    return `${deadlineFormatted}, Today is the deadline`;
  }

  const diffDays = deadline.diff(now, "days");
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = deadline.diff(now, "months");
  const diffYears = deadline.diff(now, "years");

  let remainingTime = "";

  if (diffYears >= 1) {
    remainingTime = diffYears === 1 ? "1 year" : `${diffYears} years`;
  } else if (diffMonths >= 1) {
    remainingTime = diffMonths === 1 ? "1 month" : `${diffMonths} months`;
  } else if (diffWeeks >= 1) {
    remainingTime = diffWeeks === 1 ? "1 week" : `${diffWeeks} weeks`;
  } else {
    remainingTime = diffDays === 1 ? "1 day" : `${diffDays} days`;
  }

  return `${deadlineFormatted}, you left: ${remainingTime}`;
};
