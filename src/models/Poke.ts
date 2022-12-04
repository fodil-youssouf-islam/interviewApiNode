import {Species} from "./Species";
import {Stat} from "./Stat";

export interface Poke {
    abilities: any[],
    base_experience: number,
    forms: any[],
    game_indices: any[],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
    location_area_encounters: any,
    moves: any[],
    name: string,
    order: number,
    past_types: [],
    species: Species,
    sprites: any,
    stats: Array<Stat>,
    types: Array<{ slot: number, type: Species }>,//{slot:number,type:Species}[],
    weight: number,
}

  
