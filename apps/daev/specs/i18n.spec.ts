import { alternatesFor, counterpartPath, pathFor } from '../src/lib/i18n';

// The language toggle and hreflang both depend on these mappings; a wrong one
// sends the visitor to a 404 in the other locale.
describe('i18n paths', () => {
  it('prefixes shared slugs with /en', () => {
    expect(pathFor('en', '/pricing')).toBe('/en/pricing');
    expect(pathFor('es', '/pricing')).toBe('/pricing');
    expect(pathFor('en', '/')).toBe('/en');
    expect(pathFor('es', '/')).toBe('/');
  });

  it('translates the slug of the work page', () => {
    expect(pathFor('es', '/trabajo')).toBe('/trabajo');
    expect(pathFor('en', '/trabajo')).toBe('/en/work');
  });

  it('toggles between the two versions of the work page', () => {
    expect(counterpartPath('/trabajo', 'es')).toBe('/en/work');
    expect(counterpartPath('/en/work', 'en')).toBe('/trabajo');
  });

  it('keeps the existing toggles working', () => {
    expect(counterpartPath('/', 'es')).toBe('/en');
    expect(counterpartPath('/en', 'en')).toBe('/');
    expect(counterpartPath('/en/pricing', 'en')).toBe('/pricing');
    expect(counterpartPath('/blog/bienvenida', 'es')).toBe('/en');
  });

  it('pairs both URLs of the work page in hreflang', () => {
    const { languages } = alternatesFor('/trabajo', 'en');
    expect(languages['es-CO']).toBe('https://daev.space/trabajo');
    expect(languages['en-US']).toBe('https://daev.space/en/work');
  });
});
