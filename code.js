function solution(D) {
    // Create an array of days in the order they appear in the input dictionary
    const days = Object.keys(D).map(dateStr => new Date(dateStr).getDay());
  
    // Find the indices of days that are missing from the input dictionary
    const missingDays = [];
    for (let day = 1; day < 7; day++) {
      if (!days.includes(day)) {
        missingDays.push(day);
      }
    }
  
    // Sort the keys of the input dictionary in ascending order
    const sortedDates = Object.keys(D).sort();
  
    // Create a new dictionary to store the output
    const output = {};
  
    // Iterate over the sorted dates and calculate the sum of values for each day
    let lastSum = null;
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      const day = date.toLocaleDateString('en-US', {weekday: 'short'});
  
      // If this is the first date, set lastSum to the value of the first date
      if (lastSum === null) {
        lastSum = D[sortedDates[i]];
      }
  
      // If there are missing days between this date and the last date, calculate their mean value
      if (missingDays.length > 0) {
        const numMissingDays = missingDays.length;
        const meanValue = (D[sortedDates[i]] - lastSum) / (numMissingDays + 1);
        for (let j = 0; j < missingDays.length; j++) {
          const missingDay = missingDays[j];
          const missingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() - missingDay));
          const missingDayName = missingDate.toLocaleDateString('en-US', {weekday: 'short'});
          output[missingDayName] = Math.round(lastSum + (j + 1) * meanValue);
        }
      }
  
      // Add the value of this date to the sum for this day
      if (output[day] === undefined) {
        output[day] = D[sortedDates[i]];
      } else {
        output[day] += D[sortedDates[i]];
      }
  
      // If this is the last date, calculate the mean value of any remaining missing days
      if (i === sortedDates.length - 1 && missingDays.length > 0) {
        const numMissingDays = missingDays.length;
        const meanValue = (0 - lastSum) / (numMissingDays + 1);
        for (let j = 0; j < missingDays.length; j++) {
          const missingDay = missingDays[j];
          const missingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (missingDay - date.getDay()));
          const missingDayName = missingDate.toLocaleDateString('en-US', {weekday: 'short'});
          output[missingDayName] = Math.round(lastSum + (j + 1) * meanValue);
        }
      }
  
      // Update lastSum with the value of this date
      lastSum = D[sortedDates[i]];
    }
  
    return output;
  }