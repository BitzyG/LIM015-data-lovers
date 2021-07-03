//function Order by to order data
export const sortData = (data, sortBy, sortOrder) => {
  const order = (sortOrder === 'asc') ? 1 : -1;
  return data.sort((a, b) => (a[sortBy] > b[sortBy] ? order: (-order)));
};

export const filterDataByDirectorProducer = (data, condition) => {
  return data.filter(film => (film.director === condition || film.producer === condition));
};

export const searchDataFilms = (data, condition) => {
  return data.filter(film => (film.title.toLowerCase().indexOf(condition)!==-1));
}