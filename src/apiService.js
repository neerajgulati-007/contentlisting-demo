export const fetchContentByPageNum = async (pageNum = 1) => {
    let url = `https://test.create.diagnal.com/data/page${pageNum}.json`
    const response = await fetch(url)
    return response.json();

    // return Promise.resolve({
    //     "page": {
    //       "title": "Romantic Comedy",
    //       "total-content-items" : "54",
    //       "page-num-requested" : "1",
    //       "page-size-requested" : "20",
    //       "page-size-returned" : "20",
    //       "content-items": {
    //         "content": [
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster1.jpg"
    //           },
    //           {
    //             "name": "Rear Window",
    //             "poster-image": "poster2.jpg"
    //           },
    //           {
    //             "name": "Family Pot",
    //             "poster-image": "poster3.jpg"
    //           },
    //           {
    //             "name": "Family Pot",
    //             "poster-image": "poster2.jpg"
    //           },
    //           {
    //             "name": "Rear Window",
    //             "poster-image": "poster1.jpg"
    //           },
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster3.jpg"
    //           },
    //           {
    //             "name": "Rear Window",
    //             "poster-image": "poster3.jpg"
    //           },
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster2.jpg"
    //           },
    //           {
    //             "name": "Family Pot",
    //             "poster-image": "poster1.jpg"
    //           },
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster1.jpg"
    //           },
    //                   {
    //             "name": "The Birds",
    //             "poster-image": "poster1.jpg"
    //           },
    //           {
    //             "name": "Rear Window",
    //             "poster-image": "poster2.jpg"
    //           },
    //           {
    //             "name": "Family Pot",
    //             "poster-image": "poster3.jpg"
    //           },
    //           {
    //             "name": "Family Pot",
    //             "poster-image": "poster2.jpg"
    //           },
    //           {
    //             "name": "Rear Window",
    //             "poster-image": "poster1.jpg"
    //           },
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster3.jpg"
    //           },
    //           {
    //             "name": "Rear Window",
    //             "poster-image": "poster3.jpg"
    //           },
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster2.jpg"
    //           },
    //           {
    //             "name": "Family Pot",
    //             "poster-image": "poster1.jpg"
    //           },
    //           {
    //             "name": "The Birds",
    //             "poster-image": "poster1.jpg"
    //           }
    //         ]
    //       }
    //     }
    //   });
}