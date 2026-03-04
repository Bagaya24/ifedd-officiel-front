export default function Button({ id, text, className }) {
    const handleDownload = (e) => {
        e.preventDefault
        const fileUrl = `/IFEDD_Depliant_version_2.pdf`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = "brochure_ifedd.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <a
            onClick={handleDownload}
            className={`cta-wrapper ${className ?? ""}`} id={id}>
            <div className='cta-button group'>
                <div className='bg-circle' />
                <p className='text'>{text}</p>
                <div className='arrow-wrapper'>
                    <img src="/download.svg" alt="download" />
                </div>
            </div>
        </a>
    )
}