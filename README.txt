=====================================================================
 SHAKIB MAHAMUD | YOUTUBE GROWTH EXPERT FOR PODCASTS
 Personal brand website: setup, deployment and editing guide
=====================================================================

This is a static website (HTML + CSS + JavaScript). It needs no backend,
no database and no paid tools. You can host it for free on GitHub Pages.

---------------------------------------------------------------------
 WHAT IS IN THIS FOLDER
---------------------------------------------------------------------

  podcastmanager/
  |-- index.html        All page content (text, stats, services, portfolio, etc.)
  |-- css/style.css     Colors, fonts, layout, spacing
  |-- js/script.js      Menu, animations, lightbox, video player, WhatsApp form
  |-- images/
  |     |-- portfolio/      Portfolio thumbnails / screenshots
  |     |-- testimonials/   Video testimonial thumbnails
  |     |-- reviews/        Screenshots of written client feedback
  |     `-- case-studies/   Before / After screenshots
  |-- videos/           Optional MP4 testimonial files
  |-- robots.txt        Search engine settings
  |-- sitemap.xml       Helps Google find your page
  `-- README.txt        This guide


=====================================================================
 PART 1: PUT THE WEBSITE LIVE ON GITHUB PAGES (FREE)
=====================================================================

IMPORTANT: THE USERNAME DECIDES THE WEBSITE ADDRESS
GitHub Pages gives a free address in the form  USERNAME.github.io.
To get exactly   https://podcastmanager.github.io/   your GitHub
username must be exactly:   podcastmanager

Your older site (ppcshakib.github.io) belongs to the account "ppcshakib",
so it cannot become podcastmanager.github.io. Choose one:

  OPTION A (recommended): create a NEW GitHub account named  podcastmanager
           -> your site will be  https://podcastmanager.github.io/
           (If the username is already taken, GitHub will tell you.
            Pick a close alternative, e.g. podcastmanager-sk, and your
            address becomes https://podcastmanager-sk.github.io/ . Then
            update the canonical/og:url lines in index.html and sitemap.xml.)

  OPTION B: use your existing "ppcshakib" account. Create a repository
           with any name, e.g. "podcastmanager". The address becomes
           https://ppcshakib.github.io/podcastmanager/

STEPS (Option A)

 1. Go to https://github.com and sign up with username:  podcastmanager
    Verify your email address.

 2. UNZIP the downloaded ZIP file on your computer. You must upload the
    files INSIDE the folder, not the .zip file itself.

 3. Click the "+" icon (top right) -> "New repository".
      Repository name:  podcastmanager.github.io     (exactly this)
      Visibility:       Public
      Click "Create repository".

 4. On the new empty repository page click "uploading an existing file"
    (or: Add file -> Upload files).

 5. Open the unzipped folder, select EVERYTHING inside it
    (index.html, css, js, images, videos, robots.txt, sitemap.xml,
    README.txt) and drag it all into the GitHub upload box.
    - Dragging folders works in Chrome, Edge and Firefox on desktop.
    - Wait until every file shows as uploaded.
    - Note: empty folders are kept by small ".gitkeep" files. That is normal.

 6. Scroll down and click "Commit changes".

 7. Go to  Settings -> Pages  (left sidebar).
      Source:  Deploy from a branch
      Branch:  main     Folder: / (root)
      Click "Save".

 8. Wait 1 to 3 minutes. Refresh the Pages settings screen. A green
    message appears:  "Your site is live at https://podcastmanager.github.io/"

 9. Open the link and test the menu, the form and the mobile view.

If you see a 404 page: check that index.html is in the ROOT of the
repository (not inside another folder), that the repository name is
exactly  podcastmanager.github.io , and wait a few more minutes.


=====================================================================
 PART 2: BEFORE YOU GO PUBLIC (CHECKLIST)
=====================================================================

