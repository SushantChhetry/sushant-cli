const ART_OPTIONS = [
    String.raw `  /\_/\\
 ( o.o )
  > ^ <`,
    String.raw `  _______
 / _____ \\
||_   _||
 | | | |
 |_| |_|`,
    String.raw `   .-.
  (o o)
  | O \\
   \   \\
    \\   \\
     \\___\\`,
];
const JOKES = [
    'Our roadmap is like a gym membership: ambitious in January and mysterious by March.',
    'I told my PM I needed a break. They asked if it was on the roadmap.',
    'We shipped a tiny bug fix and accidentally improved team morale by 200%.',
];
const FLIRTS = [
    'Are you a clean API? Because every interaction with you feels delightfully predictable.',
    'You must be great product-market fit, because everything feels easier around you.',
    'If we were a sprint, I would never want us to roll over.',
];
export function artCommand() {
    console.log(pickRandom(ART_OPTIONS));
}
export function jokeCommand() {
    console.log(pickRandom(JOKES));
}
export function flirtCommand() {
    console.log(pickRandom(FLIRTS));
}
function pickRandom(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}
