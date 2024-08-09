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
		this.modData("Learnsets", "koffing").learnset.block = ["9L1"];
		this.modData("Learnsets", "weezing").learnset.block = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.block = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.wish = ["9L1"];
		this.modData("Learnsets", "pawniard").learnset.piercingblow = ["9L1"];
		this.modData("Learnsets", "bisharp").learnset.piercingblow = ["9L1"];
		this.modData("Learnsets", "kingambit").learnset.piercingblow = ["9L1"];

	},
};
