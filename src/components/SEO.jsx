import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Sweet Baby Names 2026 | 50,000+ Unique Boy & Girl Names with Meanings, Zodiac & Origin';
const DEFAULT_DESCRIPTION = 'Explore 50,000+ cute, modern, Sanskrit, and astrological baby names for boys and girls. Detailed meanings, origins, zodiac (rashi) signs, and personalized favorites shortlist.';
const DEFAULT_KEYWORDS = 'baby names, boy names, girl names, indian baby names, modern baby names, sanskrit baby names, zodiac baby names, rashi baby names, 2026 baby names, baby name meanings, twin baby names';
const SITE_URL = 'https://sweetbabynames.com';
const DEFAULT_IMAGE = `${SITE_URL}/baby-logo.jpg`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
}) {
  const location = useLocation();
  const fullTitle = title ? `${title} | Sweet Baby Names` : DEFAULT_TITLE;
  const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    // 1. Page Title
    document.title = fullTitle;

    // Helper for meta tags
    const setMeta = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('name', 'author', 'Sweet Baby Names Team');

    // 3. Open Graph
    setMeta('property', 'og:site_name', 'Sweet Baby Names');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:locale', 'en_US');

    // 4. Twitter Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schema
    const scriptId = 'sweet-baby-names-schema';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Sweet Baby Names',
          description: DEFAULT_DESCRIPTION,
          inLanguage: 'en-US',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/boy-names?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Sweet Baby Names',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: DEFAULT_IMAGE,
          },
        },
      ],
    };

    const finalSchema = schema || defaultSchema;
    scriptTag.textContent = JSON.stringify(finalSchema);
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
}
