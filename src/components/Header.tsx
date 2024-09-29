// components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-12 bg-white-300 border-4 border-stone">
      <nav className=" flex mx-4 leading-10">
        <Link href="/" passHref className="pr-10">
          HOME
        </Link>
        <Link href="/todo" passHref>
          TODO
        </Link>
      </nav>
    </header>
  );
};

export default Header;
