import Link from "next/link";

async function getData() {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6ImJhN2YxOGMyLTA3MWYtNGFmMS1iNDdiLTJkYTkzMTU3NTM0ZCJ9.0JFZYrSbUCGw4RruVyVkaZqkubYxY31uDvQeE5HlADo",
  };
  const response = await fetch(
    "https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=2023-07-09&flag=1",
    {
      headers,
      next: {
        revalidate: 10,
      },
    }
  );

  return response.json();
}

export default async function Orders() {
  const todayDt = new Date().toJSON().slice(0, 10);
  let orders = await getData();
  orders = orders.filter((order: any) => order.date.slice(0, 10) === todayDt);

  return (
    <>
      <h1>Orders</h1>
      <ol>
        {orders.map((order: any, index: any) => (
          <li key={order.nmId}>
            <Link href={`/orders/${order.nmId}`}>
              {index + 1}. {order.date.slice(0, 10)}: {order.supplierArticle}{" "}
              {order.subject} - {order.isCancel == true ? "Отказ" : "Заказ"}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
