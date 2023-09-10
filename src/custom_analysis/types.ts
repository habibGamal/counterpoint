export interface Location {
    voiceIndex: number;
    noteIndex: number;
    end_slur?: number;
}
export interface Rule {
    comment: string;
    rule: () => true | Location;
}