export class CellInfo {
    x: number;
    y: number;
    isGenerated: boolean;
    numberOfInsertion: number;
    value: number;

    constructor(x:number, y: number, value: number, isGenerated: boolean) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.isGenerated = isGenerated;
    }

}