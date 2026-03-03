import { Character } from "@core/character/Character";
import { WARRIOR } from "@domain/archetypes/Archetypes";

const c = new Character({
  id: "char-1",
  name: "Knight",
  characterClass: WARRIOR,
});

console.log(c);
