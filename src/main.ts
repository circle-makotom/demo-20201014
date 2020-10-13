import { ExpressWrapper } from './ExpressWrapper';

import { SerialNumberResponder } from './responders/SerialNumberResponder';
import { VersionNumberResponder } from './responders/VersionNumberResponder';

class MainApp {
    public expWrapper = new ExpressWrapper();

    constructor() {
        this.armResponders();
    }

    public startListening() {
        return this.expWrapper
            .startListening()
            .catch(console.error.bind(console));
    }

    private armResponders() {
        this.expWrapper.armEndpoint(
            'GET',
            '/',
            VersionNumberResponder.getVersion
        );
        this.expWrapper.armEndpoint(
            'GET',
            '/serial',
            SerialNumberResponder.getSerialNumber
        );
        this.expWrapper.armEndpoint(
            'GET',
            '/users',
            SerialNumberResponder.getUsers
        );
    }
}

const mainPromise: Promise<
    ExpressWrapper['httpServers']
> = new MainApp().startListening().catch(console.error.bind(console));

export { mainPromise };
