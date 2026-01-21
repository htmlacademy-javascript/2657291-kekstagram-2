/* function checkingSringLength(string, number) {
  return (string.length <= number) ? 'Условие выполняется ТЕРН ОП' : 'Условие не выполняется, строка больше указанной длинны ТЕРН ОП';
}

checkingSringLength('Четыре', 6);

// eslint-disable-next-line no-unused-vars
function CheckPalindrome(line) {
  const result = line.replaceAll(' ', '');
  const register = result.toLowerCase();
  let emptyLine = '';

  for (let i = register.length - 1; i >= 0; i--) {
    emptyLine += register[i];
  }

  if (register === emptyLine) {
    // eslint-disable-next-line no-alert
    alert('Это палиндром');
  } else {
    // eslint-disable-next-line no-alert
    alert('Это НЕ палиндром!!!');
  }
}

CheckPalindrome('Лёша на полке клопа нашёл');*/

function timeCalculation(beginningWorkingDay, endWorkingDay, startMeeting, duration) {

  function convertMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map((part) => parseInt(part, 10) || 0);
    return hours * 60 + minutes;
  }

  beginningWorkingDay = convertMinutes(beginningWorkingDay);
  endWorkingDay = convertMinutes(endWorkingDay);
  startMeeting = convertMinutes(startMeeting);

  if (startMeeting + duration <= endWorkingDay) {
    return true;
  }
  return false;
}

timeCalculation('09:00', '8:0', '12:00', 60);
