import { Rule } from '@sanity/types';

const aboutText = {

    name: 'aboutText',
    title: 'About Text',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'For version history organization only (not displayed)',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: "A full description of Maroon/z to be displayed on the 'About' page",
            validation: (rule: Rule) => rule.required(),
        }
    ]
}

export default aboutText;