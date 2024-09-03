import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Category } from "@/types/Category";
import { IntroText } from "@/types/IntroText";
import { Person } from "@/types/Person";
import { Background } from "@/types/Background";
import { BlackCode } from "@/types/BlackCode";
import { Logo } from "@/types/Logo";
import { IntroAudio } from "@/types/IntroAudio";
import { Position } from "@/types/Position";
import { AboutText } from "@/types/AboutText";


export async function getProjects(): Promise<Project[]> {

  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
        
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "name": name->name,
            year,
            "categories": categories[]->category,
            "image": image.asset->url,
            "video": video.asset->playbackId,
            text,
        } | order(year asc) | order(title asc)`,
        {},
         { next : { revalidate : 3600 }}
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
            } | order(number asc)`,
            {},
             { next : { revalidate : 3600 }}
    );
};

export async function getLogo(): Promise<Logo[]> {

  return createClient(clientConfig).fetch(
    groq`*[_type == "logo"]{
        
            _id,
            _createdAt,
            title,
            "image": image.asset->url,
        }`,
        {},
         { next : { revalidate : 3600 }}
  );
};

export async function getBackground(): Promise<Background[]> {

  return createClient(clientConfig).fetch(
    groq`*[_type == "background"]{
        
            _id,
            _createdAt,
            title,
            "video": video.asset->playbackId,
        }`,
        {},
         { next : { revalidate : 3600 }}
  );
};

export async function getIntroText(): Promise<IntroText[]> {

  return createClient(clientConfig).fetch(
      groq`*[_type == "introText"]{
          
              _id,
              _createdAt,
              title,
              description,
          } |  order(_updatedAt desc)`,
          {},
          { next : { revalidate : 3600 }}
  );
};

export async function getPosition(): Promise<Position[]> {

  return createClient(clientConfig).fetch(
      groq`*[_type == "position"]{
          
              _id,
              _createdAt,
              title,
              number,
              people[]-> | order(name asc),
          } | order(number asc)`,
          {},
          { next : { revalidate : 3600 }}
  );
};

export async function getIntroAudio(): Promise<IntroAudio[]> {

  return createClient(clientConfig).fetch(
      groq`*[_type == "introAudio"]{
          
              _id,
              _createdAt,
              _updatedAt,
              title,
              "name": name->name,
              "audio": audio.asset->url,
          } |  order(_updatedAt desc)`,
          {},
          { next : { revalidate : 3600 }}
  );
}

export async function getBlackCode(): Promise<BlackCode[]> {

  return createClient(clientConfig).fetch(
      groq`*[_type == "blackCode"]{
          
              _id,
              _createdAt,
              name,
              numberBoolean,
              value,
          } |  order(_updatedAt desc)`,
          {},
          { next : { revalidate : 3600 }}
  );
};

export async function getAboutText(): Promise<AboutText[]> {

  return createClient(clientConfig).fetch(
      groq`*[_type == "aboutText"]{
          
              _id,
              _createdAt,
              title,
              description,
          } |  order(_updatedAt desc)`,
          {},
          { next : { revalidate : 3600 }}
  );
};