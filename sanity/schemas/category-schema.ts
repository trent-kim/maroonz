import { Rule } from '@sanity/types';

const category = {

    name: 'category',
    title: 'Categories',
    type: 'document',
    fields: [
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'number',
        title: 'Order Number',
        type: 'number',
        validation: (rule: Rule) => rule.required().min(1),
        description: 'Number for the order in which each question is asked'
      },
      {
        name: 'question',
        title: 'Question',
        type: 'text',
      },
    ]
}

export default category;