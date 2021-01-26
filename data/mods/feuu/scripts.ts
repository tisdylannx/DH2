export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){ 
		// Automatically construct fusion learnsets! (Thank u scoopapa)
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['FEUU', 'Silvino', 'FEUUber'],
	},
	
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Bug") {
			return "Silvino-Bug-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Dark") {
			return "Silvino-Dark-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Dragon") {
			return "Silvino-Dragon-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Electric") {
			return "Silvino-Electric-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Fairy") {
			return "Silvino-Fairy-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Fighting") {
			return "Silvino-Fighting-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Fire") {
			return "Silvino-Fire-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Flying") {
			return "Silvino-Flying-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Ghost") {
			return "Silvino-Ghost-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Grass") {
			return "Silvino-Grass-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Ground") {
			return "Silvino-Ground-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Ice") {
			return "Silvino-Ice-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Poison") {
			return "Silvino-Poison-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Psychic") {
			return "Silvino-Psychic-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Rock") {
			return "Silvino-Rock-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Steel") {
			return "Silvino-Steel-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Water") {
			return "Silvino-Water-Mega";
		}
		
		return item.megaStone;
	},
}; 