import { redirect } from 'next/navigation';
import { getBackground, getCategories, getIntroText, getProjects, getBlackCode, getLogo } from "@/sanity/sanity-utils";
import ArchiveContainer from '../_components/archive-container';
import { TransitionProvider } from '../_hooks/transition-context';

export default async function Drift() {
  // Check session storage from the server-side
  if (typeof window !== "undefined") {
    const savedPreferences = sessionStorage.getItem("preferences");

    if (!savedPreferences || !JSON.parse(savedPreferences).every((pref: { value: boolean }) => typeof pref.value === "boolean")) {
      // Redirect back to the home page if preferences are missing or incomplete
      redirect('/');
    }
  }

  const projects = await getProjects();
  const categories = await getCategories();
  const logo = await getLogo();

  return (
    <main>
      <TransitionProvider>
       <ArchiveContainer projects={projects} categories={categories} logo={logo}/>
       </TransitionProvider>
    </main>
  );
}