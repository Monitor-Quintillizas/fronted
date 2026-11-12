import { useState } from 'react';
import {
  useGetThresholdsQuery,
  useCreateThresholdMutation,
  useUpdateThresholdMutation,
  useDeleteThresholdMutation
} from '../../services/thresholdsApi';

export const useAlerts = () => {
  const [selectedHost, setSelectedHost] = useState({
    host_id: 1,
    hostname: 'Servidor-Principal',
    ip_address: '192.168.1.100',
    operating_system: 'Linux Mint / Ubuntu 24.04'
  });

  const {
    data: thresholds = [],
    isLoading: loading
  } = useGetThresholdsQuery(selectedHost.host_id);

  const [createThreshold, { isLoading: isCreating }] = useCreateThresholdMutation();
  const [updateThreshold, { isLoading: isUpdating }] = useUpdateThresholdMutation();
  const [deleteThreshold, { isLoading: isDeleting }] = useDeleteThresholdMutation();

  const actionLoading = isCreating || isUpdating || isDeleting;
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Delete Confirmation State
  const [deletingRuleId, setDeletingRuleId] = useState(null);

  // Form State
  const [formMetric, setFormMetric] = useState('cpu_usage_pct');
  const [formOperator, setFormOperator] = useState('>');
  const [formValue, setFormValue] = useState(80);
  const [formActive, setFormActive] = useState(true);

  // Abrir Modal para Crear
  const handleOpenCreate = () => {
    setEditingRule(null);
    setFormMetric('cpu_usage_pct');
    setFormOperator('>');
    setFormValue(80);
    setFormActive(true);
    setIsModalOpen(true);
    setStatusMessage({ type: '', text: '' });
  };

  // Abrir Modal para Editar
  const handleOpenEdit = (rule) => {
    setEditingRule(rule);
    setFormMetric(rule.metric_name);
    setFormOperator(rule.comparison_operator);
    setFormValue(Number(rule.threshold_value));
    setFormActive(Boolean(rule.is_active));
    setIsModalOpen(true);
    setStatusMessage({ type: '', text: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setDeletingRuleId(null);
  };

  // Guardar (Crear / Actualizar en Backend con RTK Query)
  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    try {
      if (editingRule) {
        const res = await updateThreshold({
          threshold_id: editingRule.threshold_id,
          metric_name: formMetric,
          comparison_operator: formOperator,
          threshold_value: formValue,
          is_active: formActive ? 1 : 0
        }).unwrap();

        if (res && res.ok) {
          setStatusMessage({ type: 'success', text: 'Umbral actualizado correctamente en la Base de Datos.' });
          setIsModalOpen(false);
        }
      } else {
        const res = await createThreshold({
          host_id: selectedHost.host_id,
          metric_name: formMetric,
          comparison_operator: formOperator,
          threshold_value: formValue
        }).unwrap();

        if (res && res.ok) {
          setStatusMessage({ type: 'success', text: 'Nuevo umbral guardado exitosamente en la Base de Datos.' });
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error al guardar umbral:', err);
      setStatusMessage({ type: 'error', text: 'Error al comunicarse con el backend para guardar el umbral.' });
    }
  };

  // Eliminar Umbral (Confirmado con RTK Query)
  const handleDelete = async () => {
    if (!deletingRuleId) return;

    try {
      const res = await deleteThreshold(deletingRuleId).unwrap();
      if (res && res.ok) {
        setStatusMessage({ type: 'success', text: 'Umbral eliminado de la Base de Datos.' });
        setDeletingRuleId(null);
      }
    } catch (err) {
      console.error('Error al eliminar umbral:', err);
      setStatusMessage({ type: 'error', text: 'No se pudo eliminar el umbral en el servidor.' });
    }
  };

  return {
    selectedHost,
    setSelectedHost,
    thresholds,
    loading,
    actionLoading,
    statusMessage,
    setStatusMessage,
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
  };
};
