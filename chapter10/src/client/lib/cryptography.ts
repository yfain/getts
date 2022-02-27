export async function sha256(data: string): Promise<string> {
  const byteArray: Uint8Array = new TextEncoder().encode(data);
  const hashAsByteArray: ArrayBuffer = await crypto.subtle.digest('SHA-256', byteArray);
  const hashAsArrayOfNumber: Array<number> = Array.from(new Uint8Array(hashAsByteArray));

  // Convert each number into a string hex representation,
  // normalize each hex number, so it consists of two symbols.
  return hashAsArrayOfNumber.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
/** A sample implementation of the UUID generation */
export function uuid(): string {
  const s4 = (): string => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
