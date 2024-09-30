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
            description: 'Text left of the colon (:) using camelCase, or the name of what is being defined. For more info on camelCase: https://developer.mozilla.org/en-US/docs/Glossary/Camel_case',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'numberBoolean',
            title: 'Number or Boolean',
            type: 'boolean',
            description: "Is the value a number or a boolean ('true' or 'false')? Toggle right for 'Yes, the value is a number or a boolean' and toggle left for 'No, the value is text'. Because this code syntax is JSON based, this toggle determines the proper syntax for the value type- number and boolean values are not wrapped in quotations (\"\"), while text is wrapped in quotations (\"\"). For more info on JSON syntax: https://www.w3schools.com/js/js_json_syntax.asp",
            validation: (rule: Rule) => rule.required()
        },
        {
            name: 'value',
            title: 'Value',
            type: 'text',
            description: 'Text right of the colon (:)',
            validation: (rule: Rule) => rule.required(),
        }
    ]
}

export default blackCode;