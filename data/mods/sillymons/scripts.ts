export const Scripts: ModdedBattleScriptsData = {
	init() {
		this.modData('Learnsets', 'ursaluna').learnset.uturn = ["9L1"];
		this.modData('Learnsets', 'ursaluna').learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "tyranitar").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "serperior").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "entei").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "regigigas").learnset.rebuild = ["9L1"];
		this.modData("Learnsets", "regirock").learnset.rebuild = ["9L1"];
		this.modData("Learnsets", "regice").learnset.rebuild = ["9L1"];
		this.modData("Learnsets", "registeel").learnset.rebuild = ["9L1"];
		this.modData("Learnsets", "regieleki").learnset.rebuild = ["9L1"];
		this.modData("Learnsets", "regidrago").learnset.rebuild = ["9L1"];
		delete this.modData("Learnsets", "archaludon").learnset.electroshot;
		this.modData("Learnsets", "ragingbolt").learnset.electroshot = ["9L1"];
		this.modData("Learnsets", "garchomp").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.tailglow = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.agility = ["9L1"];
		this.modData("Learnsets", "ambipom").learnset.machpunch = ["9L1"];
		this.modData("Learnsets", "ambipom").learnset.bulletpunch = ["9L1"];
		this.modData("Learnsets", "ambipom").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "charizard").learnset.blazingwing = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.grassyglide = ["9L1"];
		this.modData("Learnsets", "snorlax").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "spiritomb").learnset.recover = ["9L1"];
		this.modData("Learnsets", "indeedeef").learnset.memento = ["9L1"];
		this.modData("Learnsets", "indeedee").learnset.memento = ["9L1"];
		this.modData("Learnsets", "cryogonal").learnset.flipturn = ["9L1"];
	},
};
