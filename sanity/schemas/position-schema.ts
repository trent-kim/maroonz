import { Rule } from '@sanity/types';

const position = {

    name: 'position',
    title: 'Positions',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'number',
        title: 'Order Number',
        type: 'number',
        validation: (rule: Rule) => rule.required().min(1),
        description: 'Number for the order in which each position is listed'
      },
      {
        name: 'people',
        title: 'Person/People',
        type: 'array',
        of: [{type: 'reference', to: {type: 'person'}}]
      },
    ]
}

export default position;