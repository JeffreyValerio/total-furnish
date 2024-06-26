import React from 'react'
import { CollectionCard } from '..'

const collections = [
    {
        title: 'Beds',
        description: 'Assumenda temporibus quidem ipsam. fuga corporis iusto similique voluptates sint quibusdam.',
        image: '/images/beds.jpg',
        features: [
            'Various Types of Bedroom',
            'Different Size of Bed',
            'Comfortable and Clean Room'
        ],
        url: '/rooms'
    },
    {
        title: 'Cocinas',
        description: 'Assumenda temporibus quidem ipsam. fuga corporis iusto similique voluptates sint quibusdam.',
        image: '/images/kitchen.jpg',
        features: [
            'Various Types of Bedroom',
            'Different Size of Bed',
            'Comfortable and Clean Room'
        ],
        url: '/rooms'
    },
    {
        title: 'Habitaciones',
        description: 'Assumenda temporibus quidem ipsam. fuga corporis iusto similique voluptates sint quibusdam.',
        image: '/images/rooms.jpg',
        features: [
            'Various Types of Bedroom',
            'Different Size of Bed',
            'Comfortable and Clean Room'
        ],
        url: '/rooms'
    },
]
export const Collections = () => {
    return (
        <div className="bg-antiflashWhite">
            <div className='py-20 max-width'>
                <h2 className='mb-10'>Colecciones</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
                    {collections.map((collection) => (
                        <React.Fragment key={collection.url}>
                            <CollectionCard {...collection} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
