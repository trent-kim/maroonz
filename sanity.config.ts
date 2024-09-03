import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import {muxInput} from 'sanity-plugin-mux-input'
import schemas from './sanity/schemas'

const config = defineConfig({

    projectId: "ccrbuv2w",
    dataset: "production",
    title: "Maroon/z",
    apiVersion: "2024-08-05",
    basePath: "/admin",
    plugins: [structureTool(), muxInput()],
    schema: { types: schemas}

})

export default config;