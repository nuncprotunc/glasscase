# Commentary Edition Template Guide

## Quick Start

For each new newsletter edition:

1. **Copy the template**: Duplicate `/commentary/template-edition.html`
2. **Rename**: Use format `edition-[N]-[slug].html` (e.g., `edition-2-reasons-for-decision.html`)
3. **Replace placeholders**: Search for `[...]` and fill in your content
4. **Add images**: Place any infographics in `/commentary/` with matching filename

## Placeholders to Replace

- `[N]` - Edition number (e.g., 2, 3, 4)
- `[Title]` - Edition title (e.g., "Reasons for Decision")
- `[slug]` - URL-friendly version (e.g., "reasons-for-decision")
- `[Brief description]` - One-sentence summary for meta tags
- `[YYYY-MM-DD]` - Publication date in ISO format
- `[Month Day, Year]` - Human-readable date (e.g., "February 15, 2026")
- `[LINKEDIN_URL]` - Full LinkedIn article URL
- `[comma-separated keywords]` - SEO keywords
- `[Section Heading]` - Your H2 section titles
- `[Content paragraph]` - Your article body text
- `[Alt text for infographic]` - Descriptive alt text for images
- `[Caption for infographic]` - Figure caption
- `[URL]` and `[Citation]` - Source links and citations

## Styling

**All styling is handled by `/css/commentary-article.css`** - you don't need to add any custom CSS.

The stylesheet includes:
- Governance by Design pill badge (#4b9fd8)
- Consistent typography (Manrope headings, body text)
- Proper spacing and breathing room
- LinkedIn CTA button
- Infographic containers
- Sources section
- Subscribe CTA
- Comments (giscus)
- Back link to Commentary page
- Mobile responsive layout

## Structure

Every edition follows this structure:

1. **Header** - Badge, title, date/author
2. **LinkedIn CTA** - Link to canonical LinkedIn post
3. **Article content** - Your sections, paragraphs, lists, images
4. **Sources** - Hyperlinked citations (no underlines)
5. **Subscribe CTA** - LinkedIn follow prompt
6. **Comments** - giscus discussion
7. **Back link** - Return to Commentary page

## Adding to Commentary Landing Page

After creating a new edition, update `/commentary.html`:

```html
<a class="commentary-card" href="/commentary/edition-[N]-[slug]">
    <div class="commentary-edition">Edition [N]</div>
    <h2>[Title]</h2>
    <div class="commentary-date">[Month Year]</div>
    <p class="commentary-excerpt">[First sentence or key excerpt]</p>
</a>
```

## Example

See `/commentary/edition-1-deemed-refusals.html` for a complete working example.

## Cache Busting

If you update `/css/commentary-article.css`, increment the version query string:
```html
<link rel="stylesheet" href="/css/commentary-article.css?v=2026-01-31-2">
```

## Notes

- All editions use the same Governance by Design badge color (#4b9fd8)
- Section headings (H2) use Manrope bold, not serif italic
- Source links have no underlines, subtle hover color change
- Images should be PNG format, placed in `/commentary/` directory
- LinkedIn is the canonical source; GlassCase mirrors for SEO/discoverability
