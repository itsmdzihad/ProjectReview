import { CoursesSection } from "./CoursesSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <CoursesSection />
      <HowItWorksSection />
    </main>
  );
}
