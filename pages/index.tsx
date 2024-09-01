import { GetServerSideProps, NextPage } from "next";

import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

  const [randomValues, setValues] = useState<number | null>(null);
  //console.log(initialImageUrl);
  //初期画像はSSR で用意したので初期画面のuseEffectは不要
  //   useEffect(() => {
  //     fetchImege().then((newImage) => {
  //       setImageUrl(newImage.url);
  //       setLoading(false);
  //     });
  //   }, []);
  function getRandomOneOrTwo() {
    return Math.floor(Math.random() * 2) + 1;
  }

  const handleClick = async () => {
    setLoading(true);
    // ボタンをクリックしたときにランダムな数をコンソールに出力する
    const randomValues = getRandomOneOrTwo();
    console.log(randomValues); // 1または2を出力
    setValues(randomValues);

    if (randomValues === 1) {
      const newImage = await fetchImege();
      setImageUrl(newImage.url);
    } else {
      const mouseImage =
        "data:image/jpeg;base64,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";

      setImageUrl(mouseImage);
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        更新
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
      {randomValues == 2 ? <p>"Hey!SewageMan!!"</p> : <p></p>}
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
