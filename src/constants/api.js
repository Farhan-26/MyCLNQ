const api = {
  ListingPage1: require('../API/CONTENTLISTINGPAGE-PAGE1.json'),
  ListingPage2: require('../API/CONTENTLISTINGPAGE-PAGE2.json'),
  ListingPage3: require('../API/CONTENTLISTINGPAGE-PAGE3.json'),
};

console.log(api?.ListingPage2);

export const allApiData = [
  ...api?.ListingPage1?.page?.content_items?.content,
  ...api?.ListingPage2?.page?.content_items?.content,
  ...api?.ListingPage3?.page?.content_items?.content,
];

export default api;
