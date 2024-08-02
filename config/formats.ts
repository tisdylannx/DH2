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
		name: "[Gen 9] National Dex Rebalanced OU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "National Dex OU",
		mod: 'gen9ndrebalanced',
		ruleset: ['Standard Natdex', 'Terastal Clause'],
		banlist: ['ND Uber'],
	},
	{
		name: "[Gen 3] Bonus OU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "OU",
		mod: 'gen3bonus',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 9] SillyMons OU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "OU",
		mod: 'sillymons',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['AG', 'Uber'],
	},
	{
		name: "[Gen 9] SillyMons UU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "UU",
		mod: 'sillymons',
		ruleset: ['[Gen 9] SillyMons OU'],
		banlist: ['UUBL', 'OU'],
	},
	{
		name: "[Gen 9] SillyMons RU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "RU",
		mod: 'sillymons',
		ruleset: ['[Gen 9] SillyMons UU'],
		banlist: ['RUBL', 'UU'],
	},
	{
		name: "[Gen 9] SillyMons NU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "NU",
		mod: 'sillymons',
		ruleset: ['[Gen 9] SillyMons RU'],
		banlist: ['NUBL', 'RU'],
	},
	{
		name: "[Gen 9] SillyMons PU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "PU",
		mod: 'sillymons',
		ruleset: ['[Gen 9] SillyMons NU'],
		banlist: ['PUBL', 'NU'],
	},
	{
		name: "[Gen 5] Unova Dex OU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10062853">Dex Reversal</a>`,
		],
		teambuilderFormat: "OU",
		mod: 'gen5unovadex',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
];
