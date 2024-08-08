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
	makeitrain: {
		inherit: true,
		basePower: 100,
	},
	drainpunch: {
		inherit: true,
		basePower: 60,
	},
	kowtowcleave: {
		inherit: true,
			basePower: 85,
			shortDesc: "If target's Defense is raised, this move does 1.5x damage.",
			onModifyDamage(damage, source, target) {
				if (target.boosts.def > 0) {
					return this.chainModify(1.5)
				}
			},
		},
	scald: {
		inherit: true,
		shortDesc: "Becomes Fire or Water, whichever is more effective. 15% chance to burn.",
		onModifyType(move, pokemon, target) {
			const fireEffectiveness = this.dex.getEffectiveness('Fire', target.types)
			const waterEffectiveness = this.dex.getEffectiveness('Water', target.types)
			move.type = fireEffectiveness > waterEffectiveness ? 'Fire' : 'Water'
		},
		basePower: 70,
		secondary: {
			chance: 15,
			volatileStatus: 'burn',
		},
	},
	fly: {
		num: 19,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fly",
		pp: 20,
		priority: -6,
		flags: {metronome: 1},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
};