The page opens in PREVIEW MODE. Yellow "placeholder" tags show where
you still need to add content.

  [ ] Verify the four hero statistics (see "Statistics" below). Only keep
      numbers you can prove (4+ years, 50+ channels, 40K subscribers,
      5-star rating).
  [ ] Add the 6 portfolio before/after images (no client names shown).
  [ ] Add the 3 video testimonials (YouTube links are easiest).
  [ ] Add the written review screenshots.
  [ ] Fill in both case studies. Use real numbers and screenshots.
  [ ] Check that you have permission to show each client's name, logo,
      screenshots and video.
  [ ] In index.html, find   <body data-preview="true">
      and change it to       <body data-preview="false">
      This hides all yellow placeholder tags and any "Watch on YouTube"
      links that still have href="#".
  [ ] Test the contact form on your phone.


=====================================================================
 PART 3: HOW TO EDIT THE WEBSITE LATER
=====================================================================

You can edit directly on GitHub (no software needed):
  1. Open your repository on github.com
  2. Click the file (e.g. index.html)
  3. Click the pencil icon (Edit)
  4. Make your change, then click "Commit changes"
  5. Wait about one minute and refresh your website
     (use Ctrl+F5 / Cmd+Shift+R if you do not see the change)

For bigger changes, edit the files on your computer with a free editor
such as VS Code, then upload the changed files again
(Add file -> Upload files; GitHub replaces files with the same name).

Tip: in GitHub's editor press Ctrl+F (Cmd+F) to search for the words
mentioned below.

---------------------------------------------------------------------
 Website text
---------------------------------------------------------------------
All text is in index.html. Search for a sentence on the site and edit it.
Do not delete the < > tags around it.

---------------------------------------------------------------------
 Statistics (hero)
---------------------------------------------------------------------
Search for:  class="stats"
Each stat looks like:
   <span class="count" data-to="50" data-suffix="+">50+</span>
   <div class="stat__label">Podcast channels managed</div>
Change data-to (the number), data-suffix (+, K, M ...), the visible
text inside the <span>, and the label. Update both data-to AND the text
inside the span so they match.

---------------------------------------------------------------------
 Services
---------------------------------------------------------------------
Search for:  class="services__grid"
Each service is one <article class="service"> block. Edit the <h3> title
and the <p> description. To add a service, copy a whole <article> block.
If you add one, also add it to the <select> list in the contact form
(search for:  id="f-service" ) and keep the name identical in
data-service="...".

---------------------------------------------------------------------
 Portfolio (anonymous client cards with before/after)
---------------------------------------------------------------------
Search for:  class="portfolio__grid"
For privacy, the portfolio does NOT show client channel names or YouTube
links. Each card shows a designed cover, "Client Name", "USA" and a
headline description. When a visitor taps a card, your before/after image
opens full size.
For each of the 6 cards:
  1. Make the before/after image (e.g. in Canva) and save it as
     images/portfolio/client-1-before-after.jpg   (client-2 ... client-6
     for the other cards). Tall images are fine; visitors can scroll.
  2. OPTIONAL custom cover: save images/portfolio/client-1-cover.jpg
     (1280 x 800 px). If it exists it replaces the designed cover.
  3. Edit "Client Name" (e.g. "Podcast Host") and the headline description.
To add a 7th card, copy one whole <article class="work"> block and use
client-7-before-after.jpg. Use lowercase file names (GitHub is
case-sensitive). Hide client names inside your Canva images too.

---------------------------------------------------------------------
 Video testimonials (3 slots)
---------------------------------------------------------------------
Search for:  class="videos"
Each slot looks like:
   <div class="video-frame" data-youtube="" data-video="videos/testimonial-1.mp4">

EASIEST: upload the video to YouTube (Unlisted is fine) and paste the
link inside data-youtube="":
   data-youtube="https://www.youtube.com/watch?v=XXXXXXXXXXX"
When data-youtube is filled, it is used first.

ALTERNATIVE: use an MP4 file. Put it in the videos/ folder and set
data-video="videos/your-file.mp4". Keep MP4 files small:
GitHub's website uploader accepts files up to 25 MB, and repositories
should stay well under 1 GB. YouTube links avoid these limits.

Video thumbnail: save as images/testimonials/video-1-thumb.jpg
(also video-2-thumb.jpg and video-3-thumb.jpg), 1280 x 720 px.

