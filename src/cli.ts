#!/usr/bin/env node

import meow from "meow";
import ora from "ora";
import chalk from "chalk";
import figures from "figures";
import { checkRedditBan } from "./check-reddit-ban.js";

const cli = meow(
	`
	Usage
    $ rcb <username> <username> ...

    Examples
    $ rcb coolchicken another-account`,
	{
		importMeta: import.meta,
	}
);

const usernames = cli.input;
const usernameCount = usernames.length;

async function rcb() {
	if (usernameCount === 0) {
		return console.error("Please provide at least one username to check");
	}

	const spinner = ora(`Checking ${usernameCount} accounts on Reddit...`);

	spinner.start();

	const statuses = await Promise.all(usernames.map((username) => checkRedditBan(username)));

	spinner.stop();

	usernames.forEach((username, idx) => {
		const status = statuses[idx];

		// true === banned
		if (status === true) {
			console.log(chalk.red(`${figures.cross} ${username} is banned`));
		} else {
			console.log(chalk.green(`${figures.tick} ${username} is not banned!`));
		}
	});
}

rcb();
