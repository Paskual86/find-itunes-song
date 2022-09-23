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
  let url = new URL("https://itunes.apple.com/search");
  if (bandName && bandName.trim().length > 0) {
    let param = new URLSearchParams({ term: bandName }).toString();
    url.search = param;

    const response = await fetch(url);
    const data = await response.json();

    let result = data.results.map((bandData) => {
      return {
        id: bandData.collectionId,
        title: bandData.collectionName,
      };
    });

    let sortedResult = result.sort((band1, band2) =>
      band1.title.toLowerCase() > band2.title.toLowerCase() ? 1 : -1
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

    console.log(unique);
    if (unique.length > count) {
      return unique.slice(0, count);
    } else {
      return unique;
    }
  } else {
    return [...DEFAULT_BANDS];
  }
}

export { FindBand };
