function fetchPixabey(nameImg, page) {
  const URL = 'https://pixabay.com/api/';
  const KEY = 'key=19126549-85d1f2f8405aa0462827313fa';

  return fetch(
    ` ${URL}?q=${nameImg}&page=${page}&${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Изображений по такому ключевому слову не найдены |:<`),
    );
  });
}

const api = {
  fetchPixabey,
};

export default api;
