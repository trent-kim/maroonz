const introAudio = {

    name: 'introAudio',
    title: 'Intro Audio',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'name',
            title: 'Artist Name',
            type: 'reference', 
            to: { type: 'person' },
        },
        {
            name: 'audio',
            title: 'Audio',
            type: 'file',
            options: {
                accept: 'audio/mpeg'
              },
            description: 'Must be an .mp3 file'
        },
    ]
}

export default introAudio;