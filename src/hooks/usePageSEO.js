import { useEffect } from "react";

const usePageSEO = ({ title, description, ogImage, ogDescription, ogTitle, canonicalUrl, ogType = "website" }) => {
    useEffect(() => {
        document.title = title;
        setMetaTag("name", "description", description);
        setMetaTag("property", "og:title", ogTitle || title);
        setMetaTag("property", "og:description", ogDescription || description);
        setMetaTag("property", "og:image", ogImage);
        setMetaTag("property", "og:url", canonicalUrl || window.location.href);
        setMetaTag("property", "og:type", ogType);

    }, [title, description, ogImage, ogDescription, ogTitle, canonicalUrl, ogType]);
}

const setMetaTag = (attr, key, content) => {
    if (content) {
        let element = document.querySelector(`meta[${attr}="${key}"]`);
        if (!element) {
            element = document.createElement("meta");
            element.setAttribute(attr, key);
            document.head.appendChild(element);
        }
        element.setAttribute("content", content);
    }
}

export default usePageSEO;