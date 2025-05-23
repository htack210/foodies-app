import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function HomeLink() {
  return (
    <Link href="/">
      <FaHome /> Home
    </Link>
  );
}
