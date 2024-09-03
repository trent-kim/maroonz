const logo = {

    name: 'logo',
    title: 'Logo',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                
                }
            ]
        },


    ]
}

export default logo;