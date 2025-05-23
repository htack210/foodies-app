import HomeLink from "@/components/HomeLink";
export default function page({ params }) {
  return (
    <main>
      <h1>Meals</h1>
      <p>Recipe: {params.slug}</p>
      <p>
        <HomeLink />
      </p>
    </main>
  );
}
