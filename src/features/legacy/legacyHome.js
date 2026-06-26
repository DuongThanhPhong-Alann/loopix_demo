import fs from 'node:fs';
import path from 'node:path';
import { getProjectsGalleryHtml } from '../projects/projectCards';

export function getLegacyBodyHtml(projects) {
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
      `$1${getProjectsGalleryHtml(projects)}$2`,
    );
}
