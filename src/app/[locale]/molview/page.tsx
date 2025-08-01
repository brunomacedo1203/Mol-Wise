import { MolViewIframe } from "@/features/molview";

export default function MolViewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Visualizador de Moléculas
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Explore moléculas de forma interativa usando o MolView. Digite
          fórmulas químicas, visualize estruturas 3D e explore diferentes
          representações moleculares.
        </p>

        <MolViewIframe width="100%" height="700px" className="w-full" />
      </div>
    </div>
  );
}
