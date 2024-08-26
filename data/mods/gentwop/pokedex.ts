export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	serenshey: {
		num: -1,
		name: "Serenshey",
		types: ["Fairy", "Normal"],
		baseStats: {hp: 250, atk: 80, def: 80, spa: 40, spd: 40, spe: 50},
		abilities: {0: "Natural Cure", 1: "Serene Grace", H: "Healer"},
		heightm: 1.1,
		weightkg: 34.6,
		color: "Pink",
		prevo: "Chansey",
		evoType: "other",
		evoCondition: "after learning a Fairy-type move and at max friendship",
		eggGroups: ["Fairy"],
	},
	porygonshurstian: {
		num: -2,
		name: "Porygon-Shurstian",
		baseSpecies: "Porygon",
		types: ["Ghost"],
		baseStats: {hp: 75, atk: 50, def: 60, spa: 85, spd: 105, spe: 20},
		abilities: {0: "Download", 1: "Trace", H: "Analytic"},
		heightm: 0.8,
		weightkg: 36.5,
		color: "Blue",
		eggGroups: ["Mineral"],
	},
	porygon2shurstian: {
		num: -3,
		name: "Porygon2-Shurstian",
		baseSpecies: "Porygon2",
		types: ["Ghost"],
		baseStats: {hp: 105, atk: 60, def: 80, spa: 105, spd: 125, spe: 40},
		abilities: {0: "Download", 1: "Trace", H: "Analytic"},
		heightm: 0.6,
		weightkg: 32.5,
		color: "Blue",
		prevo: "Porygon-Shurstian",
		evoType: "trade",
		eggGroups: ["Mineral"],
	},
	porygonzshurstian: {
		num: -4,
		name: "Porygon-Z-Shurstian",
		baseSpecies: "Porygon-Z",
		types: ["Ghost"],
		baseStats: {hp: 105, atk: 60, def: 60, spa: 150, spd: 60, spe: 100},
		abilities: {0: "Download", 1: "Adaptability", H: "Analytic"},
		heightm: 0.9,
		weightkg: 34.0,
		color: "Blue",
		prevo: "Porygon2-Shurstian",
		evoType: "trade",
		eggGroups: ["Mineral"],
	},
	sobbuffet: {
		num: -5,
		name: "Sobbuffet",
		types: ["Psychic", "Water"],
		baseStats: {hp: 200, atk: 50, def: 50, spa: 80, spd: 80, spe: 80},
		abilities: {0: "Shadow Tag", H: "Water Absorb"},
		heightm: 0.6,
		weightkg: 12,
		color: "Blue",
		eggGroups: ["Amorphous"],
	},
	brambleghastshurstian: {
		num: -6,
		name: "Brambleghast-Shurstian",
		baseSpecies: "Brambleghast",
		types: ["Grass", "Dark"],
		baseStats: {hp: 65, atk: 105, def: 70, spa: 80, spd: 70, spe: 90},
		abilities: {0: "Wind Rider", H: "Dark Aura"},
		heightm: 0.6,
		weightkg: 12,
		color: "Brown",
		eggGroups: ["Amorphous"],
	},
	bramblethorn: {
		num: -7,
		name: "Bramblethorn",
		types: ["Grass", "Dark"],
		baseStats: {hp: 70, atk: 125, def: 75, spa: 85, spd: 75, spe: 110},
		abilities: {0: "Wind Rider", H: "Dark Aura"},
		heightm: 0.6,
		weightkg: 12,
		color: "Brown",
		eggGroups: ["Amorphous"],
	},
	weedleshurstian: {
		num: -8,
		name: "Weedle-Shurstian",
		types: ["Flying", "Poison"],
		baseStats: {hp: 40, atk: 25, def: 30, spa: 45, spd: 30, spe: 50},
		abilities: {0: "Shield Dust", H: "Run Away"},
		heightm: 0.3,
		weightkg: 3.2,
		color: "Brown",
		evos: ["Kakuna-Shurstian"],
		eggGroups: ["Bug"],
	},
	kakunashurstian: {
		num: -9,
		name: "Kakuna-Shurstian",
		types: ["Flying", "Poison"],
		baseStats: {hp: 45, atk: 25, def: 50, spa: 65, spd: 50, spe: 35},
		abilities: {0: "Shed Skin"},
		heightm: 0.6,
		weightkg: 10,
		color: "Yellow",
		prevo: "Weedle-Shurstian",
		evos: ["Beedrill-Shurstian"],
		eggGroups: ["Bug"],
	},
	beedrillshurstian: {
		num: -10,
		name: "Beedrill-Shurstian",
		types: ["Flying", "Poison"],
		baseStats: {hp: 65, atk: 70, def: 60, spa: 130, spd: 80, spe: 95},
		abilities: {0: "Swarm", H: "Sniper"},
		heightm: 1,
		weightkg: 29.5,
		color: "Yellow",
		prevo: "Kakuna-Shurstian",
		eggGroups: ["Bug"],
	},
    cutieflyshurstian: {
		num: -11,
		name: "Cutiefly-Shurstian",
		baseSpecies: "Cutiefly",
		types: ["Grass", "Fairy"],
		baseStats: {hp: 84, atk: 40, def: 55, spa: 40, spd: 45, spe: 40},
		abilities: {0: "Shield Dust", H: "Run Away"},
		heightm: 0.1,
		weightkg: 0.1,
		color: "White",
		eggGroups: ["Bug"],
	},
	ribombeeshurstian: {
		num: -12,
		name: "Ribombee-Shurstian",
		baseSpecies: "Ribombee",
		types: ["Grass", "Fairy"],
		baseStats: {hp: 124, atk: 70, def: 95, spa: 60, spd: 55, spe: 60},
		abilities: {0: "Honey Gather", H: "Sweet Veil"},
		heightm: 0.2,
		weightkg: 0.5,
		color: "White",
		eggGroups: ["Bug"],
	},
	noivernshurstian: {
		num: -13,
		name: "Noivern-Shurstian",
		baseSpecies: "Noivern",
		types: ["Dragon", "Poison"],
		baseStats: {hp: 85, atk: 123, def: 80, spa: 70, spd: 80, spe: 97},
		abilities: {0: "Inner Focus", H: "Toxic Chain"},
		heightm: 1.2,
		weightkg: 85,
		color: "Blue",
		eggGroups: ["Flying"],
	},
	farigirafshurstian: {
		num: -14,
		name: "Farigiraf-Shurstian",
		baseSpecies: "Farigiraf",
		types: ["Psychic", "Dark"],
		baseStats: {hp: 110, atk: 90, def: 70, spa: 60, spd: 90, spe: 120},
		abilities: {0: "Serene Grace", H: "Armor Tail"},
		heightm: 1.5,
		weightkg: 94,
		color: "Brown",
		eggGroups: ["Field"],
	},
	spoinkshurstian: {
		num: -15,
		name: "Spoink-Shurstian",
		baseSpecies: "Spoink",
		types: ["Psychic", "Steel"],
		baseStats: {hp: 60, atk: 25, def: 35, spa: 70, spd: 80, spe: 60},
		abilities: {0: "Thick Fat", H: "Gluttony"},
		heightm: 0.7,
		weightkg: 30.6,
		color: "Black",
		evos: ["Grumpig-Shurstian"],
		eggGroups: ["Field"],
	},
	grumpigshurstian: {
		num: -16,
		name: "Grumpig-Shurstian",
		baseSpecies: "Grumpig",
		types: ["Psychic", "Steel"],
		baseStats: {hp: 80, atk: 45, def: 65, spa: 90, spd: 110, spe: 80},
		abilities: {0: "Thick Fat", H: "Gluttony"},
		heightm: 0.9,
		weightkg: 71.5,
		color: "Black",
		prevo: "Spoink-Shurstian",
		evos: ["magnetpig"],
		eggGroups: ["Field"],
	},
	pignet: {
		num: -17,
		name: "Pignet",
		types: ["Psychic", "Steel"],
		baseStats: {hp: 100, atk: 65, def: 95, spa: 110, spd: 130, spe: 90},
		abilities: {0: "Levitate", H: "Magnet Pull"},
		heightm: 1.1,
		weightkg: 120.0,
		color: "Gray",
		prevo: "Grumpig-Shurstian",
		eggGroups: ["Field"],
	},
    camolizard: {
		num: -18,
		name: "Camolizard",
		types: ["Dragon", "Normal"],
		baseStats: {hp: 90, atk: 110, def: 90, spa: 70, spd: 140, spe: 60},
		abilities: {0: "Color Change", H: "Magic Guard"},
		heightm: 1.7,
		weightkg: 120.0,
		color: "Red",
		prevo: "Kecleon",
		evoLevel: 40,
		eggGroups: ["Undiscovered"],
	},
	lucaria: {
		num: -19,
		name: "Lucaria",
		types: ["Steel", "Fighting"],
		baseStats: {hp: 70, atk: 60, def: 110, spa: 60, spd: 110, spe: 90},
		abilities: {0: "Huge Power", H: "Speed Boost"},
		heightm: 1.7,
		weightkg: 120.0,
		color: "White",
		prevo: "Riolu",
		evoLevel: 30,
		eggGroups: ["Undiscovered"],
	},
};