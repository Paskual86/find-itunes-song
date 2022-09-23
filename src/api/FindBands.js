const DEFAULT_BANDS = [
  {
    id: "a",
    title: "A",
    position: 1,
  },
  {
    id: "b",
    title: "B",
    position: 2,
  },
  {
    id: "c",
    title: "C",
    position: 3,
  },
  {
    id: "d",
    title: "D",
    position: 4,
  },
  {
    id: "e",
    title: "E",
    position: 5,
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

        const result = data.results.map((bandData) => {
          return {
            id: bandData.collectionId,
            title: bandData.collectionName,
          };
        });

        let sortedResult = result.sort((band1, band2) =>
          band1.title > band2.title ? 1 : -1
        );
        let unique = Array.from(new Set(sortedResult.map((x) => x.title))).map(
          (ttl, index) => {
            return {
              id: sortedResult.find((s) => s.title === ttl).id,
              title: ttl,
              position: index + 1,
            };
          }
        );

        const uniqueResult = unique.filter(
          (band) => band && band.title && band.title.trim().length > 0
        );

        if (uniqueResult.length > count) {
          return uniqueResult.slice(0, count);
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
