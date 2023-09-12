export interface Location {
    voiceIndex: number;
    noteIndex: number;
    endSlur?: number;
    startLine?: number;
}
export interface Rule {
    comment: string;
    rule: () => true | Location;
}