import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/sales">Sales</Link>
    </header>
  );
}
