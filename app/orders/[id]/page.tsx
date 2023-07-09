type Props = {
  params: {
    id: string;
  };
};

export default function Order({ params: { id } }: Props) {
  return <div>page {id}</div>;
}
