import Link from "next/link";
import Image from "next/image";

import NavLink from "./nav-link";
import MainHeaderBackground from "./main-header-background";
import logoImg from "@/assets/logo.png";
import hdrClasses from "@/components/main-header/main-header.module.css";

const { active, logo, nav, header } = hdrClasses;

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
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
