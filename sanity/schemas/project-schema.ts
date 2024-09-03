const project = {

    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            description: 'Auto-generate name for URL'
        },
        {
            name: 'name',
            title: 'Artist Name',
            type: 'reference', 
            to: { type: 'person' },
        },
        {
            name: 'year',
            title: 'Year',
            type: 'date',
            options: {
                dateFormat: 'YYYY',
              }
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}]
        },
        {
            name: 'image',
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                
                }
            ]
        },
        {
            name: 'video',
            title: 'Video',
            type: 'mux.video'
        },
        {
            name: 'text',
            title: 'Text',
            type: 'text',
            // of: [
            //     {
            //         type: 'block',
            //         // Only allow these block styles
            //         styles: [
            //         {title: 'Normal', value: 'normal'},
            //         ],
            //         // Only allow numbered lists
            //         lists: [
            //         {title: 'Numbered', value: 'number'}
            //         ],
            //         marks: {
            //         // Only allow these decorators
            //         decorators: [
                        
            //         ],
            //         annotations: [
                        
            //         ]
            //         }
            //     }
            //     ],
            description: 'Accompanying text, writing, or poetry [Note: This does not support text decorations]',
        }

    ]
}

export default project;