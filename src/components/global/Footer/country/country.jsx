import "./country.scss";

export const CounTry = ({ data }) => {
  return (
    <a href="/" className="footer-last-country-content">
      {data}
    </a>
  );
};

export const CountTryTitle = ({ data }) => {
  return (
    <a className="footer-content-country" href="/">
      {" "}
      {data}
    </a>
  );
};
