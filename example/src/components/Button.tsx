import { useState } from "react";

const Button = ({
  children,
  onClick,
  type,
}: {
  children: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  const [clicked, setClicked] = useState(false);

  const onBtnClick = async () => {
    try {
      await navigator.clipboard.writeText(children);

      setClicked(true);
      if (onClick) onClick();

      setTimeout(() => {
        setClicked(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="package-install-text" onClick={onBtnClick} type={type}>
      {clicked ? "Copied to Clipboard " : children}
    </button>
  );
};

export default Button;
