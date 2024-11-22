import { BrowserRouter } from 'react-router-dom';

// project import
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AppRoutes from './AppRoutes'; 


export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <BrowserRouter>
          <AppRoutes /> 
        </BrowserRouter>
      </ScrollTop>
    </ThemeCustomization>
  );
}