export const fetchContentByPageNum = async (pageNum = 1) => {
    let url = `https://test.create.diagnal.com/data/page${pageNum}.json`
    const response = await fetch(url)
    return response.json();
}