export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-2xl font-bold">Page non trouvée</h2>
            <p className="text-gray-500">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        </div>
    )
}