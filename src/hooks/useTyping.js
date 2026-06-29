import { useEffect, useState } from "react";

const useTyping = (words, speed = 80) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  const [display,   setDisplay]   = useState("");

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2.2);
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed]);

  return display;
};

export default useTyping;
