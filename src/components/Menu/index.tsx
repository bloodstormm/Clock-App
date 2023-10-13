import { Menu } from "@headlessui/react";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

type MenuOptionsProps = {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  handleBackgroundImage: MouseEventHandler<HTMLAnchorElement>;
};

export const MenuOptions = ({
  setOpenMenu,
  handleBackgroundImage,
}: MenuOptionsProps) => {
  return (
    <Menu>
      <Menu.Button
        className="text-4xl font-semibold  text-almostWhite"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        NCLS
      </Menu.Button>
      <Menu.Items
        static
        className="menu absolute -bottom-24 flex w-fit flex-col space-y-4 rounded-lg bg-orange-100/60 p-4 opacity-0 outline-none backdrop-blur-sm"
      >
        <Menu.Item>
          {({ active }) => (
            <span className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-orange-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>

              <a
                href="https://bloodstormm.github.io/Portfolio-2022/"
                target="_blank"
              >
                Ver mais projetos
              </a>
            </span>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              onClick={handleBackgroundImage}
              className="flex gap-2 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-orange-900 hover:cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <a target="_blank">Atualizar imagem</a>
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
