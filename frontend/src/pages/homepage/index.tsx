import React from "react";
import { Button } from "@/components/ui/button";
import MyGroups from "../../components/MyGroups";
import Image from "next/image";



function Home() {
  return (
    <>
      <section className="mb-40 min-h-130 h-auto flex flex-initial flex-wrap justify-evenly items-center my-0 mx-auto max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-[1800px]">
        <div className="relative mb-24 w-full sm:min-w-96 md:max-w-4xl lg:max-w-4xl:min-h-130">
          <Image
            src="/images/img-pages/hero-img.png"
            alt="hero of the page"
            layout="responsive"
            width={963}
            height={712}
            priority={false}
          />
        </div>
        <div className="h-auto sm:max-w-2xl md:w-4/5 md:max-w-4xl lg:w-auto">
          <h1 className="mb-10 text-5xl md:mb-14 md:text-6xl font-bold text-primaryBlue">Easy Gift</h1>
          <p className="mb-9 text-lg text-justify md:mb-10 md:text-2xl">
            Prêt à déclarer la guerre aux cadeaux ratés 🎁😅 ?
            <br />
            <b>Organisez, échangez</b> entre ami(e)s et trouvez "LA" pépite sans prise de tête.
            <br />
            C'est fun, c'est facile,... c'est cadeau !🎉
          </p>
          <Button className="text-base h-9 rounded-md px-3 md:h-11 md:text-lg md:px-8 xl:h-14 xl:px-10 xl:text-2xl">
            rejoins les Easy Gifteurs
          </Button>
        </div>
      </section>
      <section className="mb-40 mx-auto min-h-160 h-full bg-slate-200 flex flex-col justify-evenly items-center  md:min-h-165 lg:min-h-170 2xl:justify-center 2xl:min-h-140 2xl:flex-row">
        <article className="w-4/5 sm:max-w-xl 2xl:mr-36 4xl:mr-52">
          <h2 className="mb-8 text-3xl md:text-4xl font-bold text-primaryRed">Crée ton groupe</h2>
          <p className="mb-8 text-lg md:mb-10 md:text-2xl">
            Fini les "oups,... tu n'as rien entendu !"🤭
            <br />
            Parce que chez Easy Gift on aime les surprises, on a crée pour vous le premier espace dédié 100% confidentiel.
            Ce qui est dit dans une discussion Easy Gift <em>reste</em> sur Easy Gift... 😉
            <br />
            L'aventure commence ici :
            <b> crée un groupe thématique</b> pour chaque occasion.
            <br />
            Fête de fin d'année, anniversaire, babyshower...
            et <b>retrouve instantanément toutes les discussions secrètes pour chaque membre</b>.
          </p>
          <Button className="text-base h-9 rounded-md px-3
          md:h-11 md:text-lg md:px-8 xl:h-14 xl:px-10 xl:text-2xl">Essaie gratuitement</Button>
        </article>
        <div className="bg-slate-600 max-w-96 max-h-140 sm:max-w-xl xl:max-w-2xl">
          <Image
            src="/images/img-pages/messenger.png"
            alt="hero of the page"
            layout="responsive"
            width={120}
            height={150}
            priority={false}
          />
        </div>
      </section>
      <section className="lg:h-auto my-0 mx-auto max-w-xs sm:max-w-md md:max-w-lg md:h- lg:max-w-xl xl:max-w-2xl 2xl:max-w-[1400px]">
        <h2>Tes groupes</h2>
        <p>Dans la famille thématique... je voudrais le groupe... </p>
        <MyGroups />
      </section>
    </>
  )
}

export default Home;
