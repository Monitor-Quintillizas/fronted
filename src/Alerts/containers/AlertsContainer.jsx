import React from 'react';
import NavbarContainer from '../../Navbar/containers/NavbarContainer';
import { useAlerts } from '../utils/useAlerts';
import StatusMessage from '../components/StatusMessage';
import ThresholdTable from '../components/ThresholdTable';
import ThresholdModal from '../components/ThresholdModal';
import DeleteThresholdModal from '../components/DeleteThresholdModal';
import { Plus } from 'lucide-react';

export default function AlertsContainer() {
  const {
    selectedHost,
    setSelectedHost,
    thresholds,
    loading,
    actionLoading,
    statusMessage,
    isModalOpen,
    editingRule,
    deletingRuleId,
    setDeletingRuleId,
    formMetric,
    setFormMetric,
    formOperator,
    setFormOperator,
    formValue,
    setFormValue,
    formActive,
    setFormActive,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleCloseDeleteModal,
    handleSave,
    handleDelete
  } = useAlerts();

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100 relative overflow-x-hidden">
      {/* Fondo con Wallpaper de Pantalla */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/backgrounds/quintuplets_master.jpg"
          alt="Wallpaper"
          className="w-full h-full object-cover opacity-20 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <div className="relative z-10">
        {/* Top Navigation */}
        <NavbarContainer selectedHost={selectedHost} onSelectHost={setSelectedHost} />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          {/* Header Ribbon & Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase">
                <span>Gestión de Reglas</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Servicios Backend PHP</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Configuración de Umbrales de Alerta
              </h1>
            </div>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold px-4 py-2 rounded-none text-xs transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Regla de Umbral</span>
            </button>
          </div>

          {/* Mensaje de Estado / Feedback */}
          <StatusMessage statusMessage={statusMessage} />

          {/* Tabla de Umbrales */}
          <ThresholdTable
            thresholds={thresholds}
            loading={loading}
            selectedHost={selectedHost}
            onOpenCreate={handleOpenCreate}
            onOpenEdit={handleOpenEdit}
            onDeleteClick={setDeletingRuleId}
          />
        </main>
      </div>

      {/* Modal: Crear / Editar Umbral */}
      <ThresholdModal
        isOpen={isModalOpen}
        editingRule={editingRule}
        selectedHost={selectedHost}
        formMetric={formMetric}
        formOperator={formOperator}
        formValue={formValue}
        formActive={formActive}
        actionLoading={actionLoading}
        onMetricChange={setFormMetric}
        onOperatorChange={setFormOperator}
        onValueChange={setFormValue}
        onActiveChange={setFormActive}
        onClose={handleCloseModal}
        onSubmit={handleSave}
      />

      {/* Modal: Confirmación antes de eliminar */}
      <DeleteThresholdModal
        deletingRuleId={deletingRuleId}
        actionLoading={actionLoading}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}
