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

  it('lists featured projects with a name and, when public, a valid repo URL', () => {
    expect(Array.isArray(siteConfig.featuredProjects)).toBe(true);
    expect(siteConfig.featuredProjects.length).toBeGreaterThan(0);
    for (const project of siteConfig.featuredProjects) {
      expect(project.name).toBeTruthy();
      // Commercial/private projects may have no public repo (repoUrl: null);
      // only validate the URL shape when one is provided.
      if (project.repoUrl) {
        expect(project.repoUrl).toMatch(/^https?:\/\//);
      }
    }
  });
});
