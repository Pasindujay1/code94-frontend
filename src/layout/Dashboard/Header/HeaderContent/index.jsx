// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Profile from './Profile';
import Title from './Title';

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Title />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {!downLG && <Profile />}
    </>
  );
}
