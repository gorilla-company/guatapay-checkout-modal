import './styles.css';
import modalService from './services/modal.service';
import "regenerator-runtime/runtime";

const modoInitPayment = (props) => {
  modalService.showModal(props);
};

export { modoInitPayment };
