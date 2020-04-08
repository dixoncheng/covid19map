import locations from "./regions";
import { fixTypos } from "./utils";

const dateFirstCase = new Date("2020-02-26");
dateFirstCase.setHours(0);
dateFirstCase.setMinutes(0);
dateFirstCase.setSeconds(0, 0);

const processCases = ({ rawCases, excel }) => {
  // let maxCases = 0;
  let totalCasesPublished = 0;
  let countMale = 0;
  let countFemale = 0;
  let countOther = 0;
  let ages = [];
  let dailyCases = [];
  // let maxDaysDiff = 0;

  rawCases.forEach((item) => {
    if (item.location) {
      item.location = fixTypos(item.location);

      const loc = locations.find((x) => item.location === x.name);
      if (loc) {
        totalCasesPublished++;

        item.gender = normalizeGenders(item.gender);

        if (item.gender === "Male") {
          countMale++;
        } else if (item.gender === "Female") {
          countFemale++;
        } else {
          countOther++;
        }

        item.age = normalizeAges(item.age);
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

        const a = ages.find((x) => item.age === x.title);
        if (a) {
          a.numCases++;
        } else {
          if (item.age) {
            ages.push({
              title: item.age,
              numCases: 1,
              sortKey,
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

        // if (!loc.newCases) {
        //   loc.newCases = 0;
        // }
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0, 0);
        itemDate.setHours(0);

        // if (now.getTime() - itemDate.getTime() <= 86400000) {
        //   // check if date < 24 hours
        //   loc.newCases++;
        // }

        if (!loc.numCases) {
          loc.numCases = 0;
        }
        loc.numCases++;

        if (!loc.cases) {
          loc.cases = [];
        }
        loc.cases.push(item);

        // get daily cases
        const daysDiff = Math.floor(
          (itemDate - dateFirstCase) / (1000 * 60 * 60 * 24)
        );
        // maxDaysDiff = Math.max(maxDaysDiff, daysDiff);

        // ignore today because MOH may not have updated the page
        // if (itemDate.getTime() < now.getTime()) {
        //   const day = dailyCases.find(x => x.days === daysDiff);
        //   if (day) {
        //     day.cases++;
        //   } else {
        //     dailyCases.push({ days: daysDiff, cases: 1 });
        //   }
        // }

        // get daily cases per region
        if (!loc.dailyCases) {
          loc.dailyCases = [];
        }
        const day = loc.dailyCases.find((x) => x.days === itemDate.getTime());
        if (day) {
          day.cases++;
        } else {
          loc.dailyCases.push({ days: itemDate.getTime(), cases: 1 });
        }
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

  locations.forEach((item) => {
    if (item.dailyCases) {
      item.dailyCases.sort((a, b) => {
        return a.days < b.days ? -1 : 1;
      });
    }
  });

  dailyCases.sort((a, b) => {
    return a.days < b.days ? -1 : 1;
  });
  // console.log(dailyCases);

  let dailyCasesAggregate = [];
  // dailyCasesAggregate = dailyCases.map((item, i) => {
  //   return {
  //     days: item.days,
  //     cases: i > 0 ? item.cases + dailyCasesAggregate[i - 1].cases : item.cases
  //   };
  // });

  dailyCases.forEach((item, i) => {
    dailyCasesAggregate.push({
      days: item.days,
      cases: i > 0 ? item.cases + dailyCasesAggregate[i - 1].cases : item.cases,
    });
    // maxCases = Math.max(maxCases, loc.numCases);
  });

  excel = `https://www.health.govt.nz${excel}`;

  return {
    cases: locations,
    // lastUpdated,
    totalCasesPublished,
    // maxCases,
    countMale,
    countFemale,
    countOther,
    ages,
    dailyCases: dailyCasesAggregate,
    excel,
  };
};
export default processCases;

const normalizeGenders = (gender) => {
  // normalize genders
  if (gender === "M") {
    return "Male";
  }
  if (gender === "F") {
    return "Female";
  }
  if (gender === "Not provided") {
    return "";
  }
  return gender;
};

const normalizeAges = (age) => {
  // normalize ages
  // const age = parseInt(item.age);
  // if (!isNaN(age)) {
  //   item.age = `${Math.round(age / 10) * 10}s`;
  // }
  if (age === "<1" || age === "1 to 4" || age === "5 to 9") {
    return "0-9";
  }
  return age;
};
