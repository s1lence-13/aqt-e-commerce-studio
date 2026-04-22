import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AQT" },
      {
        name: "description",
        content: "AQT is a small studio making considered objects in small batches.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-aqt py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">About</p>
        <h1 className="font-display text-4xl md:text-6xl mt-4 leading-[1.05]">
          A small studio making things meant to last.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          AQT began in a corner of a Stockholm apartment in 2021. We make a small number of
          considered objects each season — apparel, accessories, home goods — designed in studio
          and produced in small batches by makers we know and trust.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          We believe in restraint. Fewer, better things. Materials that age well. Forms that don't
          need to shout. We hope what we make becomes part of your everyday for a long time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-20">
        {[
          {
            title: "Materials",
            text: "Natural fibers, full-grain leather, stoneware, recycled metals. Sourced with care.",
          },
          {
            title: "Makers",
            text: "We work directly with small workshops in Portugal, Italy, Japan and Mexico.",
          },
          {
            title: "Pace",
            text: "Small batches. No seasons. We release things when they're ready, not before.",
          },
        ].map((b) => (
          <div key={b.title} className="border-t border-border pt-6">
            <h3 className="font-display text-2xl">{b.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
