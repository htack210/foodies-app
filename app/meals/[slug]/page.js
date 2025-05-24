export default function page({ params }) {
  return (
    <main>
      <h1>Meals</h1>
      <p>Recipe: {params.slug}</p>
    </main>
  );
}
