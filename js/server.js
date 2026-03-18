const BASE_URL = 'https://31.javascript.htmlacademy.pro';

const Route = {
  GET_DATA: '/kekstagram/data',
  SEND_DATA: '/kekstagram',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(ErrorText.GET_DATA);
    }
    return response.json();
  });

const sendData = (formData) => fetch(`${BASE_URL}${Route.SEND_DATA}`, {
  method: Method.POST,
  body: formData,
});

export { getData, sendData };
