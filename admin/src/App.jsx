import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import ProductEdit from "./Pages/Products/ProductEdit";
import AddNewProduct from "./Pages/Products/AddNewProduct";
import TestGrid from "./Pages/Products/Grid";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/login/Login";
import NotFound from "./Pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import ProductDetail from "./Pages/Products/ProductDetail";
import CustomerOrders from "./Pages/Orders/CustomerOrders";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="products/new"
            element={
              <RequireAuth>
                <AddNewProduct />
              </RequireAuth>
            }
          />
          <Route
            path="products/:productId/edit"
            element={
              <RequireAuth>
                <ProductEdit />
              </RequireAuth>
            }
          />
          <Route
            path="products/:productId"
            element={
              <RequireAuth>
                <ProductDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/customers"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/customers/orders"
            element={
              <RequireAuth>
                <CustomerOrders />
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/category"
            element={
              <RequireAuth>
                <TestGrid />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
