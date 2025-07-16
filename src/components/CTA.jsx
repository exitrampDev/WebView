import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ctaClicksState } from "../recoil/ctaState";

const CTA = ({ id, title, description, buttonText, onClick, to }) => {
  const [ctaState, setCtaState] = useRecoilState(ctaClicksState);

  const navigate = useNavigate();
  const handleClick = () => {
    setCtaState({ ...ctaState, [id]: true });
    if (onClick) onClick();

    if (to) {
      navigate(to);
    }
  };

  return (
    <div className="cta-box">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
};

export default CTA;
