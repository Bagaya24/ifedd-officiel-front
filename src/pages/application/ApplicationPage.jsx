import MFooter from "../../components/MFooter";
import NavBar from "../../components/NavBar";
import TitleSection from "../../components/TitleSection";

const applications = [
    {
        title: "Akiba Heri",
        description: `AKIBA-HERI est une application mobile dédiée à la gestion financière des AVEC et GCEC. 
        Elle facilite l’enregistrement des épargnes, des prêts et des remboursements, tout en renforçant la 
        transparence, la traçabilité et la bonne gouvernance des groupes communautaires.`,
        path: "application/appli/Akiba Heri.apk",
        image: "application/images/Akiba 11.png"
    },
    {
        title: "Efficacity Library",
        description: ` La mission d’AKIBA-HERI est de digitaliser et simplifier la gestion financière des AVEC 
        et GCEC, en offrant aux membres et responsables un outil fiable pour suivre les épargnes, les prêts et 
        les transactions, tout en renforçant la transparence, l’efficacité et la responsabilisation dans la 
        gestion des ressources financières.`,
        path: "application/appli/Efficacity Library.apk",
        image: "application/images/Efficacity logo 2.png"
    },

]

export default function ApplicationPage() {

    const handleDownload = (e, fileUrl) => {
        e.preventDefault();
        const link = document.createElement('a');

        link.href = fileUrl;
        link.download = fileUrl.split("/")[2];
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full">
            <NavBar />
            <div className="flex justify-center mb-4">
                <div className="w-9/12 mt-20">
                    <TitleSection
                        title={"NOS APPLICATIONS"}
                    />
                    <div className=" w-full h-auto overflow-y-auto">


                        {applications.map(({ title, description, path, image }) => (
                            <div className="flex  gap-2" key={title}>

                                {/* Image */}
                                <div className="w-60 h-60 bg-neutral-50 rounded-xl overflow-hidden">
                                    <img src={image} alt={title} />
                                </div>
                                {/* Infomartion */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl text-[#1769aa] font-semibold text-shadow-xs">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600 text-justify">
                                        {description}
                                    </p>
                                    <div className="flex justify-start">
                                        <button className="text-[#1769aa] hover:text-blue-400 hover:underline text-sm cursor-pointer"
                                            onClick={(e) => handleDownload(e, path)}
                                        >
                                            Télécharger
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>


                </div>

            </div>
            <MFooter />
        </div>
    )
}
