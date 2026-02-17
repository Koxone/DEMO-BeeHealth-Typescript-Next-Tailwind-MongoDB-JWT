import SuccessModal from './SuccessModal';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

export const SharedModalManagement = () => {
  const { activeModal, data, closeModal } = useActiveModalStore();

  return (
    <>{activeModal === 'success' && <SuccessModal title={data?.title} message={data?.message} />}</>
  );
};
