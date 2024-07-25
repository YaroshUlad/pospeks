import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import ru from 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

import App from './App.tsx'
import { store } from '@/core/store'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

dayjs.extend(customParseFormat)
dayjs.locale(ru)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
