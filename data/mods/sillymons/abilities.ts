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
};
