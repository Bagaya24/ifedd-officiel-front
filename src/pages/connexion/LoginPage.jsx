import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { loginUser } from '../../api/authService';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ message: '', type: '' });

        try {
            const result = await loginUser(username, password);

            if (result.success) {
                setAlert({ message: 'Connexion réussie !', type: 'success' });

                // Redirection après 1 seconde
                setTimeout(async () => {
                    await navigate('/');
                }, 1000);
            } else {
                setAlert({
                    message: result.message || 'Identifiants incorrects',
                    type: 'error'
                });
            }
        } catch (error) {
            setAlert({
                message: 'Erreur de connexion. Veuillez réessayer.',
                type: 'error'
            });
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-50">
            {/* Alert */}
            {alert.message && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: '', type: '' })}
                    />
                </div>
            )}

            <div className="w-full max-w-md px-6">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header avec gradient */}
                    <div className="bg-linear-to-r from-[#1769aa] to-blue-600 p-8 text-center">
                        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <UserCircleIcon className="w-12 h-12 text-[#1769aa]" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
                        <p className="text-blue-100">Accédez à votre espace administrateur</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Nom d'utilisateur
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1769aa] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-700 font-medium"
                                    placeholder="Entrez votre nom d'utilisateur"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1769aa] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-700 font-medium"
                                    placeholder="Entrez votre mot de passe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        {/* <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[#1769aa] border-gray-300 rounded focus:ring-[#1769aa] cursor-pointer"
                                />
                                <span className="ml-2 text-gray-600">Se souvenir de moi</span>
                            </label>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 transform cursor-pointer ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-linear-to-r from-[#1769aa] to-blue-600 hover:from-[#1557a] hover:to-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg aria-label='connexion' className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion en cours...
                                </span>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="px-8 pb-8 text-center">
                        <p className="text-sm text-gray-600">
                            Pas encore de compte ?{' '}
                            <a href="mailto:ifeddrdc@gmail.com" className="text-[#1769aa] hover:text-blue-700 font-semibold">
                                Contactez l'administrateur
                            </a>
                        </p>
                    </div>
                </div>

                {/* Back to home link */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-[#1769aa] hover:underline font-medium transition-colors"
                    >
                        ← Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
}
