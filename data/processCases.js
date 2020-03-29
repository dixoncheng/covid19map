import locations from "./regions";

const processCases = rawCases => {
  let maxCases = 0;
  // let cases = [];
  let totalCasesPublished = 0;
  let countMale = 0;
  let countFemale = 0;
  let countOther = 0;
  let ages = [];

  rawCases.forEach(item => {
    if (item.location) {
      // correct typos on MOH site
      if (item.location === "Coramandel") {
        item.location = "Coromandel";
      }
      if (item.location === "Dundedin") {
        item.location = "Dunedin";
      }
      if (item.location === "Hawkes Bay") {
        item.location = "Hawke's Bay";
      }
      if (item.location === "Hawke’s Bay") {
        item.location = "Hawke's Bay";
      }
      if (item.location === "Hawkes’s Bay") {
        item.location = "Hawke's Bay";
      }
      if (item.location === "Capital & Coast") {
        item.location = "Capital and Coast";
      }
      if (item.location === "Nelson-Marlborough") {
        item.location = "Nelson Marlborough";
      }
      if (item.location === "Southern DHB") {
        item.location = "Southern";
      }
      if (item.location === "Tairawhiti") {
        item.location = "Tairāwhiti";
      }

      const loc = locations.find(x => item.location === x.name);
      if (loc) {
        totalCasesPublished++;

        // normalize genders
        if (item.gender === "M") {
          item.gender = "Male";
        }
        if (item.gender === "F") {
          item.gender = "Female";
        }
        if (item.gender === "Not provided") {
          item.gender = "";
        }

        if (item.gender === "Male") {
          countMale++;
        } else if (item.gender === "Female") {
          countFemale++;
        } else {
          countOther++;
        }

        // normalize ages
        // const age = parseInt(item.age);
        // if (!isNaN(age)) {
        //   item.age = `${Math.round(age / 10) * 10}s`;
        // }
        if (
          item.age === "<1" ||
          item.age === "1 to 4" ||
          item.age === "5 to 9"
        ) {
          item.age = "0-9";
        }

        let sortKey;
        if (item.age === "<1") {
          sortKey = 0;
          // } else if (item.age === "Teens") {
          //   sortKey = 1;
          // }
          // else if (item.age === "") {
          //   sortKey = 100;
          //   item.age = "TBC";
        } else {
          sortKey = parseInt(item.age);
        }

        const a = ages.find(x => item.age === x.title);
        if (a) {
          a.numCases++;
        } else {
          if (item.age) {
            ages.push({
              title: item.age,
              numCases: 1,
              sortKey
            });
          }
        }

        // cases in last 24 hours
        // convert item.date to real date
        const dateArray = item.date.split("/");
        const itemDate = new Date(
          `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
        );

        const now = new Date();

        if (!loc.newCases) {
          loc.newCases = 0;
        }
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0, 0);
        itemDate.setHours(0);

        // check if date < 24 hours
        if (now.getTime() - itemDate.getTime() <= 86400000) {
          loc.newCases++;
        }

        if (!loc.numCases) {
          loc.numCases = 0;
        }
        loc.numCases++;

        if (!loc.cases) {
          loc.cases = [];
        }
        loc.cases.push(item);
        maxCases = Math.max(maxCases, loc.numCases);
      } else {
        if (item.loc !== "TBC") {
          // region doesn't exist in constants
          throw new Error(`No location "${item.location}" exist`);
        }
      }
    }
  });

  ages.sort((a, b) => {
    return a.sortKey < b.sortKey ? -1 : 1;
  });

  locations.sort((a, b) => {
    if (a.numCases === b.numCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.numCases > b.numCases ? -1 : 1;
  });

  return {
    cases: locations,
    // lastUpdated,
    totalCasesPublished,
    maxCases,
    countMale,
    countFemale,
    countOther,
    ages
  };
};
export default processCases;
