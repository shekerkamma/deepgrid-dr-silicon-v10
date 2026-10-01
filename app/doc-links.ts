/** Source documents open inside the site (/resources/read), never as a separate generated page.
 *  `path` is the site path of the markdown edition (a markdown file under the downloads folder); `section` is a heading's text,
 *  slugged the same way the reader slugs headings, so a citation lands on the section it names. */
import {url} from './routes';

export const headingSlug = (s: string) => s.toLowerCase().replace(/[*`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const docKey = (path: string) => path.replace(/^\/downloads\//, '').replace(/\.(md|html)$/, '');

export function readHref(path: string, section?: string): string {
  return url('/resources/read') + '?doc=' + encodeURIComponent(docKey(path)) + (section ? '#' + headingSlug(section) : '');
}
