import { Rule } from '@sanity/types';

const blackCode = {

    name: 'blackCode',
    title: 'Black Code',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Text left of colon (:) using camelCase'
        },
        {
            name: 'numberBoolean',
            title: 'Number or Boolean',
            type: 'boolean',
            description: "Is the value a number or a boolean ('true' or 'false')? Toggle right for 'Yes, the value is a number or a boolean' and toggle left for 'No, the value is text'",
            validation: (rule: Rule) => rule.required()
        },
        {
            name: 'value',
            title: 'Value',
            type: 'text',
            description: 'Text right of colon (:)'
        }
    ]
}

export default blackCode;