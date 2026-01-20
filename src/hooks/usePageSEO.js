import { useEffect } from "react";

const usePageSEO = ({ title, description, ogImage, ogDescription, ogTitle, canonicalUrl }) => {
    useEffect(() => {
        document.title = title;
        setMetaTag("name", "description", description);
        setMetaTag("property", "og:title", ogTitle || title);
        setMetaTag("property", "og:description", ogDescription || description);
        setMetaTag("property", "og:image", ogImage);
        setMetaTag("property", "og:url", canonicalUrl || window.location.href);

    }, [title, description, ogImage, ogDescription, ogTitle, canonicalUrl]);
}
const setMetaTag = (attr, key, content) => {
    if (content) {
        let elememt = document.querySelector(`meta[${attr}="${key}"]`);
        if (!elememt) {
            elememt = document.createElement("meta");
            elememt.setAttribute(attr, key);
            elememt.setAttribute("content", content);
            document.head.appendChild(elememt);
        }
        elememt.setAttribute("content", content);
    }

}
export default usePageSEO;