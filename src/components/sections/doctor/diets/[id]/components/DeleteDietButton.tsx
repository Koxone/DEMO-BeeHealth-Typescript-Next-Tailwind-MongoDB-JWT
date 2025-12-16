function DeleteDietButton({ onClickDelete, isLoading }) {
  return (
    <button
      onClick={onClickDelete}
      disabled={isLoading}
      className="bg-beehealth-red-secondary-solid hover:bg-beehealth-red-secondary-solid-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50"
    >
      {isLoading ? 'Eliminando...' : 'Eliminar dieta'}
    </button>
  );
}

export default DeleteDietButton;
