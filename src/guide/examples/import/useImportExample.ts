import { useState } from 'react';

export default function useImportExample() {
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return { name, setName, modalOpen, openModal, closeModal };
}
