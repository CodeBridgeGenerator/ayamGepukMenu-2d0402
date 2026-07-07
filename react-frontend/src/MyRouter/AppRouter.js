import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleMenuPage from "../components/app_components/MenuPage/SingleMenuPage";
import MenuProjectLayoutPage from "../components/app_components/MenuPage/MenuProjectLayoutPage";
import SingleOrderPage from "../components/app_components/OrderPage/SingleOrderPage";
import OrderProjectLayoutPage from "../components/app_components/OrderPage/OrderProjectLayoutPage";
import SingleInventoryPage from "../components/app_components/InventoryPage/SingleInventoryPage";
import InventoryProjectLayoutPage from "../components/app_components/InventoryPage/InventoryProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/menu/:singleMenuId" exact element={<SingleMenuPage />} />
<Route path="/menu" exact element={<MenuProjectLayoutPage />} />
<Route path="/order/:singleOrderId" exact element={<SingleOrderPage />} />
<Route path="/order" exact element={<OrderProjectLayoutPage />} />
<Route path="/inventory/:singleInventoryId" exact element={<SingleInventoryPage />} />
<Route path="/inventory" exact element={<InventoryProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
