import { bgGreen, black } from 'https://deno.land/std/fmt/colors.ts';

const message: string = 'Ran with deno!';

console.log(black(bgGreen(message)));
