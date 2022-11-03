import axios from "axios";
import { useEffect, useState } from "react";

export const Quotes = () => {
  const [quote, setQuote] = useState<string>();
  const [author, setAuthor] = useState<string>();

  useEffect(() => {
    axios
      .get("http://allugofrases.herokuapp.com/frases/random")
      .then(
        ({ data: response }) => (
          setQuote(response.frase), setAuthor(response.autor)
        )
      )
      .catch((err) => setQuote("Erro ao carregar a citação! -> " + err));
  }, []);

  return (
    <div className="mt-10 max-w-md text-almostWhite">
      <p className="leading-relaxed">"{quote}"</p>

      <h3 className="mt-8 font-semibold">{author}</h3>
    </div>
  );
};
