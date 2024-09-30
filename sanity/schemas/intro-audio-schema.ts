import { Rule } from '@sanity/types';

const introAudio = {

    name: 'introAudio',
    title: 'Intro Audio',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'For version history organization only (not displayed on website)',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'name',
            title: 'Artist Name',
            type: 'reference', 
            to: { type: 'person' },
            validation: (rule: Rule) => rule.required(),

        },
        {
            name: 'audio',
            title: 'Audio',
            type: 'file',
            options: {
                accept: 'audio/mpeg'
              },
            description: 'Audio used in the home page introduction after age verification. Must be an .mp3 file.',
            validation: (rule: Rule) => rule.required(),
        },
    ]
}

export default introAudio;