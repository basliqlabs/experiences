type Author = {
	name: string;
	bio?: string;
	github?: string;
	image?: string;
};

export const authorsData: Author[] = [
	{
		name: "atareversei",
		bio: "🧠 thinking hard with my last 3 brain cells",
		github: "https://github.com/atareversei",
		image: "/experiences/authors/atareversei.jpg",
	},
];

export const authors: string[] = authorsData.map((author) => author.name);
