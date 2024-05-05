
interface ServerToClientEvents {
    addMerchandise: (message: string) => void;
    modifyMerchandise: (message: string) => void;
    deleteMerchandise: (message: string) => void;
}

interface ClientToServerEvents {
    update: (message: string) => void;
}

export {ServerToClientEvents, ClientToServerEvents};