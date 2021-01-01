import React,{Fragment,useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../contaxt/auth/authContext';
import ContactContext from '../../contaxt/contact/contactContext';
const Navbar=({title,icon})=>{

    const authContext=useContext(AuthContext);
    const contactContext=useContext(ContactContext);

    const {clearContacts}=contactContext;
    const {isAuthenticated,logout,user}=authContext;

    const onLogout=()=>{
        logout();
        clearContacts();
        
    }

    const authLinks=(
        <Fragment>
        <li><i className="fas fa-user"></i>{' '} {user && user.name}</li>
        <li><a href="#!" onClick={onLogout}>
            <i className="fas fa-sign-out-alt">
                </i><span className="hide-sm">Logout</span>
            </a></li>
        </Fragment>
    )


    const guestLinks=(
        <Fragment>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
        </Fragment>
    )

    return(
        <div className="navbar bg-primary">
            <h2>
                <i className={icon}></i> {title}
            </h2>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}        
            </ul>

        </div>

    )
};


Navbar.propTypes={
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}

Navbar.defaultProps={
    title:'Contact Keeper',
    icon:'fas fa-id-card-alt'
}

export default Navbar;