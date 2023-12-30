export const cardImages = [
  "🌷",
  "🎮",
  "🧸",
  "👽",
  "👻",
  "🍔",
  "🍉",
  "💀",
  "❤️",
  "🐱",
  "🐶",
];

export const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((content, index) => ({ content, id: index, matched: false }));

  const rotatedCards = shuffledCards.map((card) => {
    let randomRotation = Math.floor(Math.random() * 30) - 15;
    while (randomRotation === 0) {
      randomRotation = Math.floor(Math.random() * 30) - 15;
    }
    console.log(randomRotation)
    return { ...card, rotation: randomRotation };
  });

  return rotatedCards;
};
