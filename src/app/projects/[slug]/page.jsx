import fs from 'node:fs';
import path from 'node:path';
import ClientScripts from '../../../frontend/components/ClientScripts';

function getProjects() {
  const filePath = path.join(process.cwd(), 'public/api/projects.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug) || {
    title: 'Dự án',
    tag: 'Virtual Tour 360',
    image: '/Virtual360%20Tour.jpg',
    descriptionVi: 'Bổ sung nội dung chi tiết dự án, ảnh 360, video time-lapse và CTA khi có dữ liệu chính thức.',
    descriptionEn: 'Detailed project content, 360 imagery, time-lapse video, and CTA will be added when official data is available.',
  };

  return (
    <main className="project-detail">
      <section className="project-detail-hero">
        <img src={project.image} alt={project.title} />
        <div className="project-detail-copy">
          <span className="project-tag">{project.tag}</span>
          <h1>{project.title}</h1>
          <p data-vi={project.descriptionVi} data-en={project.descriptionEn}>{project.descriptionVi}</p>
          <a href="/#projects" className="btn btn-line">Quay lại dự án</a>
        </div>
      </section>
      <ClientScripts />
    </main>
  );
}
