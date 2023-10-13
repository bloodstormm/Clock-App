import { Quotes } from "./components/Quotes";
import { gsap } from "gsap";

import sun from "./assets/sun.svg";
import moon from "./assets/moon.svg";
import downArrow from "./assets/downArrow.svg";
import upArrow from "./assets/upArrow.svg";

import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Skeleton } from "./components/Skelekton";
import useIsFirstRender from "./hooks/useIsFirstRender";
import { MenuOptions } from "./components/Menu";

type LocationInfos = {
  utc: string;
  timeZone: string;
  diaAno: number;
  diaSemana: number;
  numSemana: number;
};

function App() {
  const [openInfo, setOpenInfo] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [locationInfo, setLocationInfo] = useState<LocationInfos>();

  const [horaAtual, setHoraAtual] = useState<string>();
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const isLoading = useRef(true);
  const isFirstRender = useIsFirstRender();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const handleLocation = async () => {
    isLoading.current = true;

    // API com os resultados
    const { data: response } = await axios.get(
      `https://worldtimeapi.org/api/ip/`
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

  const handleBackgroundImage = async () => {
    const { data: response } = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=9L8T96uOkV4rscez8vOL42-Cfb-NtkzHbkshWzC571A`
    );

    setBackgroundImage(`'${response.urls.full}'`);
    console.log(backgroundImage);
  };

  useEffect(() => {
    handleBackgroundImage();
    handleLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraAtual(new Date().toLocaleTimeString("pt-br", options));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tl = useRef<GSAPTimeline | null>(null);
  const tlMenu = useRef<GSAPTimeline | null>(null);

  const app = useRef(null);

  useLayoutEffect(() => {
    if (isFirstRender) return;

    const ctx = gsap.context(() => {
      // More info container Opening animation
      gsap.set(".infoContainer", { yPercent: 100, opacity: 1 });
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.inOut",
          },
        })
        .to(".infoContainer", { yPercent: 0 })
        .to(".clockContainer", { y: "-30vh" }, "<")
        .to(".quotes", { y: -100, opacity: 0 }, "<")
        .reverse();

      // Menu Animation Opening
      gsap.set(".menu", { yPercent: -10 });
      tlMenu.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.inOut",
          },
        })
        .to(".menu", { yPercent: 10, opacity: 1 })
        .reverse();
    }, app);

    return () => ctx.revert();
  }, [locationInfo]);

  useLayoutEffect(() => {
    if (isFirstRender) return;

    tl.current!.reversed(!openInfo);
    tlMenu.current!.reversed(!openMenu);
  }, [openInfo, openMenu]);

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
    <main
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`bg-im relative flex h-screen flex-col overflow-y-hidden bg-orange-900/30`}
      ref={app}
    >
      {isLoading.current ? (
        <Skeleton />
      ) : (
        <>
          <section className="container relative mx-auto mt-14 mb-8 flex h-4/5 flex-col justify-between xl:max-w-7xl">
            <div className="space-y-2 2xl:space-y-12">
              <div className="relative flex w-full flex-col items-end">
                <MenuOptions
                  setOpenMenu={setOpenMenu}
                  handleBackgroundImage={handleBackgroundImage}
                />
              </div>
              <div className="quotes">
                <Quotes />
              </div>
            </div>

            {/* Clock */}
            <section className="clockContainer flex items-end justify-between text-almostWhite">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <img
                    src={greetingMessage() == "Boa Noite" ? moon : sun}
                    alt="timeIcon"
                    className="mr-4 h-8 w-8"
                  />
                  <span className="text-xl uppercase tracking-wide">
                    {greetingMessage()}, agora são:
                  </span>
                </div>

                <div className="flex items-center">
                  <h1 className="text-[9rem] font-bold leading-[10rem] 2xl:text-[12rem] 2xl:leading-[13rem]">
                    {horaAtual}
                  </h1>
                  <span className="ml-3 pt-24 text-2xl font-medium">
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
                } items-center justify-center rounded-full bg-almostWhite outline-none transition-all`}
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
          <section className="infoContainer absolute bottom-0 flex h-[40vh] w-full items-center bg-orange-100/50 opacity-0 backdrop-blur-md">
            <div className="container mx-auto grid grid-cols-2 gap-12 text-left xl:max-w-7xl 2xl:gap-24">
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
                  {locationInfo!.diaSemana + 1}
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
