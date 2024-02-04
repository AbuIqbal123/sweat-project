const distributeStudyHours = (studyHours, deadline, style) => {
  // Maximum study hours per week
  const maxHoursPerWeek = 20;
  // Define a function to create an array with weeks and hours
  const createArrayWithWeeks = (distributionArray) => {
    const distributionObjects = distributionArray.map((hours, index) => ({
      week: index + 1,
      hours,
    }));

    return distributionObjects;
  };

  // If study hours fit within one week, distribute them accordingly
  if (studyHours <= maxHoursPerWeek) {
    const distribution = Array(12).fill(0);
    distribution[deadline - 1] = studyHours;

    return createArrayWithWeeks(distribution);
  }

  // If study hours exceed one week, distribute them based on the selected style
  const numWeeks = Math.ceil(studyHours / maxHoursPerWeek);
  const startWeek = deadline - numWeeks + 1;
  const distribution = Array(12).fill(0);

  if (style === "balanced") {
    // Distribute hours evenly across weeks
    const hoursPerWeek = Math.floor(studyHours / numWeeks);
    const remainingHours = studyHours % numWeeks;

    for (let i = 0; i < numWeeks; i++) {
      distribution[(startWeek + i - 1) % 12] = hoursPerWeek;
      if (i < remainingHours) {
        distribution[(startWeek + i - 1) % 12] += 1;
      }
    }
  } else if (style === "procrastinator") {
    // Distribute hours in a procrastinator style
    let distributedHours = 0;
    for (let i = startWeek + numWeeks - 1; i >= startWeek; i--) {
      const additionalHours = Math.min(
        maxHoursPerWeek,
        studyHours - distributedHours
      );
      distribution[(i - 1) % 12] += additionalHours;
      distributedHours += additionalHours;
    }
  } else if (style === "earlybird") {
    // Distribute hours in an eaarly bird style
    let distributedHours = 0;
    for (let i = startWeek; i < startWeek + numWeeks; i++) {
      const additionalHours = Math.min(
        maxHoursPerWeek,
        studyHours - distributedHours
      );
      distribution[(i - 1) % 12] += additionalHours;
      distributedHours += additionalHours;
    }
  }

  return createArrayWithWeeks(distribution);
};

module.exports = {
  distributeStudyHours,
};
