//detalle de una task
import { useParams } from "react-router-dom";

export default function TaskItem() {
  const { id } = useParams();

  return (
    <>
      <h1>TaskItem</h1>
      <p>ID: {id}</p>
    </>
  );
}
