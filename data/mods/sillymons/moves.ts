export const Moves: {[moveid: string]: MoveData} = {
	bodyslam: {
		inherit: true,
		basePower: 80,
	},
	uturn: {
		inherit: true,
		basePower: 60,
	},
	knockoff: {
		inherit: true,
		basePower: 20,
	},
	machpunch: {
		inherit: true,
		basePower: 60,
	},
	grassyglide: {
		inherit: true,
		basePower: 70,
	},
	snipeshot: {
		inherit: true,
		shortDesc: "Always results in a critical hit.",
		basePower: 80,
		willCrit: true,
	},
	firstimpression: {
		inherit: true,
		shortDesc: "Hits first. First turn out only. 100% Flinch.",
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
	},
	bulletpunch: {
		inherit: true,
		basePower: 60,
		},
	thunder: {
		inherit: true,
		accuracy: 80,
	},
	suckerpunch: {
		inherit: true,
		basePower: 60,
	},
    flowertrick: {
    inherit: true,
	shortDesc: "Always crits. Summons Grassy Terrain before hitting.",
    onPrepareHit(target, source) {
        this.field.setTerrain('grassyterrain');
	    },
	},
	psyshieldbash: {
		inherit: true,
		basePower: 80,
		self: {
			boosts: {
				def: 2,
			},
		},
		overrideOffensiveStat: 'def',
		shortDesc: "Uses Defense for damage. Raises Defense by 2.",
	},
	rebuild: {
		inherit: true,
	},
};
