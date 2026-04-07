import HomeContent from "@/components/home-content";
import HomeHero from "@/components/home-hero";
import HomeNavbar from "@/components/home-navbar";

export default function HomePage() {
  return (
    <>
      <div>
        <HomeNavbar />
        <HomeHero />
        <HomeContent />
      </div>
    </>
  );
}
