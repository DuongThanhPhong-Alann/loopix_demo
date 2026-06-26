import { getTourByProjectSlug } from '../../data/tours';
import { escapeHtml } from '../../lib/html';

export function getProjectCardHtml(project) {
  const tour = getTourByProjectSlug(project.slug);

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
                <a class="project-tour-open" href="/tours/${escapeHtml(tour.slug)}" onclick="sessionStorage.setItem('loopix-tour-autoplay','1')" aria-label="M&#7903; ${escapeHtml(tour.title)} virtual tour"></a>
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
                <em>T&#236;m hi&#7875;u th&#234;m</em>
              </div>
            </a>
          `;
}

export function getProjectsGalleryHtml(projects) {
  return projects.map(getProjectCardHtml).join('');
}
