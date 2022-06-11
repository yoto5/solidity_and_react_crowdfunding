import ConnectButton from '../layout/connectButton';
import classes from './NavBar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import pic from '../../styles/tech_symbol.png';

function NavBar(props: any) {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/"><a><Image src={pic}  alt="me" width="50" height="50"/></a></Link>
        <Link href='/'> TechStarter </Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href='/'>All Projects</Link>
          </li>
          <li>
            <Link href='/user_page'>My Area</Link>
          </li>
          <li>
            <Link href='/new_project'>Add New Project</Link>
          </li>
          <li>
            <ConnectButton isConnectedHandler={props.isConnectedHandler}/>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;