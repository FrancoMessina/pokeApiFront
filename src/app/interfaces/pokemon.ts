export interface Pokemon {
    id: string;
    name: string;
    photoUrl: string;
    types: {
      type: {
        name: string;
        url: string;
      };
    }[];
    weight: number;
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      slot: number;
      hidden: boolean;
    }[];
    moves: any;
    description: string;
  }