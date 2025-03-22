export function sortAlphabetASC<T>(arr: T[], key: keyof T) {
   return arr.sort((a, b) => String(a[key]).localeCompare(String(b[key])));
}

export function sortAlphabetDESC<T>(arr: T[], key: keyof T) {
   return arr.sort((a, b) => String(b[key]).localeCompare(String(a[key])));
}
