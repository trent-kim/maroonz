import { Rule } from '@sanity/types';

const logo = {

    name: 'logo',
    title: 'Logo',
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
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Ensure .gif file has a transparent background',
            validation: (rule: Rule) => rule.required(),
        },


    ]
}

export default logo;