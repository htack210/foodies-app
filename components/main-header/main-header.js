import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "./main-header-background";
import logoImg from "@/assets/logo.png";
import hdrClasses from "@/components/main-header/main-header.module.css";

const { logo, nav, header } = hdrClasses;

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={header}>
        <Link className={logo} href="/">
          <Image src={logoImg} alt="Plate of food" priority /> NextLevel Food
        </Link>

        <nav className={nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
