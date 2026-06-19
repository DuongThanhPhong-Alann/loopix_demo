import fs from 'node:fs';
import path from 'node:path';
import ClientScripts from '../frontend/components/ClientScripts';

function getLegacyBodyHtml() {
  const indexPath = path.join(process.cwd(), 'src/frontend/legacy/index.html');
  const source = fs.readFileSync(indexPath, 'utf8');
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : source;

  return bodyHtml
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<link\s+rel=["']stylesheet["']\s+href=["']\/src\/(?:assets\/styles|frontend\/styles)\/global\.css["']\s*\/?>/gi, '');
}

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getLegacyBodyHtml() }} />
      <ClientScripts />
    </>
  );
}
