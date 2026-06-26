import fs from 'node:fs';
import path from 'node:path';
import ClientScripts from '../frontend/components/ClientScripts';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function getProjects() {
  const filePath = path.join(process.cwd(), 'public/api/projects.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getProjectsGalleryHtml() {
  return getProjects()
    .map((project) => `
            <a class="g-item project-card" href="/projects/${escapeHtml(project.slug)}" data-aos="fade-up" data-aos-delay="${escapeHtml(project.delay)}">
              <img src="${escapeHtml(project.image)}" onerror="this.src='${escapeHtml(project.fallback)}'" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async" />
              <div class="g-overlay project-overlay">
                <span class="project-tag">${escapeHtml(project.tag)}</span>
                <strong>${escapeHtml(project.title)}</strong>
                <p class="project-desc" data-vi="${escapeHtml(project.descriptionVi)}" data-en="${escapeHtml(project.descriptionEn)}">${escapeHtml(project.descriptionVi)}</p>
                <em>Tìm hiểu thêm</em>
              </div>
            </a>
          `)
    .join('');
}

function getHeroTourHtml() {
  return `
        <div class="hero-tour-frame" aria-label="Virtual 360 project preview">
          <iframe
            class="hero-tour-iframe"
            title="The Mango Trial virtual tour"
            data-tour-src="/TheMangoTrial/out/index.html"
            loading="lazy"
            allow="accelerometer; autoplay; fullscreen; gyroscope; xr-spatial-tracking"
            allowfullscreen
          ></iframe>
          <div class="hero-tour-fallback" aria-hidden="true">
            <span>Virtual 360 Tour</span>
          </div>
          <div class="hero-tour-switch" role="tablist" aria-label="Choose virtual tour">
            <button class="active" type="button" role="tab" aria-selected="true" data-tour-src="/TheMangoTrial/out/index.html" data-tour-title="The Mango Trial virtual tour">Mango</button>
            <button type="button" role="tab" aria-selected="false" data-tour-src="/TheOdysBoutiqueHotel/out/index.html" data-tour-title="The Odys Boutique Hotel virtual tour">Odys</button>
          </div>
        </div>`;
}

function getLegacyBodyHtml() {
  const indexPath = path.join(process.cwd(), 'src/frontend/legacy/index.html');
  const source = fs.readFileSync(indexPath, 'utf8');
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : source;

  return bodyHtml
    .replace(/\r\n?/g, '\n')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<link\s+rel=["']stylesheet["']\s+href=["']\/src\/(?:assets\/styles|frontend\/styles)\/global\.css["']\s*\/?>/gi, '')
    .replace(/<div class="swiper hero-swiper"[\s\S]*?<div class="hero-overlay"><\/div>/, `${getHeroTourHtml()}\n        <div class="hero-overlay"></div>`)
    .replace(
      /(<div class="gallery-grid project-grid" id="projects-gallery">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/,
      `$1${getProjectsGalleryHtml()}$2`,
    );
}

export default function Home() {
  return (
    <>
      <div id="legacy-content" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: getLegacyBodyHtml() }} />
      <ClientScripts />
    </>
  );
}
