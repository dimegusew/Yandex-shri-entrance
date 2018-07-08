import React from "react";

const Footer = ({ ...props }) => {
  return (
    <div className="bottom">
      <div className="footer">
        <button>Отмена</button>
        <button>Создать</button>
      </div>
    </div>
  );
};

export default Footer;
