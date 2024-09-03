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
            description: 'For organization only (not displayed)'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule: Rule) => rule.max(300),
            description: 'A short description of Maroon/z to be displayed during age verification (max 300 characters)'
        }
    ]
}

export default introText;