const birthDate = document.querySelector("#date-input");
const showBtn = document.querySelector("#show-btn");
const resultMsg = document.querySelector("#result-msg");

function reverseString(str) {
  let listOfChars = str.split("");

  let reversedList = listOfChars.reverse();

  let reversedStr = reversedList.join("");
  return reversedStr;
}

function isPalindrome(str) {
  return str === reverseString(str);
}

function getDateAsString(date) {
  let dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDatedFormats(date) {
  let dateStr = getDateAsString(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDatedFormats(date) {
  let allFormatList = getAllDatedFormats(date);

  let flag = false;

  for (let i = 0; i < allFormatList.length; i++) {
    if (isPalindrome(allFormatList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindromeForAllDatedFormats(nextDate);

    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  let counter = 0;
  let previousDate = getPreviousDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindromeForAllDatedFormats(previousDate);

    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [counter, previousDate];
}

// let date = {
//   day: 21,
//   month: 02,
//   year: 2002,
// };
// console.log(getAllDatedFormats(date));
// console.log(getDateAsString(date));
// console.log(checkPalindromeForAllDatedFormats(date));
// console.log(getNextPalindromeDate(date));
// console.log(getPreviousPalindromeDate(date));
// console.log(getDateAsString(date));

function clickHandler(e) {
  let bdayStr = birthDate.value;

  if (bdayStr !== "") {
    let dateList = bdayStr.split("-");

    let date = {
      day: Number(dateList[2]),
      month: Number(dateList[1]),
      year: Number(dateList[0]),
    };

    let isPalindrome = checkPalindromeForAllDatedFormats(date);

    if (isPalindrome) {
      resultMsg.innerText = "Your Birthday is a Palindrome. 💁🏻‍♂️";
    } else {
      if (
        getNextPalindromeDate(date)[0] <= getPreviousPalindromeDate(date)[0]
      ) {
        var [counter, nextDate] = getNextPalindromeDate(date);
        resultMsg.innerText = `Your Birthday is not Palindromic. The nearest palindromic date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days.`;
      } else {
        var [counter, nextDate] = getPreviousPalindromeDate(date);
        resultMsg.innerText = `Your Birthday is not Palindromic. The nearest palindromic date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days.`;
      }
    }
  }
}

showBtn.addEventListener("click", clickHandler);
