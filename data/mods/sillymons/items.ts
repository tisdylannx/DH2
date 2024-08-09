export const Items: {[itemid: string]: ItemData} = {
	heavydutyboots: {
		inherit: true,
		shortDesc: "When switching in, the holder is unaffected by hazards on its side of the field. Ground-type attacks deal 50% less damage.",
		onDamagePriority: -10,
		onDamage(damage, target, source, effect) {
			if (effect && effect.type === 'Ground') {
				this.add('-activate', target, 'item: Heavy-Duty Boots');
				return this.chainModify(0.5);
			}
		},
	},
	rockyhelmet: {
		inherit: true,
		shortDesc: "If holder is hit by a contact move, the attacker loses 1/6 of its max HP. Rock-type attacks deal 50% less damage.",
		onDamagePriority: -10,
		onDamage(damage, target, source, effect) {
			if (effect && effect.type === 'Rock') {
				this.add('-activate', target, 'item: Rocky Helmet');
				return this.chainModify(0.5);
			}
		},
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 745,
		fling: {
			basePower: 30,
		},
		onStart() {
			this.effectState.started = true;
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;
	
			if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday')) {
				this.add('-activate', pokemon, 'item: Booster Energy', 'Protosynthesis');
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'item: Booster Energy', 'Quark Drive');
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		gen: 9,
	},	
	magnet: {
		inherit: true,
		shortDesc: "Prevents opposing Steel-type Pokemon from switching out.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	furyorb: {
		name: "Fury Orb",
		spritenum: 0,
		fling: {
			basePower: 30,
		},
		shortDesc: "When the holder's stats are lowered, raises its Attack by 2 stages. Consumed after use.",
		onBoost(boost, target, source, effect) {
			let statLowered = false
			for (let i in boost) {
				if (boost[i] < 0) {
					statLowered = true
					break
				}
			}
			if (statLowered) {
				this.boost({atk: 2}, target, target, this.dex.items.get('furyorb'))
				this.add('-activate', target, 'item: Fury Orb')
				target.takeItem()
			}
		},
		num: -1,
		gen: 9,
	},
	passionorb: {
		name: "Passion Orb",
		spritenum: 0,
		fling: {
			basePower: 30,
		},
		shortDesc: "When the holder's stats are lowered, raises its Special Attack by 2 stages. Consumed after use.",
		onBoost(boost, target, source, effect) {
			let statLowered = false
			for (let i in boost) {
				if (boost[i] < 0) {
					statLowered = true
					break
				}
			}
			if (statLowered) {
				this.boost({spa: 2}, target, target, this.dex.items.get('passionorb'))
				this.add('-activate', target, 'item: Passion Orb')
				target.takeItem()
			}
		},
		num: -2,
		gen: 9,
	},
};
