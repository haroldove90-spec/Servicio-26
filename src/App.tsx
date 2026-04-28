/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Wrench, 
  PlusCircle, 
  Image as ImageIcon, 
  CheckCircle2, 
  ClipboardList, 
  LogOut, 
  Settings,
  Car,
  Search,
  Bell,
  ChevronRight,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Role = 'Asesor' | 'Mecánico' | 'Admin';

interface Vehicle {
  id: string;
  client: string;
  model: string;
  plates: string;
  km: number;
  status: 'In Process' | 'Pending Diagnosis' | 'Ready';
}

// --- Mock Data ---
const initialVehicles: Vehicle[] = [
  { id: '1', client: 'Juan Pérez', model: 'VW Jetta 2022', plates: 'MX-789', km: 25000, status: 'In Process' },
  { id: '2', client: 'María García', model: 'Nissan March', plates: 'ABC-123', km: 10000, status: 'Pending Diagnosis' },
  { id: '3', client: 'Roberto Solís', model: 'Toyota Hilux 2021', plates: 'GHY-456', km: 45000, status: 'In Process' },
];

const stockImages = [
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    id={`sidebar-item-${label.toLowerCase()}`}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/20' 
        : 'text-[#475569] hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div id={`stat-card-${label.replace(/\s+/g, '-').toLowerCase()}`} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default function App() {
  const [role, setRole] = useState<Role>('Asesor');
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null]);

  const loadStockPhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos[index] = stockImages[index];
    setPhotos(newPhotos);
  };

  return (
    <div id="app-root" className="flex h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
      {/* Sidebar */}
      <aside id="main-sidebar" className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-[#1e3a8a] p-2 rounded-lg">
            <Wrench className="text-white" size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-[#1e3a8a]">Servicio 26</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Navegación</div>
          <SidebarItem icon={LayoutDashboard} label="Asesor" active={role === 'Asesor'} onClick={() => setRole('Asesor')} />
          <SidebarItem icon={Wrench} label="Mecánico" active={role === 'Mecánico'} onClick={() => setRole('Mecánico')} />
          <SidebarItem icon={User} label="Admin" active={role === 'Admin'} onClick={() => setRole('Admin')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
          <SidebarItem icon={Settings} label="Configuración" active={false} onClick={() => {}} />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Portal de {role}</h2>
            <p className="text-slate-500 text-sm">Bienvenido de vuelta, Harold</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar vehículo..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all w-64"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-[#1e3a8a] relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10b981] rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-bold text-sm">
              HD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Common Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard label="Autos en Proceso" value="5" color="text-[#1e3a8a]" />
                <StatCard label="Diagnósticos Pendientes" value="3" color="text-[#475569]" />
                <StatCard label="Entregas Hoy" value="2" color="text-[#10b981]" />
              </div>

              {/* Role Specific Content */}
              {role === 'Asesor' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Reception Form */}
                  <div id="reception-form" className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <PlusCircle className="text-[#1e3a8a]" size={20} />
                      </div>
                      <h3 className="text-xl font-bold">Nueva Recepción</h3>
                    </div>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Nombre del Cliente</label>
                        <input type="text" placeholder="Ej: Juan Pérez" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Vehículo (Marca/Modelo)</label>
                        <input type="text" placeholder="Ej: VW Jetta 2022" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Número de Placas</label>
                        <input type="text" placeholder="Ej: MX-789" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Kilometraje Actual</label>
                        <input type="number" placeholder="Ej: 25000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all" />
                      </div>

                      <div className="md:col-span-2 mt-4">
                        <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <Camera size={16} /> Evidencia Fotográfica
                        </h4>
                        <div id="evidence-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['Frontal', 'Trasera', 'Lat. Izq', 'Lat. Der'].map((label, i) => (
                            <div 
                              key={label}
                              id={`photo-placeholder-${label.toLowerCase().replace(' ', '-')}`}
                              onClick={() => loadStockPhoto(i)}
                              className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-100 hover:border-[#1e3a8a] hover:text-[#1e3a8a] cursor-pointer transition-all overflow-hidden group"
                            >
                              {photos[i] ? (
                                <img src={photos[i]!} alt={label} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                              ) : (
                                <>
                                  <ImageIcon size={24} />
                                  <span className="text-[10px] font-bold uppercase">{label}</span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2 pt-4">
                        <button type="button" className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                          Registrar Entrada del Vehículo
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Side List */}
                  <div id="active-vehicles" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-fit">
                    <h3 className="text-xl font-bold mb-6">Recepciones Recientes</h3>
                    <div className="space-y-4">
                      {vehicles.slice(0, 2).map((v) => (
                        <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-[#1e3a8a] rounded-md">{v.plates}</span>
                            <span className="text-[10px] text-slate-400 font-mono">#{v.id}024</span>
                          </div>
                          <p className="font-bold text-slate-800">{v.model}</p>
                          <p className="text-sm text-slate-500">{v.client}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {role === 'Mecánico' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((v) => (
                      <div key={v.id} id={`check-list-${v.id}`} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:ring-2 hover:ring-[#1e3a8a]/10 transition-all">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-xl">
                              <Car className="text-[#475569]" size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{v.model}</p>
                              <p className="text-xs text-slate-500">{v.plates}</p>
                            </div>
                          </div>
                          <button className="p-2 text-[#10b981] hover:bg-green-50 rounded-full transition-colors">
                            <CheckCircle2 size={24} />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tareas Pendientes</p>
                          {[
                            { label: 'Diagnóstico Escáner', done: true },
                            { label: 'Cambio de Aceite', done: false },
                            { label: 'Revisión de Frenos', done: false }
                          ].map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-not-allowed group">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.done ? 'bg-[#10b981] border-[#10b981]' : 'border-slate-300'
                              }`}>
                                {task.done && <CheckCircle2 size={12} className="text-white" />}
                              </div>
                              <span className={`text-sm font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                {task.label}
                                {i === 0 && <span className="ml-2 text-[10px] bg-slate-200 px-1 rounded">Stock Data</span>}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button className="w-full mt-6 py-3 border-2 border-slate-100 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors uppercase tracking-tight">
                          Ver Detalles de Diagnóstico
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {role === 'Admin' && (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-50 p-2 rounded-lg">
                        <ClipboardList className="text-indigo-600" size={20} />
                      </div>
                      <h3 className="text-xl font-bold">Resumen Administrativo</h3>
                    </div>
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all">
                      Exportar Reporte
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 text-left">Vehículo</th>
                          <th className="px-6 py-4 text-left">Asesor</th>
                          <th className="px-6 py-4 text-left">Mecánico</th>
                          <th className="px-6 py-4 text-left">Estado</th>
                          <th className="px-6 py-4 text-right">Costo Est.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { v: 'VW Jetta 2022', a: 'Harold D.', m: 'Carlos R.', s: 'En Proceso', c: '$4,500' },
                          { v: 'Nissan March', a: 'Ana P.', m: 'Jorge M.', s: 'Diagnóstico', c: '$1,200' },
                          { v: 'Toyota Hilux 2021', a: 'Harold D.', m: 'Luis T.', s: 'En Proceso', c: '$7,800' },
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold">{row.v}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{row.a}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{row.m}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                row.s === 'En Proceso' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                              }`}>{row.s}</span>
                            </td>
                            <td className="px-6 py-4 text-sm font-mono text-right font-bold">{row.c}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

