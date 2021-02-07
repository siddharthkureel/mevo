import React from 'react';
import logo from '../logo-light.svg';

const Navbar = () => {
    return (
        <div style={styles.container} >
            <img style={styles.logo} src={logo} alt={'logo'} height={50} />
            <span style={styles.heading}>Find my Ride</span>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        background: '#00afdd', 
        padding: '30px 0',
        marginBottom: '20px',
    },
    heading: {
        fontFamily: "'Francois One', sans-serif",
        margin: "auto", 
        color: "white", 
        fontWeight: 'bolder',
        fontSize: '30px'
    },
    logo: {
        margin: '0 40px'
    }
}

export default Navbar;
