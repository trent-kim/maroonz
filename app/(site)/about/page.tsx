import { getIntroAudio, getBackground, getCategories, getIntroText, getProjects, getLogo, getPosition, getAboutText } from "@/sanity/sanity-utils";
import AboutContainer from "../_components/about-container";
import { TransitionProvider } from "../_hooks/transition-context";


export default async function About() {
  const projects = await getProjects();
  const categories = await getCategories();
  const introText = await getIntroText();
  const introAudio = await getIntroAudio();
  const background = await getBackground();
  const logo = await getLogo();
  const positions = await getPosition();
  const aboutText = await getAboutText();

  return (
    <main>
        <TransitionProvider>
        <AboutContainer projects={projects} categories={categories} introText={introText} introAudio={introAudio} background={background} logo={logo} positions={positions} aboutText={aboutText}/>
        </TransitionProvider>
    </main>
  );
}