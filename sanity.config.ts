import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import schemas from './sanity/schemas'

const config = defineConfig({

    projectId: "ccrbuv2w",
    dataset: "production",
    title: "Maroon/z",
    apiVersion: "2024-08-05",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: { types: schemas}

})

export default config;