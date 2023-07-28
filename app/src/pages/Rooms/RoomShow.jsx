import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_ROOM = gql`
  query GetRoom($roomId: ID!) {
    room(id: $roomId) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function RoomShow() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { roomId: id },
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <>
      <h1>Xona: {data?.room.name}</h1>
      <h5>Qavat: {data?.room.floor}</h5>
      <p>Bu xona {data?.room.for_stuff ? "ustozlar" : "o'quvchilar"} uchun</p>
    </>
  );
}

export default RoomShow;
