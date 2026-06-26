export const tours = {
  'the-mango-trail': {
    label: 'Homestay',
    title: 'The Mango Trail',
    slug: 'the-mango-trail',
    src: '/TheMangoTrial/out/index.html',
    poster: '/loopix%20homestay.png',
    projectSlug: 'homestay',
  },
  'the-odys-boutique': {
    label: 'Hotel',
    title: 'The Odys Boutique',
    slug: 'the-odys-boutique',
    src: '/TheOdysBoutiqueHotel/out/index.html',
    poster: '/loopix%20hotel.png',
    projectSlug: 'hotel',
  },
};

export function getTourBySlug(slug) {
  return tours[slug] || null;
}

export function getTourByProjectSlug(projectSlug) {
  return Object.values(tours).find((tour) => tour.projectSlug === projectSlug) || null;
}

export function getTourStaticParams() {
  return Object.keys(tours).map((slug) => ({ slug }));
}
