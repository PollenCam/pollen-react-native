export const getGallery = () => {
  const url1 = 'http://localhost:3000/images';
  const url2 = 'http://5b297ee284ce2c0014d4d17e.mockapi.io/photos';
  return fetch(url2)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
};
