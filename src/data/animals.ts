export interface Animal {
  id: string;
  name: string;
  imageUrl: string;
  hasFur: boolean;
  canFly: boolean;
  laysEggs: boolean;
  hasFins: boolean;
  isPredator: boolean;
  warmBlooded: boolean;
  animalClass: string; 
}

// In Vite  public folder as the root (/)
const urlPrefix = '/animals/';

export const animals: Animal[] = [
  { id: '1',  name: 'Eagle',     imageUrl: `${urlPrefix}eagle.svg`,     hasFur: false, canFly: true,  laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: true,  animalClass: 'Bird' },
  { id: '2',  name: 'Lizard',    imageUrl: `${urlPrefix}lizard.svg`,    hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: false, animalClass: 'Reptile' },
  { id: '3',  name: 'Salmon',    imageUrl: `${urlPrefix}salmon.svg`,    hasFur: false, canFly: false, laysEggs: true,  hasFins: true,  isPredator: false, warmBlooded: false, animalClass: 'Fish' },
  { id: '4',  name: 'Bat',       imageUrl: `${urlPrefix}bat.svg`,       hasFur: true,  canFly: true,  laysEggs: false, hasFins: false, isPredator: false, warmBlooded: true,  animalClass: 'Mammal' },
  { id: '5',  name: 'Dolphin',   imageUrl: `${urlPrefix}dolphin.svg`,   hasFur: false, canFly: false, laysEggs: false, hasFins: true,  isPredator: true,  warmBlooded: true,  animalClass: 'Mammal' },
  { id: '6',  name: 'Penguin',   imageUrl: `${urlPrefix}penguin.svg`,   hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: true,  animalClass: 'Bird' },
  { id: '7',  name: 'Platypus',  imageUrl: `${urlPrefix}platypus.svg`,  hasFur: true,  canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: true,  animalClass: 'Mammal' },
  { id: '8',  name: 'Butterfly', imageUrl: `${urlPrefix}butterfly.svg`, hasFur: false, canFly: true,  laysEggs: true,  hasFins: false, isPredator: false, warmBlooded: false, animalClass: 'Insect' },
  { id: '9',  name: 'Bear',      imageUrl: `${urlPrefix}bear.svg`,      hasFur: true,  canFly: false, laysEggs: false, hasFins: false, isPredator: true,  warmBlooded: true,  animalClass: 'Mammal' },
  { id: '10', name: 'Goldfish',  imageUrl: `${urlPrefix}goldfish.svg`,  hasFur: false, canFly: false, laysEggs: true,  hasFins: true,  isPredator: false, warmBlooded: false, animalClass: 'Fish' },

  // --- Edge Cases ---
  { id: '11', name: 'Elephant',  imageUrl: `${urlPrefix}elephant.svg`,  hasFur: false, canFly: false, laysEggs: false, hasFins: false, isPredator: false, warmBlooded: true,  animalClass: 'Mammal' },
  { id: '12', name: 'Ostrich',   imageUrl: `${urlPrefix}ostrich.svg`,   hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: false, warmBlooded: true,  animalClass: 'Bird' },
  { id: '13', name: 'Shark',     imageUrl: `${urlPrefix}shark.svg`,     hasFur: false, canFly: false, laysEggs: false, hasFins: true,  isPredator: true,  warmBlooded: false, animalClass: 'Fish' },
  { id: '14', name: 'Seal',      imageUrl: `${urlPrefix}seal.svg`,      hasFur: true,  canFly: false, laysEggs: false, hasFins: true,  isPredator: true,  warmBlooded: true,  animalClass: 'Mammal' },
  { id: '15', name: 'Frog',      imageUrl: `${urlPrefix}frog.svg`,      hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: false, animalClass: 'Amphibian' },
  { id: '16', name: 'Snake',     imageUrl: `${urlPrefix}snake.svg`,     hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: false, animalClass: 'Reptile' },
  { id: '17', name: 'Whale',     imageUrl: `${urlPrefix}whale.svg`,     hasFur: false, canFly: false, laysEggs: false, hasFins: true,  isPredator: true,  warmBlooded: true,  animalClass: 'Mammal' },
  { id: '18', name: 'Bee',       imageUrl: `${urlPrefix}bee.svg`,       hasFur: false, canFly: true,  laysEggs: true,  hasFins: false, isPredator: false, warmBlooded: false, animalClass: 'Insect' },
  { id: '19', name: 'Spider',    imageUrl: `${urlPrefix}spider.svg`,    hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: false, animalClass: 'Arachnid' },
  { id: '20', name: 'Crocodile', imageUrl: `${urlPrefix}crocodile.svg`, hasFur: false, canFly: false, laysEggs: true,  hasFins: false, isPredator: true,  warmBlooded: false, animalClass: 'Reptile' }
];