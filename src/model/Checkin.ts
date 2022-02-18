export class Checkin {
    constructor(
        public readonly classId: string,
        public readonly planId: string,
        public readonly verified: boolean = false
    ) { }

}

export interface checkinDataDTO {
    classId: string,
    planId: string,
    token: string
}

export interface checkinIdDTO {
    id: string,
    token: string
}

export interface checkin {
    classId: string,
    planId: string
}



