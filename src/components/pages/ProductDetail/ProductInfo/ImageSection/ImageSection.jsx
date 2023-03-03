import "./ImageSection.scss";
import React, { useEffect, useState } from "react";
import ImageModal from "./ImageModal/ImageModal";

function ImageSection({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgList, setImgList] = useState([]);
  const [modal, setModal] = useState(false);

  const convertImgToArray = () => {
    const temp = [];
    if (data.imageProduct !== null) temp.push(data.imageProduct);
    if (data.image1 !== null) temp.push(data.image1);
    if (data.image2 !== null) temp.push(data.image2);
    if (data.image3 !== null) temp.push(data.image3);
    if (data.image4 !== null) temp.push(data.image4);
    setImgList(temp);
  };

  useEffect(() => {
    convertImgToArray();
  }, []);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setModal(true);
  };

  return (
    <div className="imageSection">
      <figure className="thumbnail" onClick={() => setModal(true)}>
        <img src={imgList[currentIndex]} alt="thumbnail" />
      </figure>
      <div className="imageNav">
        {imgList.map((data, index) => (
          <figure
            className="image"
            key={index}
            onClick={() => handleImageClick(index)}
            onMouseEnter={() => setCurrentIndex(index)}
          >
            <img src={data} alt="product" />
          </figure>
        ))}
      </div>
      {modal && (
        <ImageModal
          setModal={setModal}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          images={imgList}
          title={data.name}
        />
      )}
    </div>
  );
}

export default ImageSection;
