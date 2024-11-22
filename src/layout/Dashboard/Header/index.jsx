import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

export default function Header() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const headerContent = useMemo(() => <HeaderContent />, []);

  const mainHeader = <Toolbar>{headerContent}</Toolbar>;

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  };

  return <>{!downLG ? <AppBarStyled {...appBar}>{mainHeader}</AppBarStyled> : <AppBar {...appBar}>{mainHeader}</AppBar>}</>;
}
