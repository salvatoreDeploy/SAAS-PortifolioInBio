export function sanitizeLink(url?: string) {

  if (!url || typeof url !== 'string') return '';

  return url.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-zA-Z0-9]/g, '').toLowerCase();   // Remove caracteres especiais, espaços e deixa tudo minusculo
}
