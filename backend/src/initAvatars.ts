import { Avatar } from './entities/avatar'
import db from './db'

export default async function initAvatars() {
    const yeti = Avatar.create({
        name: 'yeti',
        type: 'profil',
        url: 'https://ucarecdn.com/bb05bd7d-e0cc-49b1-867b-36aa9ff245f2/-/preview/1000x1000/',
    })

    const racoon2 = Avatar.create({
        name: 'racoon2',
        type: 'profil',
        url: 'https://ucarecdn.com/e3d93c3f-86bc-4a94-a6c7-93ef688f8f01/-/preview/1000x1000/',
    })

    const racoon3 = Avatar.create({
        name: 'racoon3',
        type: 'profil',
        url: 'https://ucarecdn.com/b75dffc7-7364-44eb-94db-486d2235849b/-/preview/1000x1000/',
    })

    const sloth = Avatar.create({
        name: 'sloth',
        type: 'profil',
        url: 'https://ucarecdn.com/a4174eb3-5a02-437c-9ce4-0be299535cbd/-/preview/1000x1000/',
    })

    const wolf = Avatar.create({
        name: 'wolf',
        type: 'profil',
        url: 'https://ucarecdn.com/6ba5233d-e199-4aa6-8e72-4d47ed32b8ba/-/preview/1000x1000/',
    })

    const simba = Avatar.create({
        name: 'simba',
        type: 'profil',
        url: 'https://ucarecdn.com/f902e518-59f4-4e4e-bb74-46fc9d1c9ff7/-/preview/1000x1000/',
    })

    const redPanda = Avatar.create({
        name: 'redPanda',
        type: 'profil',
        url: 'https://ucarecdn.com/9d95a5df-145c-4db3-a102-b82c55ceca38/-/preview/1000x1000/',
    })

    const puppy = Avatar.create({
        name: 'puppy',
        type: 'profil',
        url: 'https://ucarecdn.com/9d552056-33e7-4555-84ef-a5bf6f7dc0bf/-/preview/1000x1000/',
    })

    const rabbit = Avatar.create({
        name: 'rabbit',
        type: 'profil',
        url: 'https://ucarecdn.com/9522d617-588a-4b66-b8c8-1dbfe40426c4/-/preview/1000x1000/',
    })

    const panda2 = Avatar.create({
        name: 'panda2',
        type: 'profil',
        url: 'https://ucarecdn.com/167c7687-e584-469d-a4db-9297c0245b25/-/preview/1000x1000/',
    })

    const raccoon = Avatar.create({
        name: 'raccoon',
        type: 'profil',
        url: 'https://ucarecdn.com/4d71655c-f231-40f4-ad72-3a629418869c/-/preview/1000x1000/',
    })

    const panda3 = Avatar.create({
        name: 'panda3',
        type: 'profil',
        url: 'https://ucarecdn.com/f3546ab4-0edd-4470-90b9-f604c84266e1/-/preview/1000x1000/',
    })

    const panda = Avatar.create({
        name: 'panda',
        type: 'profil',
        url: 'https://ucarecdn.com/beb1818b-3726-4a90-9db0-563b8a2671c1/-/preview/1000x1000/',
    })

    const ori = Avatar.create({
        name: 'ori',
        type: 'profil',
        url: 'https://ucarecdn.com/e332d006-f80f-47c9-921b-195d9d1b205e/-/preview/1000x1000/',
    })

    const gremlin = Avatar.create({
        name: 'gremlin',
        type: 'profil',
        url: 'https://ucarecdn.com/8a041874-3a15-43cf-a5ff-981f1863fbc5/-/preview/1000x1000/',
    })

    const koala = Avatar.create({
        name: 'koala',
        type: 'profil',
        url: 'https://ucarecdn.com/9dab743e-7860-4603-850f-64e5c344ae1a/-/preview/1000x1000/',
    })

    const mice = Avatar.create({
        name: 'mice',
        type: 'profil',
        url: 'https://ucarecdn.com/28166e78-6e0f-4318-9a21-bc28ffac5abd/-/preview/1000x1000/',
    })

    const girafe = Avatar.create({
        name: 'girafe',
        type: 'profil',
        url: 'https://ucarecdn.com/74347f17-c04e-4e57-aafd-fc518ebd332e/-/preview/1000x1000/',
    })

    const ghibli2 = Avatar.create({
        name: 'ghibli2',
        type: 'profil',
        url: 'https://ucarecdn.com/4efb4fd3-382c-4734-86ae-23eb62594036/-/preview/1000x1000/',
    })

    const ghibli = Avatar.create({
        name: 'ghibli',
        type: 'profil',
        url: 'https://ucarecdn.com/93e16599-6133-4d2b-a3e3-bd4c2aef6da9/-/preview/1000x1000/',
    })

    const girafe2 = Avatar.create({
        name: 'girafe2',
        type: 'profil',
        url: 'https://ucarecdn.com/1dc866d1-82a6-489b-b504-98007a242cdb/-/preview/1000x1000/',
    })

    const alien = Avatar.create({
        name: 'alien',
        type: 'profil',
        url: 'https://ucarecdn.com/f365407e-6995-4d74-a454-e4ad90d7fa6e/-/preview/1000x1000/',
    })

    const fantasy = Avatar.create({
        name: 'fantasy',
        type: 'profil',
        url: 'https://ucarecdn.com/a9af99a9-529c-4e0d-8633-9cb4a730413d/-/preview/1000x1000/',
    })

    const dog = Avatar.create({
        name: 'dog',
        type: 'profil',
        url: 'https://ucarecdn.com/65e309fc-8f63-4a73-89ae-8d20df643c1d/-/preview/1000x1000/',
    })

    const elephant = Avatar.create({
        name: 'elephant',
        type: 'profil',
        url: 'https://ucarecdn.com/65f237f2-af48-41c9-a62c-8615a24fa885/-/preview/1000x1000/',
    })

    const cheetah = Avatar.create({
        name: 'cheetah',
        type: 'profil',
        url: 'https://ucarecdn.com/af22f9a4-65f5-4a10-ab0d-98f30943c94d/-/preview/1000x1000/',
    })

    const deer = Avatar.create({
        name: 'deer',
        type: 'profil',
        url: 'https://ucarecdn.com/f48d2104-77fa-471f-b6d6-202e370e6ed2/-/preview/1000x1000/',
    })

    const cat = Avatar.create({
        name: 'cat',
        type: 'profil',
        url: 'https://ucarecdn.com/940c4cf7-f1dc-48f0-a559-388d4eddef72/-/preview/1000x1000/',
    })

    const bunny = Avatar.create({
        name: 'bunny',
        type: 'profil',
        url: 'https://ucarecdn.com/78f54964-d830-426c-8e91-e1f60badbfa0/-/preview/1000x1000/',
    })

    const cat1 = Avatar.create({
        name: 'cat1',
        type: 'profil',
        url: 'https://ucarecdn.com/165020a5-4ef7-4c22-9da8-b93def6f1610/-/preview/1000x1000/',
    })

    const cat2 = Avatar.create({
        name: 'cat2',
        type: 'profil',
        url: 'https://ucarecdn.com/f74f7d0e-a540-4eb3-9564-7a5c080536ca/-/preview/1000x1000/',
    })

    await yeti.save()
    await racoon2.save()
    await racoon3.save()
    await sloth.save()
    await wolf.save()
    await simba.save()
    await redPanda.save()
    await puppy.save()
    await rabbit.save()
    await panda2.save()
    await raccoon.save()
    await panda3.save()
    await panda.save()
    await ori.save()
    await gremlin.save()
    await koala.save()
    await mice.save()
    await girafe.save()
    await ghibli2.save()
    await ghibli.save()
    await girafe2.save()
    await alien.save()
    await fantasy.save()
    await dog.save()
    await elephant.save()
    await cheetah.save()
    await deer.save()
    await cat.save()
    await bunny.save()
    await cat1.save()
    await cat2.save()
}
