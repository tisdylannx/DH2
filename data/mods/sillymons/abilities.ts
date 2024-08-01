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
		onModifyTypePriority: 1,
		onModifyType(types, pokemon, target, move) {
			if (move.type === 'Normal') {
				types[0] = 'Water';
			}
		},
		shortDesc: "This Pokemon's Normal attacks become Water Type.",
	},
	flareup: {
		name: "Flare Up",
		onModifyTypePriority: 1,
		onModifyType(types, pokemon, target, move) {
			if (move.type === 'Normal') {
				types[0] = 'Fire';
			}
		},
		shortDesc: "This Pokemon's Normal attacks become Fire Type.",
	},
};
