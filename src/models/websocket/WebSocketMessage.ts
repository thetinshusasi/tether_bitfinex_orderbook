export default interface WebSocketMessage {
    event: string;
    channel: string;
    symbol: string;
    prec: string;
    freq: string;
    len: string;
}