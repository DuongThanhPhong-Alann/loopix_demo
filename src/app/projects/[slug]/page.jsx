const projects = {
  'homestay-x': { title: 'Homestay X', tag: 'Homestay', image: '/loopix%20homestay.png' },
  'hotel-y': { title: 'Hotel Y', tag: 'Hotel', image: '/loopix%20hotel.png' },
  'love-hotel-z': { title: 'Love Hotel Z', tag: 'Love Hotel', image: '/loopix%20love%20hotel.png' },
  'resort-nam': { title: 'Resort Nam', tag: 'Resort', image: '/loopix%20resort.png' },
  'coworking-a': { title: 'Co-working A', tag: 'Co-working space', image: '/loopix%20co-working.png' },
  'apartment-b': { title: 'Apartment B', tag: 'Apartment', image: '/loopix%20apartment.png' },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects[slug] || {
    title: 'Dự án',
    tag: 'Virtual Tour 360',
    image: '/loopix%20hotel.png',
  };

  return (
    <main className="project-detail">
      <section className="project-detail-hero">
        <img src={project.image} alt={project.title} />
        <div className="project-detail-copy">
          <span className="project-tag">{project.tag}</span>
          <h1>{project.title}</h1>
          <p>Bổ sung nội dung chi tiết dự án, ảnh 360, video time-lapse và CTA khi có dữ liệu chính thức.</p>
          <a href="/#projects" className="btn btn-line">Quay lại dự án</a>
        </div>
      </section>
    </main>
  );
}
