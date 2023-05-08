import './styles.css';
import modalService from './services/modal.service';
import 'regenerator-runtime/runtime';

const InitPayment = (props) => {
  modalService.showModal(props);
};

// eslint-disable-next-line import/prefer-default-export
export { InitPayment };
