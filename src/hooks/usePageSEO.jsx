import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  ogImage, 
  ogDescription, 
  ogTitle, 
  canonicalUrl, 
  ogType = "website" 
}) => {
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const decodeEntities = (text) => {
    if (!text) return "";
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  const cleanDesc = decodeEntities(description);
  const ogCleanDesc = decodeEntities(ogDescription)

  return (
    <Helmet>
      {/* Balises standards */}
      <title>{title}</title>
      <meta name="description" content={cleanDesc} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogCleanDesc || cleanDesc} />
      <meta property="og:url" content={currentUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter (Optionnel mais recommandé pour les blogs) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogCleanDesc || cleanDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
