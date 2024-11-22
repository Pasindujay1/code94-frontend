// import AddProduct from 'pages/add-product/AddProduct';
// import AuthLogin from 'pages/authentication/auth-forms/AuthLogin';
// import AuthRegister from 'pages/authentication/auth-forms/AuthRegister';
// import DashboardDefault from 'pages/dashboard';
// import EditProduct from 'pages/edit-product/editProduct';
// import FavouriteProducts from 'pages/favourite-products/FavouriteProducts';
// import Color from 'pages/component-overview/color';
// import Typography from 'pages/component-overview/typography';
// import Shadow from 'pages/component-overview/shadows';
// import SamplePage from 'pages/extra-pages/sample-page';
// import { Routes, Route } from 'react-router';
// import DashboardLayout from 'layout/Dashboard';
// import MinimalLayout from 'layout/MinimalLayout';
// import Login from 'pages/authentication/login';
// import Register from 'pages/authentication/register';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<DashboardLayout />}>
//         <Route index element={<DashboardDefault />} />
//         <Route path="favouriteProducts" element={<FavouriteProducts />} />
//         <Route path="addProduct" element={<AddProduct />} />
//         <Route path="editProduct" element={<EditProduct />} />
//         <Route path="color" element={<Color />} />
//         {/* <Route path="dashboard/default" element={<DashboardDefault />} /> */}
//         <Route path="sample-page" element={<SamplePage />} />
//         <Route path="shadow" element={<Shadow />} />
//         <Route path="typography" element={<Typography />} />
//       </Route>
//       <Route path="/" element={<MinimalLayout />}>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProduct from 'pages/add-product/AddProduct';

// import DashboardDefault from 'pages/dashboard';
import DashboardDefault from 'pages/Dashboard';
import EditProduct from 'pages/editProduct';
import FavouriteProducts from 'pages/FavouriteProducts';

import DashboardLayout from 'layout/Dashboard';
import MinimalLayout from 'layout/MinimalLayout';
import Login from 'pages/authentication/login';
import Register from 'pages/authentication/register';
import PrivateRoute from 'components/PrivateRoute';
import SearchResults from 'pages/SearchResults';
import ViewProduct from 'pages/ViewProduct';
import FavoriteSearchResults from 'pages/FavoriteSearchResults';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardDefault />} />
        <Route element={<PrivateRoute />}>
          <Route path="favouriteProducts" element={<FavouriteProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="editProduct" element={<EditProduct />} />
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="viewProduct" element={<ViewProduct />} />
          <Route path="favoriteSearchResults" element={<FavoriteSearchResults />} />
          
        </Route>
      </Route>
      <Route path="/" element={<MinimalLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;