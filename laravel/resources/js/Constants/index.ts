export const HEADER_DEFAULT = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
    'key': '529a3248a230439da63b48f5d31eeccf'
}