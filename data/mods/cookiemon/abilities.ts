export const Abilities: {[abilityid: string]: AbilityData} = {
    pacifist: {
        onModifyDamage(damage, source, target, move) {
            // Nullify all damage dealt by the ability user
            return 0;
        },
        onModifyMove(move) {
            // Set 100% flinch chance on all hits
            if (move.category !== 'Status') {
                move.secondaries = move.secondaries || [];
                move.secondaries.push({
                    chance: 100,
                    volatileStatus: 'flinch',
                });
            }
        },
        name: "Pacifist",
        shortDesc: "Nullifies all damage dealt by the user. 100% flinch chance on all hits.",
    },
	shadowform: {
        onTryHit(target, source, move) {
            if (target.hp === 1 && !target.volatiles['shadowform']) {
                target.addVolatile('shadowform');
                this.add('-ability', target, 'Shadow Form');
                this.add('-message', `${target.name} survived the hit with Shadow Form!`);
                return null; // Prevents fainting
            }
        },
        onStart(pokemon) {
            if (pokemon.volatiles['shadowform']) {
                pokemon.addVolatile('invincible');
                this.add('-message', `${pokemon.name} is invincible for this turn!`);
            }
        },
        onResidualOrder: 5,
        onResidual(pokemon) {
            if (pokemon.volatiles['shadowform'] && pokemon.volatiles['shadowform'].duration > 1) {
                this.heal(pokemon.maxhp * 0.2);
                this.add('-message', `${pokemon.name} is healing due to Shadow Form!`);
            }
        },
        condition: {
            duration: 6,
            onEnd(pokemon) {
                this.add('-message', `${pokemon.name}'s Shadow Form has ended.`);
            },
        },
        name: "Shadow Form",
        shortDesc: "Survives a hit once per battle, becomes invincible for a turn, and heals 20% HP for 5 turns.",
    },
};
