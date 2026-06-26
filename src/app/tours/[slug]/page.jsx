import { notFound } from 'next/navigation';
import { getTourBySlug, getTourStaticParams } from '../../../data/tours';
import TourFrameClient from '../../../features/tours/TourFrameClient';
import ClientScripts from '../../../frontend/components/ClientScripts';

export function generateStaticParams() {
  return getTourStaticParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  return {
    title: tour ? `${tour.title} - Loopix Virtual 360 Tour` : 'Loopix Virtual 360 Tour',
  };
}

export default async function TourDetail({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <header id="header" className="pricing-header tour-detail-header">
        <div className="wrap nav">
          <a href="/" className="logo" aria-label="Loopix home">
            <span className="logo-mark"><img src="/loopix-orb.png" alt="" /></span>
            <span className="logo-wordmark"><img src="/loopix-wordmark.png" alt="Loopix" /></span>
          </a>
          <div className="nav-r">
            <a href="/#projects" className="btn-contact">Quay lại</a>
          </div>
        </div>
      </header>

      <main className="tour-detail-page">
        <section className="tour-detail-stage" aria-label={`${tour.title} full 360`}>
          <div className="tour-detail-frame">
            <TourFrameClient src={tour.src} title={tour.title} />
          </div>
        </section>

        <footer>
          <div className="wrap footer-bottom">
            <a href="/" className="logo"><span className="logo-mark"><img src="/loopix-orb.png" alt="" /></span><span className="logo-wordmark"><img src="/loopix-wordmark.png" alt="Loopix" /></span></a>
            <div className="footer-socials">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
            <div className="foot-b">
              <span>Copyright © 2026 Sense & Scene Studio. All right reserved.</span>
              <span>Loopix Virtual 360 Tour — Vietnam</span>
            </div>
          </div>
        </footer>
      </main>
      <ClientScripts />
    </>
  );
}
