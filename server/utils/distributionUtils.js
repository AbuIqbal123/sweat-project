/**
 * Generate a study distribution based on the provided deadline, study hours, and maximum study hours per week.
 *
 * @param {number} deadline - The deadline week for the study distribution.
 * @param {number} studyHours - The total number of study hours.
 * @param {number} maxStudyHours - The maximum number of study hours per week.
 * @returns {Object} An object containing the early bird, moderate, and procrastinator study distributions.
 */
const generateDistribution = (deadline, studyHours, maxStudyHours) => {
  const numWeeks = 15;
  let earlyBirdDistribution = [];
  let distributionWeeks = Math.ceil(studyHours / maxStudyHours);
  let tempStudyHours = studyHours;

  for (let week = numWeeks; week >= 1; week--) {
    const hoursForWeek =
      week <= deadline
        ? distributionWeeks > 0
          ? tempStudyHours % maxStudyHours === 0
            ? maxStudyHours
            : tempStudyHours % maxStudyHours
          : 0
        : 0;

    earlyBirdDistribution.push({
      week,
      hours:
        hoursForWeek % 2 === 0 ? hoursForWeek : Number(hoursForWeek.toFixed(2)),
    });

    week <= deadline && distributionWeeks--;
    week <= deadline && (tempStudyHours = tempStudyHours - hoursForWeek);
  }

  earlyBirdDistribution = earlyBirdDistribution.reverse();

  let moderateDistribution = [];
  distributionWeeks = Math.ceil(studyHours / maxStudyHours);
  const hoursPerWeek = studyHours / distributionWeeks;

  for (let week = numWeeks; week >= 1; week--) {
    const hoursForWeek =
      week <= deadline ? (distributionWeeks > 0 ? hoursPerWeek : 0) : 0;

    moderateDistribution.push({
      week,
      hours:
        hoursForWeek % 2 === 0 ? hoursForWeek : Number(hoursForWeek.toFixed(2)),
    });

    week <= deadline && distributionWeeks--;
  }

  moderateDistribution = moderateDistribution.reverse();

  let procrastinatorDistribution = [];
  distributionWeeks = Math.ceil(studyHours / maxStudyHours);
  tempStudyHours = studyHours;

  for (let week = numWeeks; week >= 1; week--) {
    const hoursForWeek =
      week <= deadline
        ? distributionWeeks > 0
          ? tempStudyHours > maxStudyHours
            ? maxStudyHours
            : tempStudyHours
          : 0
        : 0;

    procrastinatorDistribution.push({
      week,
      hours:
        hoursForWeek % 2 === 0 ? hoursForWeek : Number(hoursForWeek.toFixed(2)),
    });

    week <= deadline && distributionWeeks--;
    week <= deadline && (tempStudyHours = tempStudyHours - hoursForWeek);
  }

  procrastinatorDistribution = procrastinatorDistribution.reverse();

  return {
    earlyBirdDistribution,
    moderateDistribution,
    procrastinatorDistribution,
  };
};

/**
 * Aggregate multiple distributions into a single distribution.
 *
 * @param {Object[]} distributions - An array of distributions to aggregate.
 * @returns {Object[]} The aggregated distribution.
 */
const aggregateDistributions = (distributions) => {
  const aggregated = {};

  distributions.forEach((distribution) => {
    // Check if distribution is an array before proceeding
    if (Array.isArray(distribution)) {
      distribution.forEach(({ week, hours }) => {
        if (!aggregated[week]) {
          aggregated[week] = 0;
        }
        aggregated[week] += hours;
      });
    } else {
      console.log("Skipping non-array distribution:", distribution);
    }
  });

  // Convert the aggregated map back into an array of { week, hours }
  return Object.keys(aggregated)
    .map((week) => ({
      week: parseInt(week),
      hours: parseFloat(aggregated[week].toFixed(2)),
    }))
    .sort((a, b) => a.week - b.week); // Ensure the distribution is sorted by week
};

module.exports = { generateDistribution, aggregateDistributions };
