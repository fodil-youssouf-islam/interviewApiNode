import {Species} from "./Species";
import {Stat} from "./Stat";

export class PokemonWithStats {
    constructor(
        public name: String,
        public height: number,
        public base_experience: number,
        public averageBaseExperience: number,
        public id: number, sprite_img: string,
        public species: Species,
        public url: string,
        public stats: Array<Stat>) {
    }
} 
