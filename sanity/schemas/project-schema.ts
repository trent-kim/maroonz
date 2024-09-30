import { Rule } from '@sanity/types';

const project = {

    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            description: 'Auto-generate name for URL',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'name',
            title: 'Artist Name',
            type: 'reference', 
            to: { type: 'person' },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'year',
            title: 'Year',
            type: 'date',
            options: {
                dateFormat: 'YYYY',
            },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'image',
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
            description: "A still image of the video used in 'Archive'",
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'A visual description of the image'
                }
            ],
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'video',
            title: 'Video',
            type: 'mux.video',
            description: "For settings, use 'Baseline' only",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'text',
            title: 'Text',
            type: 'text',
            description: 'Accompanying text, writing, or poetry [Note: This does not support text decorations i.e. italics, bold, underline]',
        }

    ]
}

export default project;