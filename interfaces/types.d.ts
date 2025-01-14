export interface Cat {
    id: string,
    width: number,
    height: number,
    url: string,
    breeds?: CatBreeds[]
}

export interface CatBreeds {
    weight: CatBreedsWeight,
    id: string,
    name: string,
    description: string,
    temperament: string,
    origin: string,
    country_codes: string,
    country_code: string,
    life_span: string,
    wikipedia_url: string,
    child_friendly: number
}

export interface CatBreedsWeight {
    imperial: string,
    metric: string
}
