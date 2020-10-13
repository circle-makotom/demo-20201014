import type * as express from 'express';
import type { Query } from 'express-serve-static-core';

import type { ExpressWrapper } from '../ExpressWrapper';

declare const __BUILD_VERSION: string;

type QueryValue = string | Query | (string | Query)[];

class SerialNumberResponder {
    public static getSerialNumber(
        services: ExpressWrapper['services'],
        req: express.Request,
        res: express.Response
    ) {
        const user = SerialNumberResponder.generalizeUser(req.query.user);

        res.set('Content-Type', 'application/json');
        res.json(
            SerialNumberResponder.genMessageWithSerialNumber(
                services.SerialNumber.getNewSerialNumber(user),
                user
            )
        );
    }

    public static getUsers(
        services: ExpressWrapper['services'],
        req: express.Request,
        res: express.Response
    ) {
        res.set('Content-Type', 'application/json');
        res.json(services.SerialNumber.users);
    }

    private static genMessageWithSerialNumber(serial: number, user?: string) {
        return {
            version:
                typeof __BUILD_VERSION === typeof ''
                    ? __BUILD_VERSION
                    : 'local',
            serial: serial,
            message: `Hello, ${user}!`
        };
    }

    private static generalizeUser(userRaw: QueryValue): string {
        return typeof userRaw === typeof '' && userRaw
            ? (userRaw as string)
            : 'anonymous';
    }
}

export { SerialNumberResponder };
