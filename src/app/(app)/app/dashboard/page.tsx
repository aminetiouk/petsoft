import Branding from "@/components/branding";
import Stats from "@/components/stats";


export default function Dashboard() {
  return (
    <main>
      <div className="flex justify-between items-center py-8 text-black/70">
        <Branding />

        <Stats />
      </div>
    </main>
  );
}
