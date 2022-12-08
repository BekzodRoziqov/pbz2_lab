export interface Company {
    id: string
    name: string
    address: string
    controlled_park: Park[]
}

export interface Park {
    id: string
    name: string
    zone: Zone[]
    landed_plant: Plant[]
    stuff: Stuff[]
    decorator: Decorator[]
}

export interface Zone {
    id: string
    latitude: number
    longitude: number
}

export interface Plant {
    id: string
    land_date: string
    plant_age: number
    plant_type: string
    watering_regime: string
}

export interface Stuff {
    id: string
    name: string
    phone: number
    address: string
    graph: Date
}

export interface Decorator {
    id: string
    name: string
    phone: number
    address: string
    education: string
    graduate_place: string
    category: string
}