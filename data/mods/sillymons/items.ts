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
		onUpdate(pokemon) {
			if (pokemon.hasItem('furyorb')) {
				const boost = pokemon.boosts
				let statLowered = false
				for (let i in boost) {
					if (boost[i] < 0) {
						statLowered = true
						break
					}
				}
				if (statLowered) {
					this.boost({atk: 1}, pokemon, pokemon, this.dex.items.get('furyorb'))
					this.add('-activate', pokemon, 'item: Fury Orb')
					pokemon.useItem()
				}
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
		onUpdate(pokemon) {
			if (pokemon.hasItem('passionorb')) {
				const boost = pokemon.boosts
				let statLowered = false
				for (let i in boost) {
					if (boost[i] < 0) {
						statLowered = true
						break
					}
				}
				if (statLowered) {
					this.boost({spa: 1}, pokemon, pokemon, this.dex.items.get('passionorb'))
					this.add('-activate', pokemon, 'item: Passion Orb')
					pokemon.useItem()
				}
			}
		},
		num: -2,
		gen: 9,
	},
	absorbbulb: {
		name: "Absorb Bulb",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				target.useItem()
			}
		},
		boosts: {
			spa: 1,
		},
		num: 545,
		gen: 5,
		desc: "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack. Multi-use. Grants Water immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] item: Absorb Bulb')
				}
				return null
			}
		},
	},
	meltingcore: {
		name: "Melting Core",
		spritenum: 0,
		fling: {
			basePower: 30,
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				move.type = 'Water'
				this.add('-activate', target, 'item: Melting Core')
				this.add('-message', `${move.name} was changed to Water type!`)
			}
		},
		num: 1882,
		gen: 9,
		desc: "Turns Ice-type moves used against the holder into Water-type moves.",
	},
	bigroot: {
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10,
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap']
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096])
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move.drain) {
				this.debug('Big Root boost')
				return this.chainModify(1.3)
			} 
		},
		num: 296,
		gen: 4,
		desc: "Holder's draining moves deal 1.3x damage. Draining effects are 30% stronger.",
	},
	muscleband: {
		name: "Muscle Band",
		spritenum: 297,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Physical') {
				return this.chainModify(1.2)
			}
		},
		num: 266,
		gen: 4,
		desc: "Holder's physical attacks have 1.2x power.",
	},
	wiseglasses: {
		name: "Wise Glasses",
		spritenum: 539,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(1.2)
			}
		},
		num: 267,
		gen: 4,
		desc: "Holder's special attacks have 1.2x power.",
	},
	megaphone: {
		name: "Megaphone",
		spritenum: 0, 
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.3);
			}
		},
		num: -3,
		gen: 9,
		desc: "Holder's sound-based moves have 1.3x power.",
	},
	crystalglasses: {
		name: "Crystal Glasses",
		spritenum: 0,
		fling: {
			basePower: 10,
		},
		onModifyMove(move, pokemon) {
			if (move.category === 'Special') {
				move.ignoreDefensive = true;
			}
		},
		num: -4,
		gen: 9,
		desc: "Holder's special attacks ignore stat changes.",
	},
	reinforcedarmor: {
		name: "Reinforced Armor",
		spritenum: 0,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (move.flags['contact']) {
				return this.chainModify(0.7);
			}
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: -5,
		gen: 9,
		desc: "Reduces damage from contact moves by 30%. Halves holder's Speed.",
	},
	mysteriouscloak: {
		name: "Mysterious Cloak",
		spritenum: 0,
		fling: {
			basePower: 10,
		},
		onAfterSetStatus(status, target, source, effect) {
			if (source && source !== target) {
				source.trySetStatus(status, target);
			}
		},
		num: -6,
		gen: 9,
		desc: "Bounces back secondary effects of moves to the user.",
	},
	fusebox: {
		name: "Fuse Box",
		spritenum: 0,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			pokemon.volatiles['fusebox'] = {counter: 3};
			this.add('-message', `${pokemon.name}'s Fuse Box: 3 turns left.`);
		},
		onResidual(pokemon) {
			if (pokemon.volatiles['fusebox']) {
				pokemon.volatiles['fusebox'].counter--;
				if (pokemon.volatiles['fusebox'].counter === 0) {
					this.add('-activate', pokemon, 'item: Fuse Box');
					this.add('-message', `${pokemon.name}'s Fuse Box exploded!`);
					pokemon.faint();
				} else {
					this.add('-message', `${pokemon.name}'s Fuse Box: ${pokemon.volatiles['fusebox'].counter} turns left.`);
				}
			}
		},
		num: -7,
		gen: 9,
		desc: "Explodes after 3 turns, fainting the holder.",
	},
};
