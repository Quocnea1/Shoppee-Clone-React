import "./Footer.scss";
import { footerData } from "../../../utils/dataConfig";
import { headerData } from "../../../utils/dataConfig";
import { CounTry, CountTryTitle } from "./country/country";
import { TakeCare } from "./takeCare/takeCare";
import { About } from "./about/about";
import { Policy } from "./policy/policy";

export const Footer = () => {
  const { qrCode, ggPlay, appStore } = headerData.images;
  const {
    footerLast,
    Dangky,
    fb,
    insta,
    linkin,
    grab,
    be,
    visa,
    master,
    cod,
    shpay,
    shexp,
    vnpost,
  } = footerData.img;
  const { counTry, counTryTitle, takeCare, about, policy } = footerData;
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_heading">
          <b>SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE</b>
        </div>
        <div className="footer_content">
          <span>
            Shopee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và
            miễn phí! Shopee là nền tảng giao dịch trực tuyến hàng đầu ở Đông
            Nam Á, có trụ sở chính ở Singapore, đã có mặt ở khắp các khu vực
          </span>
          <span>
            {counTryTitle.map((data, index) => (
              <CountTryTitle data={data} key={index} />
            ))}
          </span>
          <span>
            {" "}
            Với sự đảm bảo của Shopee, bạn sẽ mua hàng trực tuyến an tâm và
            nhanh chóng hơn bao giờ hết!
          </span>
        </div>
        <div className="footer_heading">
          <b>MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN</b>
        </div>
        <div className="footer_content">
          <span>
            Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực tuyến
            thì Shopee.vn là một sự lựa chọn tuyệt vời dành cho bạn. Bản chất
            của Shopee là một social E-commerce platform - nền tảng trang web{" "}
            <b> thương mại điện tử</b>
          </span>
          <span>
            tích hợp mạng xã hội. Điều này cho phép người mua và người bán hàng
            dễ dàng tương tác, trao đổi thông tin về sản phẩm và chương trình
            khuyến mãi của shop. Nhờ nền tảng đó, việc mua bán trên Shopee trở
            nên nhanh chóng và đơn giản hơn. Bạn có thể trò chuyện trực tiếp với
            nhà bán hàng để hỏi trực tiếp về mặt hàng cần mua. Còn nếu bạn muốn
            tìm mua những dòng sản phẩm chính hãng, uy tín,{" "}
          </span>
          <u>
            <a href="/">Shopee Mall</a>
          </u>
          <span>
            {" "}
            chính là sự lựa chọn lí tưởng dành cho bạn. Để bạn có thể dễ dàng
            khi tìm hiểu và sử dụng sản phẩm,
          </span>
          <u>
            <a href="/">
              Shopee Blog- trang blog thông tin chính thức của Shopee
            </a>
          </u>
          <span>
            {" "}
            - sẽ giúp bạn có thể tìm được cho mình các kiến thức về xu hướng
            thời trang, review công nghệ, mẹo làm đẹp, tin tức tiêu dùng và deal
            giá tốt bất ngờ.
          </span>
        </div>
        <a href="/" className="linkMore">
          Xem thêm &gt;
        </a>
        <div className="footer-section-content">
          <div className="footer-items-customer">
            <b>Chăm sóc khánh hàng</b>
            <br></br>
            <ul>
              {takeCare.map((data, index) => (
                <TakeCare data={data} key={index} />
              ))}
            </ul>
          </div>
          <div className="footer-items-shopee">
            <b>Về Shopee</b>
            <br></br>
            <ul>
              {about.map((data, index) => (
                <About data={data} key={index} />
              ))}
            </ul>
          </div>
          <div className="footer-items-pay">
            <b>Thanh Toán</b>
            <div className="footer-items">
              <figure className="footer-items-payment">
                <img src={visa} alt={visa}></img>
              </figure>
              <figure className="footer-items-payment">
                <img src={master} alt={master}></img>
              </figure>
              <figure className="footer-items-payment">
                <img src={cod} alt={cod}></img>
              </figure>
              <figure className="footer-items-payment">
                <img src={shpay} alt={shpay}></img>
              </figure>
            </div>
            <b>Đơn vị vận chuyển</b>
            <div className="footer-items">
              <figure className="footer-items-ship">
                <img src={shexp} alt="shexp"></img>
              </figure>
              <figure className="footer-items-ship">
                <img src={vnpost} alt={vnpost}></img>
              </figure>
              <figure className="footer-items-ship">
                <img src={grab} alt={grab}></img>
              </figure>
              <figure className="footer-items-ship">
                <img src={be} alt={be}></img>
              </figure>
            </div>
          </div>
          <div className="footer-items-social">
            <b>Theo dõi chúng tôi trên</b>
            <br />
            <ul>
              <li>
                <figure className="footer_item_social">
                  <img src={fb} alt={fb}></img>
                </figure>
                <a href="/">Facebook</a>
              </li>
              <li>
                <figure className="footer_item_social">
                  <img src={insta} alt="insta"></img>
                </figure>
                <a href="/">instagram</a>
              </li>
              <li>
                <figure className="footer_item_social">
                  <img src={linkin} alt={linkin}></img>
                </figure>
                <a href="/">LinkedIn</a>
              </li>
            </ul>
          </div>
          <div className="footer-items-download">
            <b>Tải ứng dụng Shopee ngay thôi</b>
            <a className="items-download" href="/">
              <figure className="footer_item_qrcode">
                <img src={qrCode} alt={qrCode}></img>
              </figure>
              <div className="footer_item">
                <figure className="footer_item_app">
                  <img src={appStore} alt={appStore}></img>
                </figure>
                <figure className="footer_item_app">
                  <img src={ggPlay} alt={ggPlay}></img>
                </figure>
              </div>
            </a>
          </div>
        </div>
        <div className="footer-last">
          <div className="footer-last-title">
            &copy;{new Date().getFullYear()} Shopee. Tất cả các quyền được bảo
            lưu.
          </div>
          <div className="footer-last-country">
            <p className="footer-last-country-content">Quốc gia và khu vực:</p>
            <div className="footer-last-country">
              {counTry.map((data, index) => (
                <CounTry data={data} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="footer-last-content">
          {policy.map((data, index) => (
            <Policy data={data} key={index} />
          ))}
        </div>
        <div className="footer-last-image">
          <figure className="picDangky">
            <img src={Dangky} alt={Dangky}></img>
          </figure>
          <figure className="picDangky">
            <img src={footerLast} alt={footerLast}></img>
          </figure>
        </div>
        <div className="footer-last-year">
          <p>&copy; - Bản quyền thuộc về công ty TNHH Shopee</p>
        </div>
      </div>
    </div>
  );
};
