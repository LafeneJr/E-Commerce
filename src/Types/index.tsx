export interface BlogPost {
    id: number;
    title: string;
    author: string;
    excerpt: string;
}

export const blogs: BlogPost[] = [
        { 
            id: 1,
            title: "Streetwear Trends 2023",
            author: "Alex Johnson",
            excerpt: "Discover the latest urban fashion trends taking over this year..."
        },
        {
            id: 2,
            title: "How to Style Your Sneakers",
            author: "Maria Garcia",
            excerpt: "Learn how to pair your favorite sneakers with different outfits..."
        },
        {
            id: 3,
            title: "The History of Hoodies",
            author: "James Wilson",
            excerpt: "From workwear to fashion statement - the evolution of hoodies..."
        },
        {
            id: 4,
            title: "Sustainable Streetwear",
            author: "Emma Thompson",
            excerpt: "How eco-friendly materials are transforming urban fashion..."
        },
    ];


