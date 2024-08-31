import { GetServerSideProps, NextPage } from "next";

import { useEffect, useState } from "react";

type Props = {
  initialImageUrl: string;
};
const IndexPage: NextPage = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(true);
  console.log(initialImageUrl);

  //   useEffect(() => {
  //     fetchImege().then((newImage) => {
  //       setImageUrl(newImage.url);
  //       setLoading(false);
  //     });
  //   }, []);

  const handleClick = async () => {
    setLoading(false);
    const newImage = await fetchImege();
    setImageUrl(newImage.url);
    setLoading(true);
  };

  return (
    <div>
      <button onClick={handleClick}>更新</button>
      <div>{loading ? <img src={imageUrl} /> : <p>ローディング中</p>}</div>
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImege();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImege = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
