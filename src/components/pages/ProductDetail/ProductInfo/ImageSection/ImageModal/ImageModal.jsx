import { ProcessLongText } from "../../../../../global/ProcessText/ProcessText";
import "./ImageModal.scss";

function ImageModal({
  setModal,
  currentIndex,
  setCurrentIndex,
  images,
  title,
}) {
  const handleNavClick = (isNext) => {
    if (isNext) {
      if (currentIndex === images.length - 1) setCurrentIndex(0);
      else setCurrentIndex(currentIndex + 1);
    } else {
      if (currentIndex === 0) setCurrentIndex(images.length - 1);
      else setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="imageModal">
      <div className="modal">
        <div className="modalOverlay" onClick={() => setModal(false)}></div>
        <div className="modalBody">
          <figure className="modalThumbnail">
            <div className="modalNav">
              <span onClick={() => handleNavClick(false)}>{"<"}</span>
              <span onClick={() => handleNavClick(true)}>{">"}</span>
            </div>
            <img src={images[currentIndex]} alt="product" />
          </figure>
          <div className="modalContent">
            <div className="modalTitle">
              {<ProcessLongText string={title} limit={60} />}
            </div>
            <div className="modalList">
              {images.map((data, index) => (
                <figure
                  className={index === currentIndex ? "image active" : "image"}
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img src={data} alt="product" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
