import NavBar from './NavBar';
import classes from './Layout.module.css';

function Layout(props: any) {
  return (
    <div>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;