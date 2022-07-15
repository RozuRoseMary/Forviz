const imageUrl = "https://picsum.photos/v2/list";

fetch(imageUrl)
  .then((res) => res.json())
  .then((res) => {
    res.map((image) => {
      const photo = document.createElement("img");
      photo.setAttribute("src", image.download_url);
      document.getElementById("images").appendChild(photo);
    });
  });
