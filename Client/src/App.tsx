import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import GraphsDashboard from "@/views/graphs-dashboard";
import TablesDashboard from "@/views/tables-dasboard";
import { Filter } from "./components/modal/filter";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Routes>
                {/* Graph view */}
                <Route path="/" element={<GraphsDashboard />} />
                {/* Table view */}
                <Route path="/table-view" element={<TablesDashboard />} />
                {/* Filter view */}
                <Route path="/filter" element={<Filter />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
