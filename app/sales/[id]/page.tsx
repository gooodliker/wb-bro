type Props = {
  params: {
    id: string;
  };
};

export default function Sale({ params: { id } }: Props) {
  return <div>page {id}</div>;
}
