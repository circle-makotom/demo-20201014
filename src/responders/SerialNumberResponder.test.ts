import { SerialNumberResponder } from './SerialNumberResponder';

import type * as express from 'express';
import type { ExpressWrapper } from '../ExpressWrapper';

const mockUsers = [
    {
        serial: 0,
        user: 'Alice'
    },
    {
        serial: 1,
        user: 'Bob'
    }
];

const mockServices = () => {
    return {
        SerialNumber: {
            users: mockUsers,
            getNewSerialNumber: () => 0
        }
    };
};

const mockReq = (user?: string) => {
    return {
        query: {
            user
        }
    };
};

const mockRes = () => {
    return {
        set: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };
};

describe('getSerialNumber', () => {
    const services = mockServices();
    const req = mockReq('test-user');
    const res = mockRes();

    SerialNumberResponder.getSerialNumber(
        (<unknown>services) as ExpressWrapper['services'],
        (<unknown>req) as express.Request,
        (<unknown>res) as express.Response
    );

    test('header', () => {
        expect(res.set.mock.calls[0][0]).toBe('Content-Type');
        expect(res.set.mock.calls[0][1]).toBe('application/json');
    });

    test('body', () => {
        expect(res.json.mock.calls[0][0]).toStrictEqual({
            version: 'local',
            serial: 0,
            message: 'Hello, test-user!'
        });
    });
});

describe('getUsers', () => {
    const services = mockServices();
    const req = mockReq();
    const res = mockRes();

    SerialNumberResponder.getUsers(
        (<unknown>services) as ExpressWrapper['services'],
        (<unknown>req) as express.Request,
        (<unknown>res) as express.Response
    );

    test('header', () => {
        expect(res.set.mock.calls[0][0]).toBe('Content-Type');
        expect(res.set.mock.calls[0][1]).toBe('application/json');
    });

    test('body', () => {
        expect(res.json.mock.calls[0][0]).toStrictEqual(mockUsers);
    });
});

describe('genMessageWithSerialNumber', () => {
    test('Serial number', () => {
        // Expected value
        const expectedNumber = 0;

        // Actual instance
        // @ts-ignore
        const msg = SerialNumberResponder.genMessageWithSerialNumber(
            expectedNumber
        );

        expect(msg.serial).toBe(0);
    });

    test('Message (named user)', () => {
        const testedUser = 'test-user';

        // Expected values
        const expectedMessage = 'Hello, test-user!';

        // Actual instance
        // @ts-ignore
        const msg = SerialNumberResponder.genMessageWithSerialNumber(
            0,
            testedUser
        );

        expect(msg.message).toBe(expectedMessage);
    });

    test('generalizeUser (empty string)', () => {
        const testedUser = '';

        // Expected values
        const expectedUser = 'anonymous';

        // Actual value
        // @ts-ignore
        const user = SerialNumberResponder.generalizeUser(testedUser);

        expect(user).toBe(expectedUser);
    });

    test('generalizeUser (array)', () => {
        const testedUser = ['foo', 'bar'];

        // Expected value
        const expectedUser = 'anonymous';

        // Actual value
        // @ts-ignore
        const user = SerialNumberResponder.generalizeUser(testedUser);

        expect(user).toBe(expectedUser);
    });
});
