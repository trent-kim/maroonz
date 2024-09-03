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
            name: 'website',
            title: 'Personal Website',
            type: 'url',
            description: "Include 'https://' in URL"
        }
    ]
}

export default person;