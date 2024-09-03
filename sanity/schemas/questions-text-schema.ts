import { Rule } from '@sanity/types';

const questionsText = {

    name: 'questionsText',
    title: 'Questions Text',
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
            description: 'A short description of why the following questions are being during age verification (max 300 characters)'
        }
    ]
}

export default questionsText;