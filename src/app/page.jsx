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

function getProjectTour(project) {
  const tours = {
    homestay: {
      label: 'Homestay',
      title: 'The Mango Trail',
      src: '/TheMangoTrial/out/index.html',
      poster: '/loopix%20homestay.png',
    },
    hotel: {
      label: 'Hotel',
      title: 'The Odys Boutique',
      src: '/TheOdysBoutiqueHotel/out/index.html',
      poster: '/loopix%20hotel.png',
    },
  };

  return tours[project.slug] || null;
}

function getProjectCardHtml(project) {
  const tour = getProjectTour(project);

  if (tour) {
    return `
            <article class="g-item project-card project-tour-grid-card" data-aos="fade-up" data-aos-delay="${escapeHtml(project.delay)}">
              <div class="project-tour-frame project-tour-card-frame" aria-label="${escapeHtml(tour.title)} virtual tour">
                <iframe
                  class="tour-iframe project-tour-iframe"
                  title="${escapeHtml(tour.title)} virtual tour"
                  src="${escapeHtml(tour.src)}"
                  data-tour-src="${escapeHtml(tour.src)}"
                  loading="lazy"
                  allow="accelerometer; autoplay; fullscreen; gyroscope; xr-spatial-tracking"
                  allowfullscreen
                ></iframe>
                <div class="project-tour-fallback" style="--tour-poster: url('${escapeHtml(tour.poster)}');" aria-hidden="true">
                  <span class="project-tag">${escapeHtml(tour.label)}</span>
                  <strong>${escapeHtml(tour.title)}</strong>
                </div>
                <div class="g-overlay project-overlay project-tour-overlay">
                  <span class="project-tag">${escapeHtml(tour.label)}</span>
                  <strong>${escapeHtml(tour.title)}</strong>
                  <p class="project-desc" data-vi="${escapeHtml(project.descriptionVi)}" data-en="${escapeHtml(project.descriptionEn)}">${escapeHtml(project.descriptionVi)}</p>
                </div>
              </div>
            </article>
          `;
  }

  return `
            <a class="g-item project-card" href="/projects/${escapeHtml(project.slug)}" data-aos="fade-up" data-aos-delay="${escapeHtml(project.delay)}">
              <img src="${escapeHtml(project.image)}" onerror="this.src='${escapeHtml(project.fallback)}'" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async" />
              <div class="g-overlay project-overlay">
                <span class="project-tag">${escapeHtml(project.tag)}</span>
                <strong>${escapeHtml(project.title)}</strong>
                <p class="project-desc" data-vi="${escapeHtml(project.descriptionVi)}" data-en="${escapeHtml(project.descriptionEn)}">${escapeHtml(project.descriptionVi)}</p>
                <em>Tìm hiểu thêm</em>
              </div>
            </a>
          `;
}

function getProjectsGalleryHtml() {
  return getProjects().map(getProjectCardHtml).join('');
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
