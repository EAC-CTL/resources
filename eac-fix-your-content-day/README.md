# EAC Fix Your Content Day countdown

An embeddable, responsive widget using the supplied EAC artwork and a live JavaScript countdown.

The target is **November 10, 2026, 12:00 a.m. Arizona time (UTC−7)**: `2026-11-10T00:00:00-07:00`, equivalent to `2026-11-10T07:00:00Z`. This is the beginning of November 10. The countdown uses the viewer's device clock, with the target fixed to that instant regardless of the viewer's time zone.

## Files and behavior

- `index.html` — the widget page.
- `assets/widget.css` — responsive layout and purple countdown panel.
- `assets/countdown.js` — live countdown and event-day messages.
- `assets/eac-fycd-artwork.png` — the supplied artwork, unchanged; the layout retains its mascot/header and replaces the example timer with live HTML.
- `assets/panel-brushwork.svg` — decoration for the reflowed mobile panel.
- `assets/fonts/Bungee-Regular.ttf` and `assets/fonts/OFL.txt` — bundled display font and its license. Keep both when publishing.
- `.nojekyll` — tells GitHub Pages to serve the static files directly.
- `embed-snippets.html` — copyable Canvas and SharePoint snippets.

The timer updates every second and never goes below zero. At the target, the heading becomes **“It’s Game Day!”**; at midnight beginning November 11 in Arizona, it becomes **“Thanks for taking part!”**. The numbers remain zero after the target. The page uses bundled assets and makes no font-service requests.

There are four countdown cards across on larger screens. At 700 pixels wide and below, the cards reflow into two rows of two and the date is repeated in readable text beneath the artwork.

## Publish to GitHub Pages

1. Create or choose a GitHub repository.
2. Upload the **contents** of this folder, keeping `index.html` at the repository root and preserving the assets folder. Include `.nojekyll` if your uploader shows hidden files.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose your publishing branch (usually `main`) and **/(root)**, then **Save**.
4. After GitHub finishes publishing, use the HTTPS address shown in Pages settings. A project repository normally uses `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
5. Replace that placeholder address in either snippet below with your published address. No build step or server installation is needed.

GitHub's instructions: [Create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Choose the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Canvas

Edit the destination Canvas Page, switch the Rich Content Editor to its **HTML editor**, paste this iframe where the widget should appear, then save and check the published view. Paste only the iframe, rather than the widget's full HTML or JavaScript.

```html
<iframe
  src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/"
  title="EAC Fix Your Content Day countdown to November 10, 2026"
  width="100%"
  height="640"
  style="display:block;width:100%;max-width:1200px;border:0;"
  loading="lazy">
</iframe>
```

Canvas documents iframe and the attributes used here in its [HTML Editor Allowlist](https://community.instructure.com/en/kb/articles/387066-canvas-html-editor-allowlist). This snippet is intended for Canvas Pages; other Canvas surfaces may have different restrictions.

## SharePoint

Edit a modern SharePoint page, add the **Embed** web part, and paste the following into **Website address or embed code**. Republish the page and check its saved view.

```html
<iframe src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/" title="EAC Fix Your Content Day countdown to November 10, 2026" width="100%" height="640" frameborder="0"></iframe>
```

SharePoint requires HTTPS and iframe-based embed code; script tags cannot be pasted directly into this web part. If it reports that embedding is not allowed, ask the site collection administrator to allow your exact Pages hostname, such as `YOUR-USERNAME.github.io`, in **Site settings → HTML Field Security**. See Microsoft's [Embed web part instructions](https://support.microsoft.com/en-gb/office/add-content-to-your-page-using-the-embed-web-part-721f3b2f-437f-45ef-ac4e-df29dba74de8) and [embedding permissions](https://support.microsoft.com/en-us/sharepoint/sites-pages/allow-or-restrict-the-ability-to-embed-content-on-sharepoint-pages).

## Size and verification

The widget responds to the width of its iframe and stops growing at 1200 pixels. The recommended 640-pixel iframe height provides room for the mobile reflow as well as the desktop layout. The iframe's outer height is controlled by Canvas or SharePoint, so adjust `height` if your page leaves too much space or shows an internal scrollbar. Leave scrolling available so browser zoom and unusually narrow layouts can remain readable. A cross-site iframe cannot automatically change the parent page's height without code running on both pages.

Checked locally at 320, 390, 700, 701, 960, and 1200 pixels wide: no horizontal clipping, and the widget fits within the recommended 640-pixel iframe height. Countdown checks cover the exact Arizona target, the final millisecond, both midnight boundaries, the zero floor, and catching up after a background tab resumes. Chrome reported no console errors or warnings.

This package is ready for upload; no GitHub Pages deployment has been performed. Open `embed-snippets.html` for a convenient copyable version of these snippets. After publishing, check the live widget in both destination pages at desktop and phone widths. Local verification does not confirm your institution's Canvas or SharePoint settings.
