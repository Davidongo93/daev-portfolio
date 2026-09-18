import { siteConfig } from '../src/config/site';

// Smoke test for the single source of truth (site.ts). It needs no DOM and no
// extra testing libraries, so it runs fast and never flakes in CI while still
// catching accidental breakage of the config the whole site reads from.
describe('siteConfig', () => {
  it('exposes the core identity fields', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.alias).toBeTruthy();
    expect(siteConfig.email).toContain('@');
    expect(siteConfig.siteUrl).toMatch(/^https?:\/\//);
  });

  it('lists case studies with the fields the home page renders', () => {
    expect(Array.isArray(siteConfig.caseStudies)).toBe(true);
    expect(siteConfig.caseStudies.length).toBeGreaterThan(0);
    for (const item of siteConfig.caseStudies) {
      expect(item.slug).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.problem.es).toBeTruthy();
      expect(item.problem.en).toBeTruthy();
      expect(item.work.es).toBeTruthy();
      expect(item.work.en).toBeTruthy();
      // A case shows measured numbers or delivered highlights — never neither.
      expect(item.metrics.length + item.highlights.length).toBeGreaterThan(0);
      // Only publish a live link that is actually a link; null means the
      // domain is not resolving and the card renders without the button.
      if (item.liveUrl) {
        expect(item.liveUrl).toMatch(/^https?:\/\//);
      }
    }
  });

  it('lists lab projects with a name and a reachable URL', () => {
    expect(Array.isArray(siteConfig.labProjects)).toBe(true);
    for (const item of siteConfig.labProjects) {
      expect(item.name).toBeTruthy();
      expect(item.repoUrl ?? item.liveUrl).toMatch(/^https?:\/\//);
    }
  });
});
