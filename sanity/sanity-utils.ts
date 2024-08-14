import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Category } from "@/types/Category";

export async function getProjects(): Promise<Project[]> {

  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
        
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            name,
            "categories": categories[]->category,
            "image": image.asset->url,
            vimeoUrl,
            text
        }`
  );
};

export async function getCategories(): Promise<Category[]> {

    return createClient(clientConfig).fetch(
        groq`*[_type == "category"]{
            
                _id,
                _createdAt,
                category,
                number,
                question
            } | order(number asc)`
    );
};
