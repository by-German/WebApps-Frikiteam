export namespace Model {
  export interface Event {
    id: number,
    event_information_id: number,
    event_type_id: number,
    organizer_id: number,
    place_id: number,
    information: string,
    name: string,
    price: number,
    quantity: number,
    verified: boolean,
    logo: string,
    stars: Array<number>,
    startDate: string
  }
}

