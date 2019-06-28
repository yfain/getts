export async function sha256(data: string): Promise<string> {
  const byteArray = new TextEncoder().encode(data);
  const hashAsByteArray = await crypto.subtle.digest('SHA-256', byteArray);
  const hashAsArrayOfNumber = Array.from(new Uint8Array(hashAsByteArray));

  // Convert each number into a string hex representation,
  // normalize each hex number, so it consists of two symbols.
  return hashAsArrayOfNumber.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
/** Naive implementation of the UUID */
export function uuid(): string {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
