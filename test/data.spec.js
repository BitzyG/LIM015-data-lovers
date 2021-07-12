import { searchData, sortData, filterDataByDirectorProducer, filterDataBy, getDataFilterBy, getNamesDirectorProducer } from '../src/data.js';

describe('search by film test', () => {
  it('is a function', () => {
    expect(typeof searchData).toBe('function');
  });

  it('should return the search result for the title search castle', () => {
    const data = [
      {
        "title": "Kiki's Delivery Service",
      },
      {
        "title": "Castle in the Sky",
      },
      {
        "title": "Only Yesterday",
      }
    ];
    const condition = 'title';
    const value = 'castle';
    const result = [
      {
        "title": "Castle in the Sky",
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
        "director": "Hayao Miyazaki",
        "producer": "Hayao Miyazaki",
      },
      {
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      },
      {
        "director": "Isao Takahata",
        "producer": "Toshio Suzuki",
      }
    ];
    const condition = 'Hayao Miyazaki';
    const result = [
      {
        "director": "Hayao Miyazaki",
        "producer": "Hayao Miyazaki",
      },
      {
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
        "rt_score": "93",
      },
      {
        "rt_score": "96",
      },
      {
        "rt_score": "95",
      }
    ];
    const sortBy = 'rt_score';
    const sortOrder = 'desc';
    const result = [
      {
        "rt_score": "96",
      },
      {
        "rt_score": "95",
      },
      {
        "rt_score": "93",
      }
    ];
    expect(sortData(data,sortBy,sortOrder)).toEqual(result);
  });

  it('returns `asc orderBy test`', () => {
    const data = [
      {
        "title": "Kiki's Delivery Service",
      },
      {
        "title": "Castle in the Sky",
      },
      {
        "title": "My Neighbor Totoro",
      }
    ];
    const sortBy = 'title';
    const sortOrder = 'asc';
    const result = [
      {
        "title": "Castle in the Sky",
      },
      {
        "title": "Kiki's Delivery Service",
      },
      {
        "title": "My Neighbor Totoro",
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
        "gender": "Male",
      },
      {
        "gender": "Female",
      },
      {
        "gender": "Female",
      }
    ];
    const condition = 'gender';
    const value = 'Female';
    const result = [
      {
        "gender": "Female",
      },
      {
        "gender": "Female",
      }
    ];
    expect(filterDataBy(data,condition,value)).toEqual(result);
  });
});

describe('get Data Filter By test', () => {
  it('is a function', () => {
    expect(typeof getDataFilterBy).toBe('function');
  });

  it('should return the Data Filter for gender', () => {
    const data = [
      {
        "gender": "Male",
        "specie": "Human"
      },
      {
        "gender": "Female",
        "specie": "Human"
      },
      {
        "gender": "Female",
        "specie": "Human"
      },
    ];
    const condition = 'gender';
    const result = ["Male", "Female"];
    expect(getDataFilterBy(data, condition)).toEqual(result);
  });
});

describe('get Names Director and Producer Test', () => {
  it('is a function', () => {
    expect(typeof getNamesDirectorProducer).toBe('function');
  });

  it('should return the Data Filter of Director and Producer', () => {
    const data = [
      {
        "director": "Hayao Miyazaki",
        "producer": "Isao Takahata",
      },
      {
        "director": "Hayao Miyazaki",
        "producer": "Hayao Miyazaki",
      },
    ];
    const result = ["Hayao Miyazaki", "Isao Takahata"];
    expect(getNamesDirectorProducer(data)).toEqual(result);
  });
});