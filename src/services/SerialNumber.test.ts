import { SerialNumber } from './SerialNumber';

describe('SerialNumber', () => {
    test('Default initial value', () => {
        const expectedNumber = 0;
        const serialNumber = new SerialNumber();

        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber);
        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber + 1);
    });

    test('Custom initial value', () => {
        const expectedNumber = 10;
        const serialNumber = new SerialNumber(expectedNumber);

        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber);
        expect(serialNumber.getNewSerialNumber()).toBe(expectedNumber + 1);
    });

    test('User list', () => {
        const expectedNumber = 0;
        const expectedUsers = ['Alice', 'Bob'];
        const serialNumber = new SerialNumber(expectedNumber);

        serialNumber.getNewSerialNumber(expectedUsers[0]);
        serialNumber.getNewSerialNumber(expectedUsers[1]);

        expect(serialNumber.users[0]).toStrictEqual({
            serial: expectedNumber,
            user: expectedUsers[0]
        });

        expect(serialNumber.users[1]).toStrictEqual({
            serial: expectedNumber + 1,
            user: expectedUsers[1]
        });
    });
});
