import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import Deliver from './views/deliveryagent/Deliver'

import Pickup from './views/deliveryagent/Pickup'

function DeliveryAgentMain() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  return (
    <>
      <div className='app'>
        <Sidebar />
        <main className='content'>
          <Routes>
            <Route exact path='/pickup' element={<Pickup />} />
            <Route exact path='/deliver' element={<Deliver />} />

            <Route path='*' element={<Navigate to='/pickup' replace />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default DeliveryAgentMain
