import memeLogo from "../images/meme-logo.ico";

function Navbar () {
      return (
            <header>
            <nav className="nav">
            <img src={memeLogo} className="nav__image" alt="meme-logo" />
            <h3>Meme Generator</h3>
            </nav>
            </header>
      )
}

export default Navbar;