// src/lib/utils.js
export function cn(classNames) {
  return classNames.split(' ').filter(Boolean).join(' ')
}
