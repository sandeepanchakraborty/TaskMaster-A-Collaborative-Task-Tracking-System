import moment from "moment";

export const compareDates = (completionDate, deadline) => {
  const completion = moment.utc(completionDate).local();
  const deadlineDate = moment.utc(deadline).local();

  const formattedCompletion = completion.format("DD MMMM YYYY");
  const formattedDeadline = deadlineDate.format("DD MMMM YYYY");

  const isLate = completion.isAfter(deadlineDate);
  const duration = moment.duration(completion.diff(deadlineDate));

  let timeDifference;
  if (Math.abs(duration.years()) > 0) {
    timeDifference = `[${Math.abs(duration.years())}] year`;
  } else if (Math.abs(duration.months()) > 0) {
    timeDifference = `[${Math.abs(duration.months())}] month`;
  } else if (Math.abs(duration.days()) > 0) {
    timeDifference = `[${Math.abs(duration.days())}] day`;
  } else if (Math.abs(duration.hours()) > 0) {
    timeDifference = `[${Math.abs(duration.hours())}] hr`;
  } else {
    timeDifference = `[${Math.abs(duration.minutes())}] min`;
  }

  return isLate
    ? `Completion: ${formattedCompletion}, Deadline: ${formattedDeadline}/n`
    : `Completion: ${formattedCompletion}, Deadline: ${formattedDeadline}`;
  // return isLate
  // ? `Completed after the deadline by ${timeDifference} Completion: ${formattedCompletion}, Deadline: ${formattedDeadline}`
  // : `Completed before the deadline by ${timeDifference} Completion: ${formattedCompletion}, Deadline: ${formattedDeadline}`;
};
