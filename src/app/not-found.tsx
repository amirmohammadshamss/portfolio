import Link from "next/link";
import { Header, Footer } from "@/components/layout";
export default function NotFound() { return <><Header/><main id="main" className="container not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A little off course.</h1><p>This page isn’t part of the portfolio.</p><Link className="button button-primary" href="/">Return home</Link></main><Footer/></>; }
