# Personal Brand Website Template

A customizable personal brand website template that can be fully configured through a visual questionnaire - no coding required.

## Quick Start Guide

### Step 1: Fork This Repository

1. Click the **Fork** button in the top-right corner of this repository
2. Select your GitHub account as the destination
3. Wait for the fork to complete

### Step 2: Enable GitHub Pages

1. Go to your forked repository on GitHub
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Under "Branch", select **main** and **/ (root)**
6. Click **Save**
7. Wait a few minutes for your site to deploy
8. Your site will be available at: `https://YOUR-USERNAME.github.io/RebrandMyselfTemplate/`

### Step 3: Customize Your Site

1. Visit your live site at `https://YOUR-USERNAME.github.io/RebrandMyselfTemplate/`
2. Click the **"Customize This Site"** button in the bottom-right corner
3. Fill out the questionnaire sections:
   - **Personal Info** - Your name, title, bio
   - **Contact** - Email, phone, social links
   - **Branding** - Site name, colors, logo
   - **Hero Slides** - Homepage slider content
   - **Services** - What you offer
   - **Focus Areas** - Areas of expertise with images
   - **Solutions** - Industries you serve
   - **Experience** - Your career timeline
   - **Testimonials** - Client quotes
   - **Images** - Background images and photos
   - **SEO** - Page titles and descriptions

4. Use the **Preview** button to see changes in real-time

### Step 4: Export and Upload Your Configuration

1. When finished customizing, click the **Export** button
2. This downloads a `site-config.json` file
3. Go to your GitHub repository
4. Click **Add file** > **Upload files**
5. Drag and drop the `site-config.json` file
6. Scroll down and click **Commit changes**
7. Wait a minute for GitHub Pages to redeploy

Your site will now load your custom configuration automatically!

### Step 5: Disable the Customization Banner (Optional)

Once your site is configured, you may want to disable the "Customize This Site" button:

1. In your repository, navigate to the root folder
2. Click **Add file** > **Create new file**
3. Name the file: `customization.disable`
4. Leave the file content empty
5. Click **Commit new file**

The button will change to "Rebrand Myself" and link to RebrandMyself.net for others to create their own site.

To re-enable customization later, simply delete the `customization.disable` file.

---

## Updating Your Site

To make changes after initial setup:

1. Visit your site and click "Customize This Site" (if enabled)
2. Make your changes in the questionnaire
3. Click **Export** to download the updated `site-config.json`
4. Upload the new file to your GitHub repository (replacing the old one)

---

## File Structure

```
PersonalBrand/
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── solutions.html      # Solutions/Industries page
├── process.html        # Process page
├── contact.html        # Contact page
├── audit.html          # Book a call page
├── questionnaire.html  # Customization interface
├── site-config.json    # Your custom configuration (after export)
├── assets/
│   ├── css/           # Stylesheets
│   └── js/
│       ├── config.js  # Default configuration
│       └── template-engine.js  # Applies your config to pages
└── customization.disable   # Create to show "Rebrand Myself" instead
```

---

## Contact Form Setup

The contact forms use [Formsubmit.co](https://formsubmit.co/) for email delivery:

1. Fill in your email address in the questionnaire under "Contact"
2. Submit a test form on your live site
3. Check your email for a confirmation from Formsubmit
4. Click the confirmation link to activate form submissions

---

## Tips

- **Images**: Use direct URLs to images (e.g., from Unsplash, Imgur, or your own hosting)
- **Colors**: The accent color affects buttons, links, and highlights throughout the site
- **Mobile**: The site is fully responsive - test on mobile devices
- **SEO**: Fill out the SEO section for better search engine visibility

---

## License

MIT License - Feel free to use this template for personal or commercial projects.
