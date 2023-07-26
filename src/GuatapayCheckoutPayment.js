import './styles.css'
import 'regenerator-runtime/runtime'
import buttonService from './services/button.service'

const InitGuatapayPayment = () => {
  buttonService.displayButton()
}

// eslint-disable-next-line import/prefer-default-export
export { InitGuatapayPayment }
