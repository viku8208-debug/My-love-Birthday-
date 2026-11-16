# Reel-inspired birthday surprise

A mobile-friendly romantic birthday microsite inspired by the uploaded reel. It includes:
- Surprise invitation with YES / NO interaction and a playful cat response.
- Five scrapbook pages with a photo collage layout.
- Personal letter, birthday wishes and a final reveal.
- Floating hearts, confetti and an optional synthesized melody.

## Source package

The complete static-site source is stored in `source-package.zip.b64` as a Base64-encoded ZIP archive so it can be unpacked by the Netlify build command. The root-level `netlify.toml` sets this folder as the Netlify base directory, unpacks the archive and publishes the static site.

## Personalisation

Edit `config.js` in the extracted site before sharing:
- Set the recipient and sender names.
- Add the birthday date (YYYY-MM-DD).
- Personalise the letter and final message.
- Add personal photos in `assets/` and map them in the `photos` object.

No personal photos are included in this starter version. The website displays photo placeholders until real photos are added.
