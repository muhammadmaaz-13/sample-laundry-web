import { Hero } from "@/components/home/Hero";
import { OrderTracker } from "@/components/OrderTracker";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StainSlider } from "@/components/StainSlider";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-10">
        <OrderTracker />
      </div>
      <PriceCalculator />
      <ProcessTimeline />
      <WhyChooseUs />
      <StainSlider />
      <Testimonials />
      <CtaBand />
    </>
  );
}
