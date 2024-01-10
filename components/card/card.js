export default function createCharacterCard(props) {
  const { image, name, status, episode, species } = props;

  const characterCard = document.createElement("li");
  characterCard.classList.add("card");
  characterCard.innerHTML = `
        <div class="card__image-container">
        <img
          class="card__image"
          src="${image}"
          alt="${name}"
        />
        <div class="card__image-gradient"></div>
      </div>
      <div class="card__content">
        <h2 class="card__title">${name}</h2>
        <dl class="card__info">
          <dt class="card__info-title">Status:</dt>
          <dd class="card__info-description">${status}</dd>
          <dt class="card__info-title">Occurrences:</dt>
          <dd class="card__info-description">${episode.length}</dd>
          <dt class="card__info-title">Species</dt>
          <dd class="card__info-description">${species}</dd>
        </dl>
      </div>
    `;

  return characterCard;
}
