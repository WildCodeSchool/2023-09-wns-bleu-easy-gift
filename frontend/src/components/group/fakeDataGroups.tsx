// frontend/src/components/group/FakeDataGroups.tsx
import { Group } from '@/components/GroupCard'

export default function FakeDataGroups() {
    const link1 = '/'
    const group1: Group = {
        id: 1,
        name: 'Noel Martin 2024',
        event_date:
            'Tue Dec 24 2024 16:53:48 GMT+0000 (Coordinated Universal Time)',
        avatar: {
            id: 1,
            name: "Avatar de groupe avec papier d'emballage cadeau au couleurs psychédélique",
            url: 'https://ucarecdn.com/4ef50c61-0ad5-40ec-b649-0e16789931ce/-/preview/1000x1000/',
        },
        userToGroups: [
            {
                user: {
                    id: 1,
                    pseudo: 'Olga',
                    avatar: {
                        id: 1,
                        name: 'Avatar caricature kawaii de panda',
                        url: 'https://ucarecdn.com/f3546ab4-0edd-4470-90b9-f604c84266e1/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 2,
                    pseudo: 'Gilles',
                    avatar: {
                        id: 2,
                        name: 'Avatar caricature de raton laveur magicien',
                        url: 'https://ucarecdn.com/b75dffc7-7364-44eb-94db-486d2235849b/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 3,
                    pseudo: 'Morgane',
                    avatar: {
                        id: 3,
                        name: 'Avatar caricature kawaii de bébé girafe',
                        url: 'https://ucarecdn.com/74347f17-c04e-4e57-aafd-fc518ebd332e/-/preview/1000x1000/',
                    },
                },
            },
        ],
    }

    const link2 = '/'
    const group2: Group = {
        id: 2,
        name: 'Cousinade Mai 2025',
        event_date:
            'Sat May 17 2025 16:53:48 GMT+0000 (Coordinated Universal Time)',
        avatar: {
            id: 2,
            name: 'Avatar de groupe avec cadeau couleurs arc-en-ciel',
            url: 'https://ucarecdn.com/0d17da9c-ea08-4222-b689-1a53cdc185a1/-/preview/1000x1000/',
        },
        userToGroups: [
            {
                user: {
                    id: 4,
                    pseudo: 'Anne-Sophie',
                    avatar: {
                        id: 4,
                        name: 'Avatar caricature kawaii de chien fou',
                        url: 'https://ucarecdn.com/65e309fc-8f63-4a73-89ae-8d20df643c1d/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 5,
                    pseudo: 'Valentine',
                    avatar: {
                        id: 5,
                        name: 'Avatar caricature de raton laveur magicien',
                        url: 'https://ucarecdn.com/b75dffc7-7364-44eb-94db-486d2235849b/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 6,
                    pseudo: 'Agnès',
                    avatar: {
                        id: 6,
                        name: 'Avatar caricature kawaii de bébé cerf',
                        url: 'https://ucarecdn.com/f48d2104-77fa-471f-b6d6-202e370e6ed2/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 7,
                    pseudo: 'Aurélie',
                    avatar: {
                        id: 7,
                        name: 'Avatar caricature kawaii de bébé antilope alienne',
                        url: 'https://ucarecdn.com/f365407e-6995-4d74-a454-e4ad90d7fa6e/-/preview/1000x1000/',
                    },
                },
            },
        ],
    }

    const link3 = '/'
    const group3: Group = {
        id: 3,
        name: 'Noel Martin 2024',
        event_date:
            'Tue Dec 24 2024 16:53:48 GMT+0000 (Coordinated Universal Time)',
        avatar: {
            id: 3,
            name: "Avatar de groupe avec papier d'emballage cadeau sur fond bleu ciel et desserts roses",
            url: 'https://ucarecdn.com/adcacefd-41f7-4f50-b0d2-36a5ad9c2a75/-/preview/1000x1000/',
        },
        userToGroups: [
            {
                user: {
                    id: 8,
                    pseudo: 'Jérémie',
                    avatar: {
                        id: 8,
                        name: 'Avatar caricature kawaii de bébé guépard',
                        url: 'https://ucarecdn.com/af22f9a4-65f5-4a10-ab0d-98f30943c94d/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 9,
                    pseudo: 'Léopold',
                    avatar: {
                        id: 9,
                        name: 'Avatar caricature kawaii de bébé éléphant',
                        url: 'https://ucarecdn.com/65f237f2-af48-41c9-a62c-8615a24fa885/-/preview/1000x1000/',
                    },
                },
            },
            {
                user: {
                    id: 10,
                    pseudo: 'Justine',
                    avatar: {
                        id: 10,
                        name: 'Avatar caricature kawaii de chat avec de grands yeux ronds',
                        url: 'https://ucarecdn.com/165020a5-4ef7-4c22-9da8-b93def6f1610/-/preview/1000x1000/',
                    },
                },
            },
        ],
    }

    return { group1, link1, group2, link2, group3, link3 }
}
