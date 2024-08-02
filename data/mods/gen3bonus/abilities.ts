export const Abilities: {[k: string]: ModdedAbilityData} = {
	magicguard: {
		inherit: true,
	},
	regenerator: {
		inherit: true,
	},
	furcoat: {
		inherit: true,
	},
	technician: {
		inherit: true,
	},
	sheerforce: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.secondaries) {
				return this.chainModify(1.1)
			}
		},
		desc: "This Pokemon's attacks with secondary effects have 1.1x power; nullifies the effects.",
		shortDesc: "This Pokemon's attacks with secondary effects: 1.1x power; nullifies the effects.",
	},
	mummy: {
		inherit: true,
	},
	wanderingspirit: {
		inherit: true,
	},
	illusion: {
		inherit: true,
	}
};