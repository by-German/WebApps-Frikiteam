export class CreateEventI{
    constructor(
      public name: string,
      public start_date: string,
      public end_date: string,
      public tickets_available: number,
      public description: string,
      public details: string,
      public name_event: string
    ) {}
}
