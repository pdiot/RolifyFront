import { User } from './user';

export class Chat {
    content: string;
    timestamp: Date;
    source: User;

    constructor(content: string, source: User) {
        this.content = content;
        this.timestamp = new Date();
        this.source = source;
    }

}
