// components/Header.tsx
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="w-full h-12 bg-white-300 border-4 border-stone">
        <div className="relative">
          <nav className=" flex mx-4 leading-10">
            <Link href="/" passHref className="pr-10">
              HOME
            </Link>
            <Link href="/todo" passHref className="pr-8">
              TODO
            </Link>
            <Link href="/weather" passHref>
              WEATHER
            </Link>
            <button
              onClick={toggleMenu}
              className="ml-auto px-1 py-1 flex flex-col items-center justify-center space-y-1"
            >
              <span
                className={
                  isOpen
                    ? "rotate-45 block w-6 h-0.5 bg-black translate-y-1.5 duration-300"
                    : "block w-6 h-0.5 bg-black"
                }
              ></span>
              <span
                className={isOpen ? "display-none" : "block w-6 h-0.5 bg-black"}
              ></span>
              <span
                className={
                  isOpen
                    ? "-rotate-45 block w-6 h-0.5 bg-black -translate-y-1 duration-300"
                    : "block w-6 h-0.5 bg-black"
                }
              ></span>
            </button>
            {isOpen && (
              <div className="absolute top-10 right-0 w-40 bg-white shadow-lg border z-10 ">
                <ul className="flex flex-col space-y-2 p-2">
                  <li>
                    <Link
                      href="/"
                      passHref
                      className="block px-2 py-1 hover:bg-gray-100"
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/todo"
                      passHref
                      className="block px-2 py-1 hover:bg-gray-100"
                    >
                      TODO
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/weather"
                      passHref
                      className="block px-2 py-1 hover:bg-gray-100"
                    >
                      WEATHER
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/secret"
                      passHref
                      className="block px-2 py-1 hover:bg-gray-100"
                    >
                      SECRET
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
