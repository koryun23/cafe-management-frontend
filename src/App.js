import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import ManagerMenu from './components/ManagerMenu';
import UserForm from './components/UserForm';
import BackgroundImage from './components/BackgroundImage';
import TableForm from './components/TableForm';
import AssignForm from './components/AssignForm';
import ProductsRegistrationForm from './components/ProductsForm';
import ViewProducts from './components/ViewProducts';
import ViewUsers from './components/ViewUsers.js';
import ViewTables from './components/ViewTables';
import WaiterMenu from './components/WaiterMenu.js';
import WaiterHomePage from './components/WaiterHomePage';
import ViewTablesAssignedToWaiter from './components/ViewTablesAssignedToWaiter.js';
import ViewOrders from './components/ViewOrders';
import OrdersRegister from './components/OrdersRegister';
import OrderUpdateForm from './components/OrderUpdateForm';
import ViewProductsInOrder from './components/ViewProductsInOrder';
import ProductInOrderRegistrationForm from './components/ProductInOrderRegistrationForm';
import Input from './components/Input';
import ProductsUpdate from './components/ProductsUpdate';
import UpdateProductInOrder from './components/UpdateProductInOrder';

function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path="/">
              {localStorage.token ? <Redirect to="/home"/> : <Redirect to="/login"/>}
            </Route>

            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route exact path="/users/register">
                <BackgroundImage />
                <ManagerMenu />
                <UserForm />
            </Route>
            <Route path="/tables/register">
                <BackgroundImage />
                <ManagerMenu />
                <TableForm />
            </Route>
            <Route path="/tables-to-waiters/assign">
                <BackgroundImage />
                <ManagerMenu />
                <AssignForm />
            </Route>
            <Route path="/products/register">
                <BackgroundImage />
                <ManagerMenu />
                <ProductsRegistrationForm />
            </Route>
            {/* <Route path="/products/update/:id" >
                <ManagerMenu />
                <ProductsUpdate /> 
            </Route> */}
            <Route path="/products">
              <ManagerMenu />
              <ViewProducts />
            </Route>
            <Route path="/users">
              <ManagerMenu />
              <ViewUsers />
            </Route>
            <Route path="/tables">
              <ManagerMenu />
              <ViewTables />
            </Route>
            <Route path="/tables-to-waiters">
              <WaiterMenu />
              <ViewTablesAssignedToWaiter />
            </Route>
            <Route path="/orders/register/*">
              <BackgroundImage />
              <WaiterMenu />
              <OrdersRegister />
            </Route>
            <Route path="/orders/update/:orderId">
              <BackgroundImage />
              <WaiterMenu />
              <OrderUpdateForm />
            </Route>
            <Route path="/orders">
              <WaiterMenu />
              <ViewOrders />
            </Route>
            <Route path="/products-in-order/register/:orderId">
              <BackgroundImage />
              <WaiterMenu />
              <ProductInOrderRegistrationForm />
            </Route>
            <Route path="/products-in-order/update/:productInOrderId">
              <BackgroundImage />
              <WaiterMenu />
              <UpdateProductInOrder />
            </Route>
            <Route path="/products-in-order/:orderId">
              <WaiterMenu />
              <ViewProductsInOrder />
            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
