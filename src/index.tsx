import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import store from './store/store'
import App from './components/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
