import Swal from 'sweetalert2'

export const toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 6000,
  padding: '0.5rem',
  background: '#703bf7',
  color: '#fff',
})

export const cancelActionModal = Swal.mixin({
  text: 'Esta acción no se puede deshacer',
  cancelButtonText: 'Cancelar',
  icon: 'warning',
  background: '#141414',
  color: '#fff',
  showConfirmButton: true,
  showCancelButton: true,
  allowOutsideClick: false,
  allowEscapeKey: false,
  heightAuto: false
})