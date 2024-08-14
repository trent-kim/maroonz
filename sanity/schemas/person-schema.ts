const person = {

    name: 'person',
    title: 'People',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'position',
            title: 'Position',
            type: 'array',
            of: [{type: 'reference', to: {type: 'position'}}]
        }
    ]
}

export default person;