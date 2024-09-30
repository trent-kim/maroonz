import {
  getIntroAudio,
  getBackground,
  getCategories,
  getIntroText,
  getProjects,
  getLogo,
} from "@/sanity/sanity-utils";
import Intro from "./_components/intro";
import { VisibilityProvider } from "./_hooks/visibility-context"; // Import the provider
import { TransitionProvider } from "./_hooks/transition-context";

export default async function Home() {
  const projects = await getProjects();
  const categories = await getCategories();
  const introText = await getIntroText();
  const introAudio = await getIntroAudio();
  const background = await getBackground();
  const logo = await getLogo();

  return (
    <main>
      {/* Wrap everything inside VisibilityProvider */}
      <TransitionProvider>
        <VisibilityProvider>
          <Intro
            projects={projects}
            categories={categories}
            introText={introText}
            introAudio={introAudio}
            background={background}
            logo={logo}
          />
        </VisibilityProvider>
      </TransitionProvider>
    </main>
  );
}
