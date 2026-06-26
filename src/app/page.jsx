import { getProjects } from '../data/projects';
import { getLegacyBodyHtml } from '../features/legacy/legacyHome';
import ClientScripts from '../frontend/components/ClientScripts';

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <div id="legacy-content" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: getLegacyBodyHtml(projects) }} />
      <ClientScripts />
    </>
  );
}
