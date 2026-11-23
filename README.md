# My personal website (starter)

Plain HTML + CSS + JavaScript. No installs, no build step.

## Preview it
Double-click `index.html`. That's it.

## Where to edit things
| I want to…                         | Edit this file       |
|------------------------------------|----------------------|
| Change my name, menu, footer links | `data/site.js`       |
| Write about me, add projects, notes, interests | `data/content.js` |
| Change colours / fonts             | top of `css/style.css` |
| Add a new page                     | copy `interests.html`, rename it, change `data-page="..."`, add a function with that name in `js/main.js` under `pages`, and add it to `nav` in `data/site.js` |

## Adding long text
In `data/content.js`, wrap text in backticks and write normally:
`**bold**`, `*italic*`, `[link](https://...)`, `## Heading`, `- bullet`, and blank lines between paragraphs.

## Adding images
1. Drop the file in `images/` (keep them under ~500 KB; resize big photos first).
2. Use `"images/my-photo.jpg"` in the image field, or `![alt text](images/my-photo.jpg)` inside long text.

## Publishing a new note
Copy the block inside `posts: [ ... ]`, paste it at the top, change `id`, `title`, `date`, `summary`, `body`.

## Putting it online (free)
- **Netlify Drop**: drag this folder onto https://app.netlify.com/drop
- **GitHub Pages**: upload to a GitHub repo, then Settings → Pages. Every time you save a change on GitHub, the site updates.
- **Cloudflare Pages**: connect the same GitHub repo.
