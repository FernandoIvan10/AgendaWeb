// Route handler
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import NewContactPage from '../screens/NewContact'
import ContactListPage from '../screens/ContactList'

export default function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/new-contact' element={<NewContactPage/>}/>
                <Route path='/contact-list' element={<ContactListPage/>}/>
                <Route path="*" element={<Navigate to="/new-contact" />} />
            </Routes>
        </Router>
    )
}