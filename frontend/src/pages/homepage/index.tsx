import React from "react";
import { Button } from "@/components/ui/button";
import MyGroups from "../../components/MyGroups";

function Home() {
  return (
    <>
      <section>
        <h1 className="">Easy Gift</h1>
        <p>
          Prêt à déclarer la guerre aux cadeaux ratés ? 🎁😅
          Et aux cafteurs ? 😮🤫
          Easy Gift à la rescousse! <br />
          <b>
            Organisez, échangez entre amis et trouvez "LA" pépite
          </b>
          sans prise de tête.
          C'est fun, c'est facile,... c'est cadeau !🎉</p>
        <Button>rejoins les Easy Gifteurs</Button>
      </section>
      <section>
        <article>
          <h2>Crée ton groupe</h2>
          <p>
            Fini les "oups,... tu n'as rien entendu !"🤭
            Parce que chez Easy Gift on aime les surprises, on a crée pour vous le premier espace dédié 100% confidentiel.
            Ce qui est dit dans une discussion Easy Gift <em>reste</em> sur Easy Gift... 😉
            L'aventure commence ici :
            <b>crée un groupe thématique pour chaque occasion spéciale</b> ... Fête de fin d'année, anniversaire, babyshower...
            et <b>retrouve instantanément toutes les discussions secrètes pour chaque membre</b>.
          </p>
          <Button>Essaie gratuitement</Button>
        </article>

      </section>
      <section>
        <h2>Tes groupes</h2>
        <p>Dans la famille thématique... je voudrais le groupe... </p>
        <MyGroups />
      </section>
    </>
  )
}

export default Home;
