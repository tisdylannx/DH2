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
	rebuild: {
		num: -1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rebuild",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		desc: "The user takes two turns to fully restore its HP.",
		shortDesc: "Heals the user fully over two turns.",
		onTry(source, target, move) {
			if (source.volatiles['twoturnmove']) {
				delete source.volatiles['twoturnmove']
				return
			}
			this.add('-prepare', source, move.name)
			source.addVolatile('twoturnmove', target)
			return null
		},
		onPrepareHit(target, source) {
			this.heal(source.maxhp, source)
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Clever",
	},
	piercingblow: {
		num: -2,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Piercing Blow",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		desc: "This move's power doubles if the user moves last this turn. This move ignores the target's positive Defense stat stage changes.",
		shortDesc: "2x power if last; ignores target's Defense boosts.",
		onModifyMove(move, pokemon, target) {
			if (!target) return
			if (target.newlySwitched || this.queue.willMove(target)) return
			move.basePower *= 2
		},
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},

};
