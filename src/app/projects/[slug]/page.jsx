const projects = {
  'homestay-x': { title: 'Homestay X', tag: 'Homestay', image: '/Virtual360%20Tour.jpg' },
  'hotel-y': { title: 'Hotel Y', tag: 'Hotel', image: '/Insta360%20Camera_Travel.jpeg' },
  'love-hotel-z': { title: 'Love Hotel Z', tag: 'Love Hotel', image: '/Insta360%20Camera.jpg' },
  'resort-nam': { title: 'Resort Nam', tag: 'Resort', image: '/Villa_Virtual360.png' },
  'coworking-a': { title: 'Co-working A', tag: 'Co-working space', image: '/Coworking%20Space_Virtual360.webp' },
  'apartment-b': { title: 'Apartment B', tag: 'Apartment', image: '/Insta360%20camera(1).jpg' },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects[slug] || {
    title: 'Dự án',
    tag: 'Virtual Tour 360',
    image: '/Virtual360%20Tour.jpg',
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
