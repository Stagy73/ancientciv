import React from "react";

const About = () => {
  return (
    <div className="about-page p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">À propos de Codex Arcana</h1>

      <p className="mb-4">
        <strong>Codex Arcana</strong> est un jeu de cartes stratégique basé sur
        les légendes occultes des Anunnaki, des Reptiliens, des Hybrides et des
        civilisations perdues. Explorez les mystères de l’humanité, des origines
        cachées et des puissances antiques.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Les Légendes</h2>

      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Les Anunnaki :</strong> Dieux créateurs venus d’un autre
          monde, maîtres des technologies interdites. Ils ont manipulé le génome
          humain pour asservir l’humanité. Certains cherchent encore à dominer,
          d’autres protègent secrètement les hommes.
        </li>

        <li>
          <strong>Les Reptiliens :</strong> Premiers habitants de la Terre,
          êtres reptiliens évolués vivant autrefois à la surface. Ils veulent
          restaurer l’environnement de leur époque, quitte à sacrifier les
          humains.
        </li>

        <li>
          <strong>Les Hybrides :</strong> Fusion des lignées humaines,
          reptiliennes et anunnaki, ils naviguent entre les mondes, ni
          totalement loyaux, ni totalement corrompus.
        </li>

        <li>
          <strong>Les Atlantes :</strong> Héritiers des savoirs anciens, ils
          détiennent des artefacts surpuissants, mais leurs intentions restent
          floues.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Votre Mission</h2>

      <p className="mb-4">
        Choisissez votre lignée, formez votre deck, et combattez pour la survie
        de votre civilisation. Débloquez des cartes secrètes, des artefacts
        légendaires, et révélez la vérité cachée derrière les mythes.
      </p>

      <p className="text-center font-bold mt-6">
        🔮 Codex Arcana – Le destin est entre vos mains 🔮
      </p>
    </div>
  );
};

export default About;
