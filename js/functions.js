function checkingSringLength(string, number) {
  return (string.length <= number) ? 'Условие выполняется ТЕРН ОП' : 'Условие не выполняется, строка больше указанной длинны ТЕРН ОП';
}

checkingSringLength('Четыре', 6);

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

CheckPalindrome('Лёша на полке клопа нашёл');
