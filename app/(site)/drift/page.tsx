// import { redirect } from "next/navigation";
import {
  getCategories,
  getProjects,
  getBlackCode,
  getLogo,
} from "@/sanity/sanity-utils";
import Experience from "../_components/experience";
import { VisibilityProvider } from "../_hooks/visibility-context";
import { TransitionProvider } from "../_hooks/transition-context";

export default async function Drift() {

  const projects = await getProjects();
  const categories = await getCategories();
  const blackCode = await getBlackCode();
  const logo = await getLogo();

  return (
    <main>
      <TransitionProvider>
        {/* Wrap everything inside VisibilityProvider */}
        <VisibilityProvider>
          <Experience
            projects={projects}
            categories={categories}
            blackCode={blackCode}
            logo={logo}
          />
        </VisibilityProvider>
      </TransitionProvider>
    </main>
  );
}
