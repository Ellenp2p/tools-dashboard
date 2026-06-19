import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-orange-500/30">
      <Outlet />
    </div>
  ),
})