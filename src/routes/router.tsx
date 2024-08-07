import AccountRoute from "@features/account/AccountRoute";
import NextOrderIdRoute from "@features/transactions/read/NextOrderIdRoute";
import OpenErcOrdersRoute from "@features/transactions/read/OpenErcOrdersRoute";
import AcceptErcOrderTxRoute from "@features/transactions/write/acceptErcOrsderTransaction/AcceptErcOrderTxRoute";
import ERCOrderTransactionRoute from "@features/transactions/write/placeErcOrderTransaction/ERCOrderTransactionRoute";
import { MainLayout } from "@layouts/MainLayout";
import { RoutePaths } from "@routes/RoutePaths";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutePaths.HOME} element={<MainLayout />}>
      <Route index element={<AccountRoute />} />
      <Route path={RoutePaths.NEXT_ORDER} element={<NextOrderIdRoute />} />
      <Route
        path={RoutePaths.OPEN_ERC_ORDERS}
        element={<OpenErcOrdersRoute />}
      />
      <Route
        path={RoutePaths.PLACE_ERC_ORDER}
        element={<ERCOrderTransactionRoute />}
      />
      <Route
        path={RoutePaths.ACCEPT_ERC_ORDER}
        element={<AcceptErcOrderTxRoute />}
      />
    </Route>
  )
);
