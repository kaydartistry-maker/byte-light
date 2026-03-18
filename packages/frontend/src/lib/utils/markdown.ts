import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked for chat messages
marked.setOptions({
  breaks: true,  // \n becomes <br>
  gfm: true,     // GitHub flavored markdown
});

export function renderMarkdown(text: string): string {
  const html = marked.parse(text, { async: false }) as string;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'del', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
  });
}
