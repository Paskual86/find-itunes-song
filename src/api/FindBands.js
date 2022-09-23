const DEFAULT_BANDS = [
  {
    id: 1,
    title: "A",
  },
  {
    id: 2,
    title: "B",
  },
  {
    id: 3,
    title: "C",
  },
  {
    id: 4,
    title: "D",
  },
  {
    id: 5,
    title: "E",
  },
];

async function FindBand(bandName, count) {
  const url = new URL("https://itunes.apple.com/search");
  if (bandName && bandName.trim().length > 0) {
    const param = new URLSearchParams({ term: bandName }).toString();
    url.search = param;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const result = data.results.map((bandData) => bandData.collectionName);

        let sortedResult = result.sort();
        let unique = [...new Set(sortedResult)];

        const uniqueResult = unique.filter(
          (band) => band && band && band.trim().length > 0
        );

        if (uniqueResult.length > count) {
          return uniqueResult.slice(0, count).map((val, index) => {
            return {
              id: index + 1,
              title: val,
            };
          });
        } else {
          if (uniqueResult.length === 0) {
            return [...DEFAULT_BANDS];
          } else {
            return uniqueResult.concat(DEFAULT_BANDS).slice(0, count);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return DEFAULT_BANDS;
}

export { FindBand };
