import { NextPage } from "next";

import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImege().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImege();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick}>更新</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};

export default IndexPage;

type Image = {
  url: string;
};

const fetchImege = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
