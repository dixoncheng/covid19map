const processClusters = rows => {
  // group by location
  let data = [];
  rows.forEach(row => {
    const loc = data.find(x => x.location === row.location);
    if (loc) {
      loc.totalCases += row.totalCases;
      loc.clusters.push(row);
    } else {
      data.push({
        location: row.location,
        latlng: row.latlng,
        totalCases: row.totalCases,
        clusters: [row]
      });
    }
  });
  return data;
};
export default processClusters;
