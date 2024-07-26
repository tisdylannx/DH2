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
	whiteout: {
		name: "Whiteout",
		onStart(pokemon) {
			this.field.setWeather('snow');
		},
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (move.type === 'Ice') {
				move.whiteoutBoosted = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.whiteoutBoosted) {
				this.debug('Whiteout boost');
				return this.chainModify(2);
			}
		},
		onEnd(pokemon) {
			if (this.field.weather === 'snow') {
				this.field.clearWeather();
			}
		},
		shortDesc: "Sets snow that stays until this Pokemon leaves battle. Ice moves x2 power.",
	},
	regenerator: {
		inherit: true,
		shortDesc: "This Pokemon resotres 1/4 of it's maximum HP, rounded down, when it switches out.",
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
			duration: 3,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Quick Start');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quick Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker) {
				return this.chainModify(1.5);
			},
			onModifySpePriority: 5,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
		},
		shortDesc: "For 3 turns after entering battle, this Pokémon's Attack and Speed are 1.5x.",
	},	
	};
