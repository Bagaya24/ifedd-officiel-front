// components/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ title, description, image, url, type = 'website', author, publishedTime }) => {
    useEffect(() => {
        if (!title) return;

        // Mettre à jour le titre
        document.title = title;

        // Fonction pour mettre à jour ou créer les meta tags
        const updateMetaTag = (attribute, value, content) => {
            if (!content) return;
            
            let meta = document.querySelector(`meta[${attribute}="${value}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, value);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // Mettre à jour les meta tags existants
        updateMetaTag('name', 'description', description);
        updateMetaTag('property', 'og:title', title);
        updateMetaTag('property', 'og:description', description);
        updateMetaTag('property', 'og:image', image);
        updateMetaTag('property', 'og:url', url || window.location.href);
        updateMetaTag('property', 'og:type', type);
        updateMetaTag('name', 'twitter:title', title);
        updateMetaTag('name', 'twitter:description', description);
        updateMetaTag('name', 'twitter:image', image);

        // Métadonnées spécifiques aux articles
        if (type === 'article') {
            updateMetaTag('property', 'article:published_time', publishedTime);
            if (author) {
                updateMetaTag('property', 'article:author', author);
            }
        }

        // Données structurées JSON-LD (bon pour le SEO)
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'Article' : 'WebPage',
            headline: title,
            description: description,
            image: image,
            ...(type === 'article' && {
                datePublished: publishedTime,
                author: {
                    '@type': 'Person',
                    name: author || 'IFEDD'
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'IFEDD',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://ifedd-rdc.org/Logo.png'
                    }
                }
            })
        };

        // Supprimer l'ancien JSON-LD s'il existe
        const oldJsonLd = document.getElementById('structured-data');
        if (oldJsonLd) {
            oldJsonLd.remove();
        }

        // Ajouter le nouveau JSON-LD
        const script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

    }, [title, description, image, url, type, author, publishedTime]);

    return null;
};

export default SEO;