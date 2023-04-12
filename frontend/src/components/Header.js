import logo from "../assets/Sportsee_logo.svg"
import "../style/components/Header.css"

function Header(){
  return(
    <header className="header">
      <img src={logo} className='sportsee-logo' alt='logo' />
      <h3>Accueil</h3>
      <h3>Profil</h3>
      <h3>Réglages</h3>
      <h3>Communauté</h3>
    </header>
  )
}

export default Header
