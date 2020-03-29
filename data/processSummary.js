const processSummary = data => {
  const { rows, lastUpdated } = data;
  rows.sort((a, b) => {
    if (a.totalCases === b.totalCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.totalCases > b.totalCases ? -1 : 1;
  });

  return {
    locations: rows,
    lastUpdated
  };
};
export default processSummary;
