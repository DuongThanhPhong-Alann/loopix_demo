import fs from 'node:fs';
import path from 'node:path';

const projectsFilePath = path.join(process.cwd(), 'public/api/projects.json');

export function getProjects() {
  return JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
}

export function getProjectBySlug(slug) {
  return getProjects().find((project) => project.slug === slug) || null;
}

export function getProjectStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}
