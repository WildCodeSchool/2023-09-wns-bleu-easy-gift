import { Inter } from 'next/font/google';
import React from 'react';
import { Button } from '@/components/ui/button';
import MyGroups from '@/components/MyGroups';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useRouter } from 'next/router';
import { checkUserConnected } from '@/utils/checkConnection';

export default function Home() {
  const router = useRouter();
  const isConnected = checkUserConnected();

  const handleButtonClick = () => {
    if (isConnected) {
      router.push('/creating-groups');
    } else {
      router.push('/auth/login');
    }
  };
  return (
    <>
      <section className='mb-40 min-h-130 h-auto flex flex-initial flex-wrap justify-evenly items-center my-0 mx-auto w-4/5  md:max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-[1800px]'>
        <div className='relative mb-24 w-full sm:min-w-96 md:max-w-4xl lg:max-w-4xl:min-h-130'>
          <Image
            src='/images/img-pages/hero-img.png'
            alt='hero of the page'
            layout='responsive'
            width={963}
            height={712}
            priority={false}
          />
        </div>
        <div className='h-auto sm:max-w-2xl md:w-4/5 md:max-w-4xl lg:w-auto'>
          <h1 className='mb-10 text-5xl md:mb-14 md:text-6xl font-bold text-primaryBlue'>
            Easy Gift
          </h1>
          <p className='mb-9 text-lg text-justify md:mb-10 md:text-2xl'>
            Prêt à déclarer la guerre aux cadeaux ratés 🎁😅 ?
            <br />
            <b>Organisez, échangez</b> entre ami(e)s et trouvez "LA" pépite sans
            prise de tête.
            <br />
            C'est fun, c'est facile,... c'est cadeau !🎉
          </p>
          <Button className='text-base h-9 rounded-md px-3 shadow-lg shadow-slate-400 md:h-11 md:text-lg md:px-8 xl:h-14 xl:px-10 xl:text-2xl'>
            rejoins les Easy Gifteurs
          </Button>
        </div>
      </section>
      <section className='mb-14 mx-auto min-h-180 h-full bg-slate-200 flex flex-col justify-center items-center sm:min-h-160 md:min-h-165 lg:min-h-170 lg:flex-wrap 2xl:items-start 2xl:justify-center 2xl:min-h-140 2xl:flex-row'>
        <h2 className='w-4/5 text-3xl text-primaryRed mb-10 sm:text-center md:text-4xl lg:w-full font-bold 2xl:mt-16 2xl:text-5xl'>
          Crée ton groupe
        </h2>
        <article className='w-4/5 sm:max-w-xl 2xl:mr-36 4xl:mr-52'>
          <p className='mb-8 text-lg md:mb-10 md:text-2xl 2xl:pt-12'>
            Fini les "oups,... tu n'as rien entendu !"🤭
            <br />
            Parce que chez Easy Gift on aime les surprises, on a crée pour vous
            le premier espace dédié 100% confidentiel. Ce qui est dit dans une
            discussion Easy Gift <em>reste</em> sur Easy Gift... 😉
            <br />
            L'aventure commence ici :<b> crée un groupe thématique</b> pour
            chaque occasion.
            <br />
            Fête de fin d'année, anniversaire, babyshower... et{' '}
            <b>
              retrouve instantanément toutes les discussions secrètes pour
              chaque membre
            </b>
            .
          </p>
          <Button
            onClick={handleButtonClick}
            className='text-base h-9 rounded-md px-3 mb-28 shadow-lg shadow-slate-400
        md:h-11 md:text-lg md:px-8 xl:h-14 xl:px-10 xl:text-2xl'
          >
            Essaie gratuitement
          </Button>
        </article>
        <Carousel className='max-w-96 max-h-140 sm:max-w-xl xl:max-w-2xl'>
          <CarouselPrevious className='top-[-25px] left-8 md:top-2/4'>
            Précédent
          </CarouselPrevious>
          <CarouselContent className='max-w-[600px] max-h-[700px]'>
            <CarouselItem className='max-w-[700px] max-h-[500px]'>
              <img
                src='/images/img-pages/chat-mobile-mockup.png'
                alt=''
                className='object-contain w-full h-full'
              />
            </CarouselItem>
            <CarouselItem className='max-w-[700px] max-h-[500px]'>
              <img
                src='/images/img-pages/messenger.png'
                alt=''
                className='object-contain w-full h-full'
              />
            </CarouselItem>
            <CarouselItem className='max-w-[700px] max-h-[500px]'>
              <img
                src='/images/img-pages/man-with-a-gift.webp'
                alt=''
                className='object-contain w-full h-full'
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext className='top-[-25px] right-8 md:top-2/4'>
            Suivant
          </CarouselNext>
        </Carousel>
      </section>
      <section className='mb-40 mx-auto min-h-150 h-full flex flex-col justify-evenly items-center sm:min-h-160 lg:flex-wrap lg:justify-center 2xl:justify-center 2xl:min-h-140 2xl:items-center 2xl:flex-row'>
        <h2 className='w-4/5 text-3xl text-primaryRed mb-10 sm:text-center md:text-4xl lg:w-full font-bold 2xl:mt-16 2xl:text-5xl'>
          Tes groupes
        </h2>
        <p className='w-4/5 mb-8 text-lg text-center md:text-2xl md:mb-16 lg:mb-10 '>
          Dans la famille thématique... je voudrais le groupe...{' '}
        </p>
        <MyGroups />
      </section>
    </>
  );
}
