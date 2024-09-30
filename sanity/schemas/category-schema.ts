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
        description: 'Category name based on the corresponding question (not displayed on website)'
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
        description: "A 'Yes or 'No' question phased where 'Yes' includes projects with this category and 'No' excludes projects with this category"
      },
    ]
}

export default category;