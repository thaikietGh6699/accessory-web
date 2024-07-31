import React from "react";
import { Link } from "react-router-dom";

const FixedIcon = () => {
  return (
    <div className="fixed bottom-10 left-7">
      <Link to={"https://www.facebook.com/messages/t/100082094119173/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/1024px-Facebook_Messenger_logo_2018.svg.png"
          alt="Icon"
          className="w-12 h-12 cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default FixedIcon;
