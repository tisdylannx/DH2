// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	///////////////////////////////////////////////////////////////
	///////////////////// Server Specials //////////////////////////
	///////////////////////////////////////////////////////////////
	{
		section: "Server Specials",
		column: 1,
		// name: "serverspecials",
	},
	{
		name: "[Gen 3] GPT OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710848/">National Dex Metagame Discussion</a>`,
		],

		mod: 'gen3gpt',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Mean Look + Baton Pass', 'Spider Web + Baton Pass'],
	},
	{
		name: "[Gen 3] GPT UU",

		mod: 'gen3gpt',
		ruleset: ['[Gen 3] GPT OU'],
		banlist: ['OU', 'UUBL'],
		teambuilderFormat: 'UU',
	},
	{
		name: "[Gen 3] GPT NU",

		mod: 'gen3gpt',
		ruleset: ['[Gen 3] GPT UU'],
		banlist: ['UU', 'NUBL'],
		teambuilderFormat: 'NU',
	},
	{
		name: "[Gen 3] GPT PU",

		mod: 'gen3gpt',
		ruleset: ['[Gen 3] GPT NU'],
		banlist: ['NU', 'PUBL'],
		teambuilderFormat: 'PU',
	},
	{
		name: "[Gen 9] National Dex NFE",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex",
		mod: 'gen9ndnfe',
		ruleset: ['Standard Natdex'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] National Dex NFE UU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex UU",
		mod: 'gen9ndnfe',
		ruleset: ['[Gen 9] National Dex NFE'],
		banlist: ['ND OU', 'ND UUBL'],
	},
	{
		name: "[Gen 9] National Dex NFE RU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex RU",
		mod: 'gen9ndnfe',
		ruleset: ['[Gen 9] National Dex NFE UU'],
		banlist: ['ND UU', 'ND RUBL'],
	},
	{
		name: "[Gen 9] National Dex Rebalanced OU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex OU",
		mod: 'gen9ndrebalanced',
		ruleset: ['Standard Natdex', 'Terastal Clause'],
		banlist: ['ND Uber'],
	},
];
