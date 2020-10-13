class SerialNumber {
    public curSerial: number = 0;
    public users: { serial: number; user: string }[] = [];

    constructor(init: number = 0) {
        this.curSerial = init;
    }

    public getNewSerialNumber(user: string = ''): number {
        const serial = this.curSerial;

        this.users.push({
            serial,
            user
        });

        this.curSerial += 1;

        return serial;
    }
}

export { SerialNumber };
