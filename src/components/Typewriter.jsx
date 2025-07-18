import { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let animationFrame;

    const type = () => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index < text.length) {
        animationFrame = setTimeout(type, speed);
      }
    };

    setDisplayedText("");
    type();

    return () => clearTimeout(animationFrame);
  }, [text, speed]);

  return <p>{displayedText}</p>;
};

export default Typewriter;
