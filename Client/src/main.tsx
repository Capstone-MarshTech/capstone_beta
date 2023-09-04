import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/api";
import FilterSlicer from "./slicer/FilterSlicer.tsx";

export const store = configureStore({
  // Setting up our API reducer Path
  reducer: { [api.reducerPath]: api.reducer, filter: FilterSlicer },

  // Middleware and Listeners config for Redux
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>

    <App />
   
  </Provider>
);
