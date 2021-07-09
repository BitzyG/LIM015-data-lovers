import { searchData, sortData, filterDataByDirectorProducer, filterDataBy } from '../src/data.js';

describe('search by film test', () => {
  it('is a function', () => {
    expect(typeof searchData).toBe('function');
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
    const condition = 'title';
    const value = 'castle';
    const result = [
      {
        "title": "Castle in the Sky",
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      }
    ];
    expect(searchData(data, condition, value)).toEqual(result);
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

  it('returns `desc orderBy test`', () => {
    const data = [
      {
        "title": "My Neighbor Totoro",
        "release_date": "1988",
        "rt_score": "93",
      },
      {
        "title": "Kiki's Delivery Service",
        "release_date": "1989",
        "rt_score": "96",
      },
      {
        "title": "Castle in the Sky",
        "release_date": "1986",
        "rt_score": "95",
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
});

describe('filter Data By test', () => {
  it('is a function', () => {
    expect(typeof filterDataBy).toBe('function');
  });

  it('should return the result to gender Female: Lusheeta, Dola.', () => {
    const data = [
      {
        "name": "Pazu",
        "gender": "Male",
        "age": "13",
        "specie": "Human"
      },
      {
        "name": "Lusheeta Toel Ul Laputa",
        "gender": "Female",
        "age": "13",
        "specie": "Human"
      },
      {
        "name": "Dola",
        "gender": "Female",
        "age": "60",
        "specie": "Human"
      }
    ];
    const condition = 'gender';
    const value = 'Female';
    const result = [
      {
        "name": "Lusheeta Toel Ul Laputa",
        "gender": "Female",
        "age": "13",
        "specie": "Human"
      },
      {
        "name": "Dola",
        "gender": "Female",
        "age": "60",
        "specie": "Human"
      }
    ];
    expect(filterDataBy(data,condition,value)).toEqual(result);
  });
});