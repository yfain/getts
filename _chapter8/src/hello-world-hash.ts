// import * as crypto from 'crypto';
import {TextEncoder} from "util";
const crypto = require('crypto');

let nonce = 0;

async function generateHash(input: string): Promise<string> {

    const msgBuffer = new TextEncoder().encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

async function calculateHashWithNonce(nonce: number): Promise<string> {
    const data = 'Hello World' + nonce;
    return generateHash(data);
}

async function mine(): Promise<void> {
    let hash: string;
    do {
        hash = await this.calculateHashWithNonce(++nonce);
    } while (hash.startsWith('0000') === false);

    console.log(`Hash: ${hash}, nonce: ${nonce}`);
}

mine();