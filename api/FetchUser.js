export const getUser = () => {
  const url = 'http://5b297ee284ce2c0014d4d17e.mockapi.io/person';
  return fetch(url2)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
};
