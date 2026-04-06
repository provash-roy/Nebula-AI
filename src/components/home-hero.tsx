import Typewriter from "typewriter-effect";

export default function HomeHero() {
  return (
    <div className="flex items-center justify-center py-36">
      <div className="text-white font-extrabold text-2xl sm:5xl md:6xl lg:7xl">
        <h1>The Best AI Tool For</h1>

        <Typewriter
          options={{
            strings: [
              "Conversation",
              "Photo GGeneration",
              "Code Generation",
              "Audio Generation",
              "Video Generation",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  );
}
