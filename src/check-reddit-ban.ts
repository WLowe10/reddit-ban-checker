import axios from "axios";

const redditURL = "https://www.reddit.com";

export async function checkRedditBan(username: string): Promise<boolean> {
	const response = await axios.get(redditURL + `/user/${username}`);

	return response.data.includes('<span slot="title">This account has been suspended</span>');
}
