import { searchDataFilms, sortData, filterDataByDirectorProducer } from '../src/data.js';

describe('search by film test', () => {
  it('is a function', () => {
    expect(typeof searchDataFilms).toBe('function');
  });

  it('should return the search result for the title search castle', () => {
    const data = [
      {
        "title": "Kiki's Delivery Service",
        "director": "Hayao Miyazaki",
        "producer": "Hayao Miyazaki",
      },
      {
        "title": "Castle in the Sky",
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      },
      {
        "title": "Only Yesterday",
        "director": "Isao Takahata",
        "producer": "Toshio Suzuki",
      }
    ];
    const condition = 'castle';
    const result = [
      {
        "title": "Castle in the Sky",
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      }
    ];
    expect(searchDataFilms(data,condition)).toEqual(result);
  });
});

describe('filter by director or producer test', () => {
  it('is a function', () => {
    expect(typeof filterDataByDirectorProducer).toBe('function');
  });

  it('should return the result to director and producer Hayao Miyazaki.', () => {
    const data = [
      {
        "title": "Kiki's Delivery Service",
        "director": "Hayao Miyazaki",
        "producer": "Hayao Miyazaki",
      },
      {
        "title": "Castle in the Sky",
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      },
      {
        "title": "Only Yesterday",
        "director": "Isao Takahata",
        "producer": "Toshio Suzuki",
      }
    ];
    const condition = 'Hayao Miyazaki';
    const result = [
      {
        "title": "Kiki's Delivery Service",
        "director": "Hayao Miyazaki",
        "producer": "Hayao Miyazaki",
      },
      {
        "title": "Castle in the Sky",
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      }
    ];
    expect(filterDataByDirectorProducer(data,condition)).toEqual(result);
  });
});

describe('orderBy test', () => {
  it('is a function', () => {
    expect(typeof sortData).toBe('function');
  });

  it('returns `asc orderBy test`', () => {
    const data = [
      {
        "title": "Kiki's Delivery Service",
        "release_date": "1989",
        "rt_score": "96",
      },
      {
        "title": "Castle in the Sky",
        "release_date": "1986",
        "rt_score": "95",
      },
      {
        "title": "My Neighbor Totoro",
        "release_date": "1988",
        "rt_score": "93",
      }
    ];
    const sortBy = 'title';
    const sortOrder = 'asc';
    const result = [
      {
        "title": "Castle in the Sky",
        "release_date": "1986",
        "rt_score": "95",
      },
      {
        "title": "Kiki's Delivery Service",
        "release_date": "1989",
        "rt_score": "96",
      },
      {
        "title": "My Neighbor Totoro",
        "release_date": "1988",
        "rt_score": "93",
      }
    ];
    expect(sortData(data,sortBy,sortOrder)).toEqual(result);
  });
  it('returns `desc orderBy test`', () => {
    const data = [
      {
        "title": "Kiki's Delivery Service",
        "release_date": "1989",
        "rt_score": "96",
      },
      {
        "title": "Castle in the Sky",
        "release_date": "1986",
        "rt_score": "95",
      },
      {
        "title": "My Neighbor Totoro",
        "release_date": "1988",
        "rt_score": "93",
      }
    ];
    const sortBy = 'rt_score';
    const sortOrder = 'desc';
    const result = [
      {
        "title": "Kiki's Delivery Service",
        "release_date": "1989",
        "rt_score": "96",
      },
      {
        "title": "Castle in the Sky",
        "release_date": "1986",
        "rt_score": "95",
      },
      {
        "title": "My Neighbor Totoro",
        "release_date": "1988",
        "rt_score": "93",
      }

    ];
    expect(sortData(data,sortBy,sortOrder)).toEqual(result);
  });
});