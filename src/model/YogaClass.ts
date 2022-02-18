
export class YogaClass {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly date: Date,
        public readonly day: DAY,
        public readonly time: string,
        public readonly teacher: TEACHER,
        public readonly groupId: string
    ) { }
}

export enum DAY {
    MON = "Segunda",
    TUE = "Terça",
    WED = "Quarta",
    THU = "Quinta",
    FRI = "Sexta",
    SAT = "Sábado"
}

export enum TEACHER {
    LOUIZE = "Louize",
    RODRIGO = "Rodrigo",
}

export type classTokenDTO = {
    token: string
}

export type classSearchDTO = {
    token: string,
    id: string
}

export type classDeleteDTO = {
    token: string,
    groupId: string,
    date: string
}

export type classDataDTO = {
    name: string,
    startingDate: string,
    day: DAY,
    time: string,
    teacher: TEACHER,
    token: string,
}

export type classEditDTO = {
    name: string,
    startingDate: string,
    day: DAY,
    time: string,
    teacher: TEACHER,
    groupId: string,
    token: string,
}

export type deleteClass = {
    groupId: string,
    date: string
}