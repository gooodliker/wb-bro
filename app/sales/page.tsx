import Link from "next/link";

async function getData() {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6ImJhN2YxOGMyLTA3MWYtNGFmMS1iNDdiLTJkYTkzMTU3NTM0ZCJ9.0JFZYrSbUCGw4RruVyVkaZqkubYxY31uDvQeE5HlADo",
  };
  const response = await fetch(
    "https://statistics-api.wildberries.ru/api/v1/supplier/sales?dateFrom=2023-07-09&flag=1",
    {
      headers,
      next: {
        revalidate: 10,
      },
    }
  );

  return response.json();
}

export default async function Sales() {
  const todayDt = new Date().toJSON().slice(0, 10);
  let sales = await getData();
  sales = sales.filter((sale: any) => sale.date.slice(0, 10) === todayDt);

  return (
    <>
      <h1>Sales</h1>
      <ol>
        {sales.map((sale: any, index: any) => (
          <li key={sale.nmId}>
            <Link href={`/sales/${sale.nmId}`}>
              {index + 1}. {sale.date.slice(0, 10)}: {sale.supplierArticle}{" "}
              {sale.subject} - {sale.IsStorno == 0 ? "Продажа" : "Возврат"}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
