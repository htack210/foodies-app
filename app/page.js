import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Meal Shares</Link>
      </p>
      <p>
        <Link href="/community">Community</Link>
      </p>
      <p>
        <Link href="/meals/Pork">Pork Recipes</Link>
      </p>
      <p>
        <Link href="/meals/Beef">Beef Recipes</Link>
      </p>
      <p>
        <Link href="/meals/Seafood">Seafood Recipes</Link>
      </p>
    </main>
  );
}
