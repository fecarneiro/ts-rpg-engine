import { Character } from "@/core/character/character";

const c = new Character({
  id: "char-1",
  name: "Knight",
  primary: {
    strength: 4,
    dexterity: 4,
    vitality: 5,
    intelligence: 1,
  },
});

console.log(c);
