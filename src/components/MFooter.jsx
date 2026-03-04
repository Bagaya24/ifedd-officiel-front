import { useEffect, useState } from "react";
import { verifyToken } from "../api/auth";
import { adresses, reseauxSociaux } from "../constants";
import { Link } from "react-router-dom";

export default function MFooter() {
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const fetchAuth = async () => {
            const result = await verifyToken();
            setIsConnected(result.isConnected);
        };
        fetchAuth();
    }, []);
    return (
        <footer className="bg-blue-950 w-full h-full md:px-20 md:py-10 px-10 pt-5  gap-2 position-absolute bottom-0">
            <div >
                <div className="flex md:flex-row flex-col">
                    <div className="w-full h-full flex flex-col md:justity-center">
                        <h1 className="text-gray-100 font-semibold md:text-2xl text-xl hover:text-white mb-1">
                            IFEDD
                        </h1>
                        <p className="text-gray-100 md:text-lg hover:text-white">
                            Initiative des Femmes Entrepreneurs pour le Développement Durable.
                        </p>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <h1 className="text-gray-100 font-semibold md:text-2xl text-xl hover:text-white mb-1">
                            Nos adresses
                        </h1>
                        <ul>
                            {adresses.map((adresse, index) => {
                                const AddressIcon = adresse.icon;
                                return (
                                    <li className="mb-1 md:text-sm text-xs" key={index}>
                                        <a
                                            href={adresse.lien}
                                            className="text-gray-100 hover:text-blue-400 "
                                        >
                                            {/* Render inline SVG safely (these icons come from your constants). */}
                                            <AddressIcon className="w-5 h-7 bg-blue-950" />
                                            <span>{adresse.coordonne}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <h1 className="text-gray-100 font-semibold md:text-2xl text-xl hover:text-white mb-1">
                            Heures de travail
                        </h1>
                        <ul className="text-gray-100 md:text-sm text-xs">
                            <li>Lundi-Jeudi : 8h30-17h</li>
                            <li>Vendredi : 8h30-14h</li>
                            <li>Samedi-Dimanche: fermé</li>
                        </ul>
                    </div>

                    <div className="w-full h-full flex flex-col">
                        <h1 className="text-gray-100 font-semibold md:text-2xl text-xl hover:text-white mb-1">
                            Suivez-nous
                        </h1>
                        <div className="w-full h-full flex flex-row">
                            {reseauxSociaux.map((reseau, index) => (
                                <a href={reseau.lien} key={index}>
                                    {/* Render inline SVG safely (these icons come from your constants). */}
                                    <span
                                        className="inline-block mr-3 align-middle "
                                        dangerouslySetInnerHTML={{ __html: reseau.icon }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <Link
                            className="bg-blue-950 border border-gray-50 rounded-lg text-gray-50 md:text-xl text-lg font-semibold md:px-3 md:py-2 px-2 py-1 hover:bg-blue-900 hover:cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1"
                            to={isConnected ? "/logout" : "/login"}
                        >
                            {isConnected ? "Deconnexion" : "Connexion"}
                        </Link>
                    </div>
                </div>
                <div className="w-full border-t border-gray-600 mt-6 pt-6">
                    <p className="text-gray-400 md:text-sm text-xs text-center">
                        &copy; {new Date().getFullYear()} IFEDD. Tous droits réservés.
                    </p>
                </div>
            </div>


        </footer>
    );
}
