import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../util/button/Button';
import logo from '../../assets/thumb.png';
import styles from './Header.module.css';
import { UserContext } from '../../Context/userContext';
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import MenuMobile from '../menuMobile/MenuMobile';

export default function Header({ link = '', onClick = () => {} }) {
  const { user, signOut, getInformations } = useContext(UserContext);
  const [logoutText, setLogoutText] = useState('Sair');

  const handleSignOut = () => {
    setLogoutText('Saindo...');
    setTimeout(() => {
      signOut();
    }, 1500);
  };

  const renderUserSection = () => {
    if (user) {
      const userName = getInformations()[1];
      return (
        <a className={styles.link} onClick={handleSignOut}>
          <div className={styles.divLoginArea}>
            <div className={styles.iconDiv}>
              <div className={styles.userInf}>
                <FaRegUserCircle size={'25px'} />
                <span>{userName}</span>
              </div>
            </div>
            <div className={styles.iconDiv}>
              <div className={styles.leaveInf}>
                <IoIosLogOut size={'25px'} />
                <span>{logoutText}</span>
              </div>
            </div>
          </div>
        </a>
      );
    } else {
      return (
        <a href="/login" className={styles.link}>
          <div className={styles.divLoginArea}>
            <div className={styles.iconDiv}>
              <IoIosLogIn size={'25px'} />
            </div>
            <span>Entrar</span>
          </div>
        </a>
      );
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.photoHeader}>
          <a href="/home">
            <img src={logo} alt="Logo" />
          </a>
          <h3>Armazém TV</h3>
        </div>
        <nav className={styles.divMenu}>
          <Button text={'Home'} link={'/home'} onClick={onClick} />
          <Button text={'Add Artigo'} link={'/add'} onClick={onClick} />
          <Button text={'Ver Log'} link={'/log'} onClick={onClick} />
          <Button text={'Config'} link={'/config'} onClick={onClick} />
        </nav>
        <div className={styles.divBt}>
          {renderUserSection()}
        </div>
      </header>
      <div className={styles.menuMobile}>
        <MenuMobile />
      </div>
    </div>
  );
}

Header.propTypes = {
  link: PropTypes.string,
  onClick: PropTypes.func,
};
