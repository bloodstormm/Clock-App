import axios from "axios";
import { useEffect, useRef, useState } from "react";
import refresh from "../../assets/refresh.svg";

export const Quotes = () => {
  const [quote, setQuote] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const isLoadingQuote = useRef(true);

  const generateQuote = () => {
    isLoadingQuote.current = true;
    axios
      .get("https://allugofrases.herokuapp.com/frases/random")
      .then(
        ({ data: response }) => (
          setQuote(response.frase),
          setAuthor(response.autor),
          (isLoadingQuote.current = false)
        )
      )
      .catch(
        (err) => (
          setQuote("Erro ao carregar a citação! -> " + err),
          (isLoadingQuote.current = false)
        )
      );
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <>
      {isLoadingQuote.current ? (
        <div className="mt-10 max-w-md text-almostWhite">
          <div className="h-20 w-[28rem] animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-6 h-8 w-44 animate-pulse rounded-lg bg-gray-200" />
        </div>
      ) : (
        <div className="relative mt-10 max-w-md text-almostWhite">
          <p className="leading-relaxed">"{quote}"</p>
          <button
            className="absolute right-10 bottom-0"
            onClick={generateQuote}
          >
            <img src={refresh} alt="" className="h-5 w-5" />
          </button>
          <h3 className="mt-8 font-semibold">{author}</h3>
        </div>
      )}
    </>
  );
};
