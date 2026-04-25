import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX module without types
import SommelierChampionship from "@/components/SommelierChampionship.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sommelier Championship — Grythyttan" },
      { name: "description", content: "Spela Sommelier Championship i Grythyttan – 12 lokaler, 4 zoner." },
    ],
  }),
  component: Index,
});

function Index() {
  return <SommelierChampionship />;
}
