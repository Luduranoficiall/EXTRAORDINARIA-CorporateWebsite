export function greet(name: string) {
  return `Hello, ${name}!`;
}

if (require.main === module) {
  console.log(greet('TypeScript'));
}
