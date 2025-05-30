import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 className="logo-text">README Spawner</h1>
        </div>
        {/* <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Plantillas</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Acerca de</a>
            </li>
          </ul>
        </nav> */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
