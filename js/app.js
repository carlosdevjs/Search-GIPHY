const form = document.querySelector("form");
const containerImg = document.querySelector("#display");

const APIKey = "46WEiY5uhkE7sGL9eQJRRvRBXIFbOBu5";

const getGiphyApyUrl = (inputValue) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${inputValue}`;

const generateGIFImg = (downsizedURL, GIFData) => {
  const img = document.createElement("img");
  img.setAttribute('class', 'gif-movie')
  img.setAttribute("src", downsizedURL);
  img.setAttribute("alt", GIFData.data[0].title);

  return img
}

const fetchGifApi = async inputValue => {
  try {
    const GIPHYApiUrl = getGiphyApyUrl(inputValue);
    const response = await fetch(GIPHYApiUrl);

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados");
    }

    return response.json()
  } catch (error) {
    alert(`Error: ${error}`);
  }
}

const insertGIFIntoDOM = async inputValue => {
    const GIFData = await fetchGifApi(inputValue)

    if (GIFData) {
      const downsizedURL = GIFData.data[0].images.downsized.url;
      const img = generateGIFImg(downsizedURL, GIFData)
  
      containerImg.insertAdjacentElement("afterbegin", img);
  
      form.reset();
    }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.search.value;
  insertGIFIntoDOM(inputValue);
});
