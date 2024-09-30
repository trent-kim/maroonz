import { Rule } from '@sanity/types';

const introText = {

    name: 'introText',
    title: 'Intro Text',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule: Rule) => rule.required().max(300),
            description: 'A short description of Maroon/z to be displayed throughout the home page experience (max 300 characters)'
        }
    ]
}

export default introText;