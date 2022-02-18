
export class Plan {
   constructor(
      public readonly id: string,
      public readonly type: TYPE,
      public readonly frequency: FREQUENCY,
      public readonly planStarted: Date,
      public readonly planEnds: Date,
      public readonly totalClasses: number,
      public readonly userId: string,
      public readonly avaliableClasses: number = totalClasses,
      public readonly status: boolean = true
   ) { }
   }

export enum FREQUENCY {
   ONE = "1X",
   TWO = "2X",
   THREE = "3X",
   NONE = "---"
}

export enum TYPE {
   MONTHLY = "Mensal",
   QUARTERLY = "Trimestral",
   SEMESTER = "Semestral",
   SINGLE = "Avulsa",
   APP = "Gympass"
}

export interface planFindDTO {
   token: string
   status?: string
}

export interface planSearchDTO {
   token: string
   id: string
}

export interface planFindByDTO {
   token: string,
   id: string,
   status?: string
}

export interface planSearch {
   userId: string,
   status: boolean | number,
}

export interface planDataDTO {
   type: TYPE, 
   frequency: FREQUENCY, 
   planStarted: Date, 
   userId: string,
   token: string
}

export interface planEditDTO {
   type: TYPE, 
   frequency: FREQUENCY, 
   planStarted: Date, 
   planEnds: Date,
   totalClasses: number,
   avaliableClasses: number,
   planId: string,
   token: string
}

export interface planStatusDTO {
   status: boolean
   planId: string,
   token: string
}

export interface planEditon {
   planId: string,
   type: TYPE, 
   frequency: FREQUENCY, 
   planStarted: Date, 
   planEnds: Date,
   totalClasses: number,
   avaliableClasses: number,
}
   
export interface planClassesDTO {
   id: string,
   token: string,
   action: string
}

export interface planNewQuantity {
   id: string,
   avaliableClasses: number
}