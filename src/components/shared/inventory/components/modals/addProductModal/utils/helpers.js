import { Pill, FileText, Syringe } from 'lucide-react';

/* Layout helpers */
function getGradient(tab) {
  if (tab === 'medicamentos') return 'from-green-500 to-emerald-500';
  if (tab === 'recetas') return 'from-blue-500 to-indigo-500';
  return 'from-purple-500 to-pink-500';
}
function getIcon(tab) {
  if (tab === 'medicamentos') return <Pill className="h-6 w-6 text-white" />;
  if (tab === 'recetas') return <FileText className="h-6 w-6 text-white" />;
  return <Syringe className="h-6 w-6 text-white" />;
}

export { getGradient, getIcon };
