export async function getServerSideProps() {
  const res = await fetch("https://titanova-ai.vercel.app/api/logs");
  const data = await res.json();
  return { props: { data } };
}
