import './styles.css';
import modalService from './services/modal.service';

const modoInitPayment = (props) => {
  modalService.showModal(props);
};

export { modoInitPayment };
