export const Abilities: {[abilityid: string]: AbilityData} = {
	battlersaura: {
		name: "Battler's Aura",
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') return;
			if (target && target.isAlly(pokemon)) return;
	
			let hitTargets = target ? [target] : pokemon.side.foe.active;
			for (const foe of hitTargets) {
				if (foe && foe.hp && foe.side !== pokemon.side) {
					this.add('-ability', pokemon, 'Battler\'s Aura');
					this.damage(foe.baseMaxhp / 8, foe, pokemon);
				}
			}
		},
		shortDesc: "Opposing Pokemon lose 1/8 HP when this Pokemon uses a status move.",
	},
	regenerator: {
		inherit: true,
		shortDesc: "This Pokemon restores 1/4 of it's maximum HP, rounded down, when it switches out.",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 4);
		},
	},
	quickstart: {
		name: "Quick Start",
		onStart(pokemon) {
			pokemon.addVolatile('quickstart');
		},
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Quick Start');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quick Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker) {
				return this.chainModify(2);
			},
			onModifySpePriority: 5,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
		},
		shortDesc: "For 2 turns after entering battle, this Pokemon's Attack and Speed are 2x.",
	},	
	solidsupport: {
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		flags: {breakable: 1},
		name: "Solid Support",
		shortDesc: "This Pokemon's Defense is doubled.",
	},
	assassin: {
		name: "Assassin",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Sharpness');
		},
		onModifyMove(move, pokemon, target) {
			if (move.category !== 'Status') {
				move.critRatio = 2;
			}
		},
		shortDesc: "This Pokemon's attacks have double crit chance.",
	},
	mitosis: {
		name: "Mitosis",
		shortDesc: "Heals 1/3 max HP when switching out.",
		onSwitchOut(pokemon) {
			this.heal(pokemon.maxhp / 3)
		},
	},
	executioner: {
		name: "Executioner",
		shortDesc: "If the target is below 33% HP, this Pokemon's attacks will cause it to faint.",
		onModifyDamage(damage, source, target, move) {
			if (target.hp <= target.maxhp / 3) {
				return target.hp;
			}
		},
	},
	liquidize: {
		name: "Liquidize",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Water';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		shortDesc: "This Pokemon's Normal attacks become Water Type.",
	},
	flareup: {
		name: "Flare Up",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		shortDesc: "This Pokemon's Normal attacks become Fire Type.",
	},	
	libero: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
			}
		},
		onSwitchIn() {},
		rating: 4.5,
	},
	protean: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn() {},
		rating: 4.5,
	},
	shellshield: {
		name: "Shell Shield",
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Shell Shield", "[of] " + target);
			}
		},
		shortDesc: "Prevents stat lowering on this Pokemon.",
	},
	intoxicated: {
		name: "Intoxicated",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hasType('Poison') && !pokemon.hasType('Steel')) {
				if (this.randomChance(1, 2)) {
					pokemon.trySetStatus('psn', pokemon);
				}
			}
			for (const target of this.getAllActive()) {
				if (!target.hasType('Poison') && !target.hasType('Steel')) {
					if (this.randomChance(1, 2)) {
						target.trySetStatus('tox', pokemon);
					}
				}
			}
		},
		shortDesc: "Has a 50% chance to poison all Pokemon on the field every turn.",
	},
	queenbee: {
		name: "Queen Bee",
		shortDesc: "For the first time it gets hit, a Combee takes damage instead of Vespiquen.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (target.species.name !== 'Vespiquen') return
			if (!target.volatiles['queenbee']) {
				target.addVolatile('queenbee')
			}
			if (target.volatiles['queenbee'].protectionsLeft > 0) {
				this.add('-ability', target, 'Queen Bee')
				this.add('-message', `A Combee protected ${target.name}!`)
				target.volatiles['queenbee'].protectionsLeft--
				
				// Calculate damage based on Combee's base stats
				const combeeStats = this.dex.species.get('Combee').baseStats
				const level = target.level
				const defenseStat = effect.category === 'Physical' ? 'def' : 'spd'
				const defense = Math.floor((2 * combeeStats[defenseStat] + 31 + 85 / 4) * level / 100 + 5)
				const damageAmount = Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * effect.basePower * damage / defense) / 50 + 2)
				
				const damagePercentage = Math.round((damageAmount / combeeStats.hp) * 100)
				this.add('-message', `Combee lost ${damagePercentage}% of its health!`)
				return 0
			}
		},
		onStart(pokemon) {
			pokemon.addVolatile('queenbee')
		},
		onSwitchIn(pokemon) {
			pokemon.addVolatile('queenbee')
		},
		condition: {
			onStart(pokemon) {
				this.effectState.protectionsLeft = 1
			},
		},
	},
	possess: {
		name: "Possess",
		shortDesc: "Upon defeating a foe, transforms into that foe, copying its moves.",
		onSourceFaint(target, source, effect) {
			if (!source || source.transformed) return
			source.transformInto(target, this.dex.abilities.get('possess'))
			this.add('-ability', source, 'Possess')
			this.add('-transform', source, target.species)
		},
	},
	bellchime: {
		name: "Bell Chime",
		shortDesc: "At the end of every turn, this Pokémon uses Heal Bell.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			this.actions.useMove('healbell', pokemon)
		},
	},
	excessload: {
		name: "Excess Load",
		shortDesc: "When this Pokémon faints, it lowers all Pokémon's Speed by 1 stage.",
		onFaint(pokemon) {
			for (const target of this.getAllActive()) {
				this.boost({spe: -1}, target, pokemon, null, true)
			}
			this.add('-ability', pokemon, 'Excess Load')
			this.add('-message', `${pokemon.name}'s Excess Load lowered everyone's Speed!`)
		},
	},
	perfectpedals: {
		name: "Perfect Pedals",
		shortDesc: "This Pokémon cannot be poisoned. Poison-type moves have no effect on this Pokémon.",
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Perfect Pedals')
				pokemon.cureStatus()
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Perfect Pedals')
			}
			return false
		},
		onTryHit(target, source, move) {
			if (move.type === 'Poison') {
				this.add('-immune', target, '[from] ability: Perfect Pedals')
				return null
			}
		},
	},
	graffiti: {
		name: "Graffiti",
		shortDesc: "This Pokémon's Normal-type moves become Poison-type and have a 30% chance to poison.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Poison';
				move.typeChangerBoosted = this.effect;
			}
		},
		onModifyMove(move, pokemon) {
			if (move.graffitiBoosted) {
				if (!move.secondaries) move.secondaries = []
				move.secondaries.push({
					chance: 30,
					status: 'psn',
					ability: this.dex.abilities.get('graffiti'),
				})
			}
		},
	},
	melodyshift: {
		name: "Melody Shift",
		shortDesc: "Meloetta changes forme when using Physical or Special moves.",
		onBeforeMove(pokemon, target, move) {
			if (pokemon.baseSpecies.baseSpecies !== 'Meloetta') return
			if (move.category === 'Physical' && pokemon.species.forme !== 'Pirouette') {
				pokemon.formeChange('Meloetta-Pirouette', this.effect, false, '[msg]')
			} else if (move.category === 'Special' && pokemon.species.forme !== 'Aria') {
				pokemon.formeChange('Meloetta-Aria', this.effect, false, '[msg]')
			}
		},
	},
	shadowcloak: {
        onTryHitPriority: 1,
        onTryHit(target, source, move) {
            if (move.priority > 0) {
                this.add('-immune', target, '[from] ability: Shadow Cloak');
                return null;
            }
        },
        name: "Shadow Cloak",
        shortDesc: "This Pokemon is immune to priority moves.",
    },
	frostforce: {
		name: "Frost Force",
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have 1.2x power. Summons Snow when switched in.",
		shortDesc: "Normal-type moves become Ice with 1.2x power. Summons Snow.",
		onStart(source) {
			this.field.setWeather('snow')
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			]
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ice'
				move.frostforceBoosted = true
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.frostforceBoosted) return this.chainModify([4915, 4096])
		},
	},
	spongeup: {
		name: "Sponge Up",
		shortDesc: "When switching out, deals 50% of all damage taken while on the field.",
		onStart(pokemon) {
			pokemon.damageTaken = 0
		},
		onDamagingHit(damage, target, source, move) {
			target.damageTaken += damage
		},
		onSwitchOut(pokemon) {
			const damage = Math.floor(pokemon.damageTaken * 0.5)
			if (damage > 0) {
				this.damage(damage, pokemon.side.foe.active[0], pokemon)
				this.add('-ability', pokemon, 'Sponge Up')
			}
			pokemon.damageTaken = 0
		},
	},
	monkeydo: {
		name: "Monkey Do",
		desc: "This Pokemon uses the same move that hit it after its turn ends.",
		shortDesc: "Uses the same move that hit it after its turn ends.",
		onAfterMoveSecondary(target, source, move) {
			if (!target.hasAbility('monkeydo')) return
			if (source !== target && source.lastMove && !source.lastMove.isZ && !source.lastMove.isMax) {
				this.actions.useMove(source.lastMove.id, target)
			}
		},
	},
	hardbody: {
 		name: "Hard Body",
 		desc: "This Pokemon cannot be flinched and takes reduced damage from contact moves.",
 		shortDesc: "Cannot be flinched. Takes 20% less damage from contact moves.",
 		onFlinch: false,
 		onSourceModifyDamage(damage, source, target, move) {
 			if (move.flags['contact']) {
 				return this.chainModify(0.8);
 			}
 		},
 	},
 	echochamber: {
 		name: "Echo Chamber",
 		desc: "This Pokemon's sound-based moves have 1.3x power and bypass Substitute.",
 		shortDesc: "Sound moves: 1.3x power and bypass Substitute.",
 		onBasePowerPriority: 8,
 		onBasePower(basePower, attacker, defender, move) {
 			if (move.flags['sound']) {
 				return this.chainModify(1.3);
 			}
 		},
 		onModifyMove(move) {
 			if (move.flags['sound']) {
 				move.infiltrates = true;
 			}
 		},
 	},
	firststrike: {
 		name: "First Strike",
 		desc: "This Pokemon's moves deal 1.5x damage on its first turn out.",
 		shortDesc: "First turn out: moves deal 1.5x damage.",
 		onStart(pokemon) {
 			pokemon.addVolatile('firststrike');
 		},
 		onEnd(pokemon) {
 			delete pokemon.volatiles['firststrike'];
 		},
 		effect: {
 			duration: 1,
 			onBasePowerPriority: 8,
 			onBasePower(basePower, attacker, defender, move) {
 				return this.chainModify(1.5);
 			},
 		},
 	},
 	strongwilled: {
 		name: "Strong-Willed",
 		desc: "Moves do not have a recharge turn.",
 		shortDesc: "Moves do not have a recharge turn.",
 		onModifyMove(move) {
 			if (move.self?.volatileStatus === 'mustrecharge') {
 				delete move.self.volatileStatus;
 			}
 		},
 	},
	tripleheaded: {
 		name: "Triple Headed",
 		desc: "This Pokemon's moves have 60% less power but hit three times. Does not affect moves used on itself.",
 		shortDesc: "Moves: 60% less power, hit 3 times. Not self-moves.",
 		onBasePowerPriority: 8,
 		onBasePower(basePower) {
 			return this.chainModify(0.4);
 		},
 		onModifyMove(move, pokemon, target) {
 			if (move.multihit) {
 				delete move.multihit;
 			}
 			if (target && target !== pokemon) {
 				move.multihit = 3;
 			}
 		},
 	},
	timewarp: {
 		name: "Time Warp",
 		desc: "This Pokemon sets up Trick Room when it switches out.",
 		shortDesc: "Sets up Trick Room when switching out.",
 		onSwitchOut(pokemon) {
 			pokemon.side.addSideCondition('trickroom');
 		},
 	},
};
