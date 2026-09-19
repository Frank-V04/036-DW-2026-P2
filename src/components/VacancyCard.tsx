import type { Vacancy } from '../types';

interface VacancyCardProps {
  vacancy: Vacancy;
  onEdit: (vacancy: Vacancy) => void;
  onDelete: (id: number) => void;
}

const modalidadConfig = {
  presencial: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Presencial' },
  remoto: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Remoto' },
  hibrido: { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'Híbrido' },
};

const estadoConfig = {
  abierta: { bg: 'bg-green-100', text: 'text-green-800', label: 'Abierta' },
  cerrada: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cerrada' },
};

function VacancyCard({ vacancy, onEdit, onDelete }: VacancyCardProps) {
  const { puesto, departamento, modalidad, salarioOfrecido, fechaPublicacion, estado, candidatosPostulados } = vacancy;
  const mod = modalidadConfig[modalidad];
  const est = estadoConfig[estado];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 relative">
      {/* Botones acción */}
      <div className="absolute -top-2.5 -right-2.5 flex gap-1">
        <button
          onClick={() => onEdit(vacancy)}
          title="Editar"
          className="w-6 h-6 rounded-full border-2 border-white bg-brand-600 text-white text-xs leading-5 shadow-md"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(vacancy.id)}
          title="Eliminar"
          className="w-6 h-6 rounded-full border-2 border-white bg-red-500 text-white text-sm leading-5 shadow-md"
        >
          ×
        </button>
      </div>

      {/* Cabecera */}
      <div className="mb-3">
        <h3 className="font-semibold text-slate-900 truncate text-base">{puesto}</h3>
        <p className="text-sm text-slate-500 truncate">{departamento}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${mod.bg} ${mod.text}`}>
          {mod.label}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${est.bg} ${est.text}`}>
          {est.label}
        </span>
      </div>

      {/* Detalles */}
      <div className="space-y-1 text-sm text-slate-600">
        <p>💰 <span className="font-medium">Q{salarioOfrecido.toLocaleString()}</span></p>
        <p>📅 {fechaPublicacion}</p>
        <p>👥 {candidatosPostulados} candidatos</p>
      </div>
    </div>
  );
}

export default VacancyCard;