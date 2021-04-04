export interface PokemonStats {
  "hp": number
  "attack": number
  "defense": number
  "special-attack": number
  "special-defense": number
  "speed": number
}

export interface PokemonValues {
  "top": string | number
  "right": string | number
  "bottom": string | number
  "left": string | number
}

export interface Pokemon {
  abilities: Array<string>
  stats: PokemonStats
  type: string
  img: string
  name: string
  base_experience: number
  height: number
  id: number
  values: PokemonValues
  isActive?: boolean
  isSelected?: boolean
  player?: number
  possession?: string
}

export interface BoardCell {
  position: number
  card: Pokemon | null
}

export interface LoginFormData {
  email: string
  password: string
}