import { Rule } from '@sanity/types';

const person = {

    name: 'person',
    title: 'People',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: "Person's first and last name",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'website',
            title: 'Personal Website',
            type: 'url',
            description: "Include 'https://' in URL"
        }
    ]
}

export default person;