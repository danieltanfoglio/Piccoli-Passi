import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Servizi from "@/pages/Servizi";
import Prezzi from "@/pages/Prezzi";
import Contatti from "@/pages/Contatti";
import ChiSono from "@/pages/ChiSono";
import PrenotaOra from "@/pages/PrenotaOra";
import ScrollToTop from "@/components/ScrollToTop";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/servizi" component={Servizi} />
        <Route path="/prezzi" component={Prezzi} />
        <Route path="/contatti" component={Contatti} />
        <Route path="/chi-sono" component={ChiSono} />
        <Route path="/prenota-ora" component={PrenotaOra} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
