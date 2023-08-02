export interface PokemonDetails {
    id: number;
    sprites: {
      other: {
        home: {
          front_shiny: string;
        };
      };
    };
    species: {
      name: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    base_experience: number;
    height: number;
    weight: number;
    stats: {
      base_stat: number;
    }[];
  }

 
  
