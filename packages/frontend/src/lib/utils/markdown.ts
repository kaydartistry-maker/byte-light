import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Patterns for embeddable media URLs (bare links on their own line)
const MEDIA_URL_RE = /^(https?:\/\/(?:media[0-9]*\.giphy\.com\/media\/[^\s]+\.gif|(?:i\.)?giphy\.com\/media\/[^\s]+\.gif|tenor\.com\/view\/[^\s]+|media\.tenor\.com\/[^\s]+\.gif))$/i;

// Convert bare media URLs to inline images before markdown parsing
function embedMediaUrls(text: string): string {
  return text.split('\n').map(line => {
    const trimmed = line.trim();
    const match = trimmed.match(MEDIA_URL_RE);
    if (match) {
      const url = match[1];
      // Tenor view pages need their URL kept as a link with an embedded gif
      if (/tenor\.com\/view\//.test(url)) {
        return `[![gif](${url}.gif)](${url})`;
      }
      return `![gif](${url})`;
    }
    return line;
  }).join('\n');
}

// Configure marked for chat messages
marked.setOptions({
  breaks: true,  // \n becomes <br>
  gfm: true,     // GitHub flavored markdown
});

export function renderMarkdown(text: string): string {
  const processed = embedMediaUrls(text);
  const html = marked.parse(processed, { async: false }) as string;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'del', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'loading'],
  });
}
