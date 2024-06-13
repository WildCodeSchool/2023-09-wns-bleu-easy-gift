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
import NewDiscussionComponent from '@/components/NewDiscussionComponent';

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
      <section className='mb-16 min-h-40 h-auto flex flex-initial flex-wrap content-start items-center my-0 mx-auto w-4/5 md:mb-28 md:min-h-130 md:justify-evenly md:max-w-2xl lg:mb-40 lg:max-w-4xl xl:min-h-0 xl:mb-20 xl:max-w-7xl 2xl:max-w-[1800px] 2xl:content-center 2xl:mb-40 2xl:min-h-130'>
        <div className='hidden relative w-full order-2 md:block  md:max-w-4xl md:min-w-96 lg:mb-24 lg:order-1 lg:max-w-xl:min-h-130 xl:max-w-lg xl:mb-0 2xl:max-w-3xl'>
          <Image
            src='/images/img-pages/hero-img.png'
            alt='hero of the page'
            layout='responsive'
            width={963}
            height={712}
            priority={false}
          />
        </div>
        <div className='h-auto mb-9 sm:max-w-2xl md:w-2/2 md:max-w-3xl lg:max-w-lg 2xl:max-w-2xl'>
          <h1 className='mb-10 text-4xl md:text-5xl md:mb-14 2xl::text-6xl font-bold text-primaryBlue'>
            Easy Gift
          </h1>
          <NewDiscussionComponent />
          <p className='mb-9 text-lg text-left md:mb-10 md:text-xl 2xl:text-2xl'>
            Prêt à déclarer la guerre aux cadeaux ratés 🎁😅 ?
            <br />
            <b>Organisez, échangez</b> entre ami(e)s et trouvez "LA" pépite sans
            prise de tête.
            <br />
            C'est fun, c'est facile,... c'est cadeau !🎉
          </p>
          <Button className='text-base h-9 rounded-md px-3 shadow-lg shadow-slate-400 md:h-11 md:text-lg md:px-8 2xl:h-14 2xl:px-10 2xl:text-2xl'>
            rejoins les Easy Gifteurs
          </Button>
        </div>
      </section>
      <section className='mb-28 mx-auto min-h-175 h-full bg-slate-200 flex flex-col justify-center items-center sm:min-h-160 md:min-h-170 lg:flex-wrap lg:flex-row lg:mb-32 lg:content-center lg:justify-around lg:min-h-140 2xl:pb-28 2xl:items-start 2xl:justify-center 2xl:mb-20 2xl:content-end 2xl:min-h-150 2xl:flex-row'>
        <h2 className='w-4/5 text-3xl mb-8 text-primaryRed sm:text-center md:mb-10 md:text-4xl lg:w-full lg:mb-14 font-bold 2xl:text-5xl 2xl:mt-0 2xl:mb-28'>
          Crée ton groupe
        </h2>
        <article className='w-4/5 sm:max-w-xl 2xl:ml-36 4xl:ml-52 lg:order-3'>
          <p className='mb-8 text-lg md:mb-10 md:text-xl  2xl:text-2xl 2xl:pt-12'>
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
            className='text-base h-9 mb-28 rounded-md px-3 shadow-lg shadow-slate-400 md:h-11 md:text-lg md:px-8 lg:mb-8 2xl:h-14 2xl:px-10 2xl:text-2xl'
          >
            Essaie gratuitement
          </Button>
        </article>
        <Carousel className='max-w-96 max-h-140 sm:max-w-xl 2xl:h-[576px] lg:order-2'>
          <CarouselPrevious className='top-[-25px] left-8 md:top-2/4'>
            Précédent
          </CarouselPrevious>
          <CarouselContent className='max-w-[600px] lg:max-w-[500px] max-h-[700px]'>
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
      {/* <section className="mb-40 mx-auto min-h-150 h-full flex flex-col justify-evenly items-center sm:min-h-160 lg:min-h-130 lg:flex-wrap lg:justify-evenly 2xl:justify-center 2xl:min-h-140 2xl:items-center 2xl:flex-row">
        <h2 className="w-4/5 text-3xl text-primaryRed mb-8  sm:text-center md:mb-10 md:text-4xl lg:w-full font-bold 2xl:mt-16 2xl:text-5xl">
          Tes groupes
        </h2>
        <p className="w-4/5 mb-8 text-lg text-center md:text-2xl md:mb-16 lg:mb-10 ">
          Dans la famille thématique... je voudrais le groupe...{" "}
        </p>
        <MyGroups />
      </section> */}
    </>
  );
}
