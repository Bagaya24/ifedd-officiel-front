// components/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ title, description, image, url, type = 'website' }) => {
    useEffect(() => {
        // Mettre à jour le titre
        document.title = title;

        // Fonction pour mettre à jour ou créer les meta tags
        const updateMetaTag = (attribute, value, content) => {
            let meta = document.querySelector(`meta[${attribute}="${value}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, value);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // Mettre à jour les meta tags
        if (description) {
            updateMetaTag('name', 'description', description);
            updateMetaTag('property', 'og:description', description);
            updateMetaTag('name', 'twitter:description', description);
        }

        if (title) {
            updateMetaTag('property', 'og:title', title);
            updateMetaTag('name', 'twitter:title', title);
        }

        if (image) {
            updateMetaTag('property', 'og:image', image);
            updateMetaTag('name', 'twitter:image', image);
        }

        if (url) {
            updateMetaTag('property', 'og:url', url);
        }

        updateMetaTag('property', 'og:type', type);

        // Nettoyage
        return () => {
            document.title = 'IFEDD'; // Titre par défaut
        };
    }, [title, description, image, url, type]);

    return null; // Ce composant ne rend rien
};

export default SEO;