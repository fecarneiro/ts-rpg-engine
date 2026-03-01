import { Character } from "@core/character/Character";
import { WARRIOR } from "@domain/character/characterClasses";

const c = new Character({
  id: "char-1",
  name: "Knight",
  characterClass: WARRIOR,
});

console.log(c);
