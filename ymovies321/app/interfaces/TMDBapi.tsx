export interface MovieResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: MediaType.Movie;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number;
    homepage: string;
    genres: { name: string; id: number }[];
    spoken_languages: { english_name: string; name: string }[];
    images: { backdrops: { file_path: string }[] };
    credits: {
        cast: Cast[];
    };
    videos: {
        results: ClipResults[];
    };
    recommendations: { results: MovieResult[] };
    similar: { results: MovieResult[] };
    status: string;
    revenue: number;
    budget: number;
    imdb_id: string;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
    Person = "person",
}

export type Cast = {
    character: string;
    name: string;
    profile_path: string;
    id: string;
};

export type ClipResults = {
    key: string;
    site: string;
    name: string;
};