Client name and channel: edit the <h3> and <p> inside class="video__meta".
Transcript: edit the <p> inside <details class="transcript">.
To hide a transcript, delete that whole <details> block.

---------------------------------------------------------------------
 Written review screenshots
---------------------------------------------------------------------
Search for:  class="reviews__wall"
Save screenshots as  images/reviews/review-1.jpg ... review-8.jpg.
They automatically keep their own shape (tall or wide) and open full size
when clicked. To add more, copy a <figure class="shot"> block and change
the numbers (review-9.jpg). Hide client names or private details in
screenshots if you do not have permission to show them.

---------------------------------------------------------------------
 Case studies
---------------------------------------------------------------------
Search for:  class="case case--featured"   (case study 1, the big result)
and:         class="case">                 (case study 2)
Edit these parts:
  - <h3>Podcast / Channel Name</h3>
  - Growth period text
  - class="case__num"   the starting and current subscriber numbers
                        (case 1 currently shows ~900 and 40K)
  - class="case__metrics"   Total views, Watch hours, Growth period
  - class="case__text"      Challenges, Strategy implemented, Results achieved
  - Before / After screenshots, saved as:
      images/case-studies/case1-before.jpg
      images/case-studies/case1-after.jpg
      images/case-studies/case2-before.jpg
      images/case-studies/case2-after.jpg

---------------------------------------------------------------------
 Contact details
---------------------------------------------------------------------
Search for  8801602120910  in index.html. It appears in:
  - the WhatsApp link in the Contact section
  - the WhatsApp link in the footer
  - <form ... data-whatsapp="8801602120910">   (this one powers the form)
Format: country code + number, digits only, no + and no spaces.
Search for  mahaamudshakib@gmail.com  to change the email (Contact
section, footer, and the SEO block at the top).
Search for  youtubemanager4  to change Instagram.

---------------------------------------------------------------------
 How the contact form works
---------------------------------------------------------------------
When a visitor submits the form, WhatsApp opens with a ready-to-send
message that contains their name, email, channel URL, chosen service and
message. They must press Send inside WhatsApp. There is no backend, so
nothing is stored on the website and you only receive a message when the
visitor sends it. (If you also want email notifications, a free service
such as Formspree can be added later.)

---------------------------------------------------------------------
 Colors and fonts
---------------------------------------------------------------------
Open css/style.css. The first lines define the brand colors:
   --accent: #FF553E;   --bg: #F6F2F2;   --ink: #000000;
Change a value there and the whole site updates.

---------------------------------------------------------------------
 SEO: search and sharing
---------------------------------------------------------------------
At the top of index.html edit <title> and the description meta tag.
For a link preview image on WhatsApp / Facebook / LinkedIn, add a
1200 x 630 px image at images/og-cover.jpg and insert this line near the
other <meta property="og:..."> lines:
   <meta property="og:image" content="https://podcastmanager.github.io/images/og-cover.jpg">
After going live, you can submit https://podcastmanager.github.io/ in
Google Search Console so it is indexed faster.

---------------------------------------------------------------------
 Image tips for a fast website
---------------------------------------------------------------------
 - Use JPG or WebP, not huge PNG files.
 - Portfolio / thumbnails: about 1280 px wide, under 400 KB.
 - Review screenshots: about 900 px wide, under 300 KB.
 - Free compressor: https://squoosh.app


=====================================================================
 TROUBLESHOOTING
=====================================================================
 Image not showing:   file name or folder does not match exactly
                      (lowercase, same extension, e.g. .jpg vs .jpeg).
 Change not visible:  wait 1-2 minutes, then hard refresh (Ctrl+F5).
 Video does not play: check the YouTube link is correct and the video
                      is not Private (Unlisted or Public both work).
 Form does nothing:   check data-whatsapp="8801602120910" is intact
                      and that your browser allows pop-ups for the site.
 Page looks broken:   you probably deleted a < or > while editing.
                      Use the "History" button on GitHub to restore the
                      previous version of the file.

Built for Shakib Mahamud, YouTube Growth Expert for Podcasts.
