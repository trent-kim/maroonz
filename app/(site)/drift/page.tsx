// import { redirect } from "next/navigation";
import {
  getBackground,
  getCategories,
  getProjects,
  getBlackCode,
  getLogo,
} from "@/sanity/sanity-utils";
import Experience from "../_components/experience";
import { VisibilityProvider } from "../_hooks/visibility-context";
import { TransitionProvider } from "../_hooks/transition-context";

export default async function Drift() {
//   // Check session storage from the server-side
//   if (typeof window !== "undefined") {
//     const savedIsSubmitted = sessionStorage.getItem("isSubmitted");

//     if (
//       !savedIsSubmitted 
//     ) {
//       // Redirect back to the home page if preferences are missing or incomplete
//       redirect("/");
//     }
//   }

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
