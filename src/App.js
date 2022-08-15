import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import { Switch, Route, BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom';
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
import { useEffect, useState } from 'react';

function App() {

  const [role = localStorage.getItem("role"), setRole] = useState();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("role", role)
  });

  const logIn = (role) => setRole(role);
  const logOut = () => setRole(null);

  return (
    <div>
      <Router>
          <Switch>
            <Route exact path="/">
              {role ? <Redirect to="/home"/> : <Redirect to="/login"/>}
            </Route>

            <Route path="/login">
                <LoginPage onLogin={logIn}/>
            </Route>
            <Route path="/home">
              {
                role ? <HomePage /> : <LoginPage onLogin={logIn}/>
              }
            </Route>
            <Route exact path="/users/register">
                {
                  role === 'MANAGER' ? 
                  <div>
                    <BackgroundImage />
                    <ManagerMenu />
                    <UserForm />
                  </div> : <Redirect to="/home" />
                }
            </Route>
            <Route path="/tables/register">
                {
                  role === 'MANAGER' ?
                  <div>
                    <BackgroundImage />
                    <ManagerMenu />
                    <TableForm />
                  </div> : <Redirect to="/home"/>
                }
            </Route>
            <Route path="/tables-to-waiters/assign">
                {
                  role === 'MANAGER' ?
                  <div>
                    <BackgroundImage />
                    <ManagerMenu />
                    <AssignForm />
                  </div> : <Redirect to="/home"/>
                }  

            </Route>
            <Route path="/products/register">
                {
                  role === 'MANAGER' ? 
                  <div>
                    <BackgroundImage />
                    <ManagerMenu />
                    <ProductsRegistrationForm />
                  </div> : <Redirect to="/home"/>
                }
            </Route>
            <Route path="/products">
              {
                role === 'MANAGER' ? 
                <div>
                  <ManagerMenu />
                  <ViewProducts /> 
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/users">
              {
                role === 'MANAGER' ? 
                <div>
                  <ManagerMenu />
                  <ViewUsers />
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/tables">
              {
                role === 'MANAGER' ?
                <div>
                  <ManagerMenu />
                  <ViewTables />
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/tables-to-waiters">
              {
                role === 'WAITER' ? 
                <div>
                  <WaiterMenu />
                  <ViewTablesAssignedToWaiter />
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/orders/update/:orderId">
              {
                role === 'WAITER' ?
                <div>
                  <BackgroundImage />
                  <WaiterMenu />
                  <OrderUpdateForm />
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/orders">
              {
                role === "WAITER" ?
                <div>
                  <WaiterMenu />
                  <ViewOrders />
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/products-in-order/register/:orderId">
              {
                role === 'WAITER' ?
                <div>
                  <BackgroundImage />
                  <WaiterMenu />
                  <ProductInOrderRegistrationForm />
                </div> : <Redirect to="/home"/>
              }
            </Route>
            <Route path="/products-in-order/update/:productInOrderId">
              {
                role === 'WAITER' ?
                <div>
                  <BackgroundImage />
                  <WaiterMenu />
                  <UpdateProductInOrder />
                </div> : <Redirect to="/home" />
              }
            </Route>
            <Route path="/products-in-order/:orderId">
              {
                role === 'WAITER' ? 
                <div>
                  <WaiterMenu />
                  <ViewProductsInOrder />
                </div> : <Redirect to="/home"/>
              }
            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
