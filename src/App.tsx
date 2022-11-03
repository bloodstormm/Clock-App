import { Quotes } from "./components/Quotes";
import { gsap } from "gsap";

import sun from "./assets/sun.svg";
import moon from "./assets/moon.svg";
import downArrow from "./assets/downArrow.svg";
import upArrow from "./assets/upArrow.svg";
import Flip from "gsap/Flip";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

type LocationInfos = {
  utc: string;
  timeZone: string;
  diaAno: number;
  diaSemana: number;
  numSemana: number;
};

function App() {
  gsap.registerPlugin(Flip);
  const [openInfo, setOpenInfo] = useState(false);

  const [locationInfo, setLocationInfo] = useState<LocationInfos>();

  const [horaAtual, setHoraAtual] = useState<string>();

  const isLoading = useRef(true);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  console.log(isLoading.current);

  const handleLocation = async () => {
    isLoading.current = true;

    // API com os resultados
    const { data: response } = await axios.get(
      `http://worldtimeapi.org/api/ip/`
    );

    console.log(response);

    // Atualizando os estados
    setLocationInfo({
      utc: response.abbreviation,
      timeZone: response.timezone,
      diaAno: response.day_of_year,
      diaSemana: response.day_of_week,
      numSemana: response.week_number,
    });

    setHoraAtual(new Date().toLocaleTimeString("pt-br", options));

    isLoading.current = false;
  };

  useEffect(() => {
    handleLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraAtual(new Date().toLocaleTimeString("pt-br", options));
      console.log(horaAtual);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const greetingMessage = () => {
    const hora = new Date().getHours();

    return hora! < 5
      ? "Boa Madrugada"
      : hora! < 12
      ? "Bom Dia"
      : hora! < 18
      ? "Boa Tarde"
      : "Boa Noite";
  };

  return (
    <main className="flex h-screen flex-col overflow-y-hidden bg-orange-900/30">
      {isLoading.current ? (
        "carregando"
      ) : (
        <>
          <section className="container relative mx-auto mt-14 mb-8 flex h-4/5 flex-col justify-between xl:max-w-7xl">
            <div className="space-y-12">
              <h1 className="text-end text-4xl font-semibold text-almostWhite">
                NCLS
              </h1>
              <div
                className={`${
                  openInfo ? "-translate-y-12 opacity-0" : "translate-y-0"
                } transition duration-300`}
              >
                <Quotes />
              </div>
            </div>

            {/* Clock */}
            <section className="clockContainer flex items-end justify-between text-almostWhite">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <img
                    src={greetingMessage() == "Boa Noite" ? moon : sun}
                    alt=""
                    className="mr-4 h-8 w-8"
                  />
                  <span className="text-xl uppercase tracking-wide">
                    {greetingMessage()}, agora são:
                  </span>
                </div>

                <div className="flex items-center">
                  <h1 className="text-[12rem] font-bold leading-[13rem]">
                    {horaAtual}
                  </h1>
                  <span className="ml-3 pt-24  text-2xl font-medium">
                    GMT{locationInfo!.utc}
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-xl font-bold uppercase tracking-[.2rem]">
                    Em Taubaté, SP
                  </span>
                </div>
              </div>

              <button
                onClick={() => setOpenInfo((prev) => !prev)}
                className={`flex h-14 ${
                  openInfo ? " w-44 " : "w-36"
                } items-center justify-center rounded-full bg-almostWhite transition-all`}
              >
                <p className="font-semibold uppercase tracking-wider text-gray-400">
                  {openInfo ? "Menos" : "Mais"}
                </p>
                <img
                  src={openInfo ? upArrow : downArrow}
                  alt="botao Arrow"
                  className="ml-1 h-10 w-10 rounded-full bg-almostBlack p-[.7rem]"
                />
              </button>
            </section>
          </section>

          {/* Mais Informações */}
          <section
            className={` ${
              openInfo ? "flex" : "hidden"
            } infoContainer flex h-3/4 w-full items-center bg-orange-100/70 backdrop-blur-md`}
          >
            <div className="container mx-auto grid grid-cols-2 gap-24 text-left xl:max-w-7xl">
              <div>
                <span className="font-thin uppercase tracking-wider text-almostBlack">
                  Timezone Atual
                </span>
                <h3 className="pt-4 text-5xl font-bold text-almostBlack">
                  {locationInfo!.timeZone}
                </h3>
              </div>
              <div>
                <span className="font-thin uppercase tracking-wide text-almostBlack">
                  Dia do Ano
                </span>
                <h3 className="pt-4 text-5xl font-bold text-almostBlack">
                  {locationInfo!.diaAno}
                </h3>
              </div>
              <div>
                <span className="font-thin uppercase tracking-wide text-almostBlack">
                  Dia da semana
                </span>
                <h3 className="pt-4 text-5xl font-bold text-almostBlack">
                  {locationInfo!.diaSemana}
                </h3>
              </div>
              <div>
                <span className="font-thin uppercase tracking-wide text-almostBlack">
                  Semana nº
                </span>
                <h3 className="pt-4 text-5xl font-bold text-almostBlack">
                  {locationInfo!.numSemana}
                </h3>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
