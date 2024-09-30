import { Rule } from '@sanity/types';

const background = {

    name: 'background',
    title: 'Background',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'For version history organization only (not displayed on website)',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'video',
            title: 'Video',
            type: 'mux.video',
            validation: (rule: Rule) => rule.required(),
        },


    ]
}

export default background;