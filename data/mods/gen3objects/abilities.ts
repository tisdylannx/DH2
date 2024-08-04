export const Abilities: {[k: string]: ModdedAbilityData} = {
	reflection: {
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Status') {
				this.damage(damage, source, target)
			}
		},
		desc: "When hit by a damaging move, deals the same amount of damage back to the attacker.",
		shortDesc: "When hit by a damaging move, deals equal damage back.",
	},
	comfortable: {
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.status === 'slp') {
				this.heal(pokemon.baseMaxhp / 8)
			}
		},
		desc: "If this Pokemon is asleep, it restores 1/8 of its maximum HP at the end of each turn.",
		shortDesc: "Restores 1/8 max HP per turn while asleep.",
	},
	refreshed: {
		onSetStatus(status, target, source, effect) {
			if (effect?.status) {
				this.add('-immune', target, '[from] ability: Refreshed')
			}
			return false
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Refreshed')
				return null
			}
		},
		desc: "This Pokemon cannot be statused. Gaining this Ability while affected by a status condition cures it.",
		shortDesc: "This Pokemon cannot be statused. Gaining this Ability cures it.",
	},
	wash: {
		onSetStatus(status, target, source, effect) {
			if (effect?.status) {
				this.add('-immune', target, '[from] ability: Wash')
				this.heal(target.baseMaxhp / 4, target, target, effect)
			}
			return false
		},
		onTryAddVolatile(status, target, source, effect) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Wash')
				this.heal(target.baseMaxhp / 4, target, target, effect)
				return null
			}
		},
		desc: "This Pokemon cannot be statused. If hit by a status-inflicting move, it restores 25% of its maximum HP.",
		shortDesc: "Immune to status; heals 25% max HP if hit by status move.",
	},
	quickcook: {
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (move.type === 'Fire' && !pokemon.volatiles['quickcook']) {
				move.basePower = Math.floor(move.basePower * 1.2)
				pokemon.addVolatile('quickcook')
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.removeVolatile('quickcook')
			}
		},
		desc: "Increases the power of the user's first successful Fire-type move by 20%.",
		shortDesc: "First successful Fire move: 1.2x power.",
	},
	frostbite: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(1, 10)) {
					source.trySetStatus('frz', target)
				}
			}
		},
		desc: "When the user is hit by a contact move, the attacker has a 10% chance to be frozen.",
		shortDesc: "Contact moves: 10% chance to freeze attacker.",
	},
	shatterable: {
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(1, 2)) {
				this.damage(damage, target, source, move)
				this.add('-ability', target, 'Shatterable')
				this.add('-message', `${target.name} took double damage due to its Shatterable ability!`)
			}
		},
		desc: "This Pokemon may take double damage when hit by an attack.",
		shortDesc: "50% chance to take double damage when hit.",
	},
	resilient: {
		onDamage(damage, target, source, effect) {
			return this.chainModify(0.25)
		},
		desc: "This Pokemon always takes 75% less damage from attacks.",
		shortDesc: "This Pokemon takes 75% less damage.",
	},
	neatness: {
		onSwitchIn(pokemon) {
			for (const ally of pokemon.side.pokemon) {
				ally.cureStatus()
			}
		},
		desc: "When this Pokemon switches in, it cures the status conditions of all Pokemon on its team.",
		shortDesc: "On switch-in, cures team's status.",
	},
	suction: {
		onFoeTrapPokemon(pokemon) {
			if (this.isAdjacent(pokemon, this.effectState.target)) {
				pokemon.tryTrap(true)
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target
			if (!source || !this.isAdjacent(pokemon, source)) return
			if (!pokemon.knownType || pokemon.hasType('Flying')) {
				pokemon.maybeTrapped = true
			}
		},
		desc: "Prevents adjacent opposing Pokemon from choosing to switch out.",
		shortDesc: "Prevents adjacent foes from choosing to switch.",
	},
};