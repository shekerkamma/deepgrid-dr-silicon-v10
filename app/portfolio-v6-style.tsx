// The v6 home/portfolio stylesheet, owned by one JS module. Imported bare from three pages, the CSS-only
// module came out with no client chunk while the server manifest still listed one ("Missing asset:
// portfolio-v6-*.js" at packaging, 2026-10-04); a module with a rendered export keeps both builds agreeing.
import './portfolio-v6.css';
export function PortfolioV6Style() { return null; }
