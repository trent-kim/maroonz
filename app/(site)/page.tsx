import Image from "next/image";
import { getCategories, getProjects } from "@/sanity/sanity-utils";
import Typewriter from "./_components/typewriter";
import DriftMarquee from "./_components/drift-marquee";
import AgeVerification from "./_components/age-verification";
import Questions from "./_components/questions";

export default async function Home() {
  const projects = await getProjects();
  const categories = await getCategories();
  return (
    <main className="grid grid-cols-5 grid-rows-4 gap-md p-md h-[100vh]">
      {/* <div className="... border border-black">Nav</div> */}
      <div className="col-start-3 flex flex-col gap-md">
        <div className="font-serif font-bold text-lg text-white flex justify-center">
          <div>MAROON/</div>
          <div className="scale-x-[-1]">s</div>
        </div>
        {/* <div
          className="relative w-[max-content] font-body before:absolute before:inset-0 before:animate-typewriter before:bg-white after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-black"
        >
          Maroon/z is a research-based archive, indexing alternative futures for Queer(ed) folx in the African Diaspora.
        </div> */}
        <Typewriter text="Maroon/z is a research-based archive, indexing alternative futures for Queer(ed) folx in the African Diaspora." speed={150} />
      </div>

      {/* Questions */}
          <Questions categories={categories} projects={projects}/>
      {/* / Questions */}

      {/* Intro Audio */}
      {/* <div className="row-start-3 col-start-1 content-end">
          <audio controls src="../public/rain-audio.mp3"></audio>
      </div> */}
      {/* / Intro Audio */}

      {/* Age Verification */}
      <div className="row-start-4 col-start-3 content-end">
        <AgeVerification/>
      </div>
      {/* / Age Verification */}

      {/* Drift Marquee */}
      {/* <div className="row-start-4 col-start-3 content-end">
        <DriftMarquee/>
      </div> */}
      {/* / Drift Marquee */}
      <div className="row-start-1 col-start-1 border">
      {projects?.map(({title}, index) => (
        <div key={index}>{index}. {title}</div>
      ) )}
      {categories.map(({category}, index) => {
        console.log('length', projects.length)
        return <div key={index}>{index}. {category}</div>
 } )}
      </div>
    </main>
  );
}
