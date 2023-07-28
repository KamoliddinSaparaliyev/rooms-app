import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

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

const UPDATE_ROOM = gql`
  mutation UpdateRoom($updateRoomId: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $updateRoomId, input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function RoomUpdate() {
  const [forStuff, setForStuff] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [update, setUpdate] = useState({});
  const [getRoom, { called, loading, error, data }] = useLazyQuery(GET_ROOM);

  useEffect(() => {
    getRoom({ variables: { roomId: id } });
  }, [getRoom, id]);

  const [UpdateRoom, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_ROOM);

  if (loading || !called) {
    return <div>Loading...</div>;
  }

  if (error || mutationError) {
    return <div>Error: {error ? error.message : mutationError.message}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateRoom({
      variables: {
        updateRoomId: id,
        input: { ...update, for_stuff: Boolean(forStuff) },
      },
    }).then(({ data }) => {
      navigate(`/rooms`);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Nomi</label>
          <input
            class="form-control"
            type="text"
            defaultValue={data.room.name}
            onChange={(e) => setUpdate({ ...update, name: e.target.value })}
          />
        </div>
        <div class="form-group mt-3">
          <label>Qavat</label>
          <input
            class="form-control"
            type="number"
            defaultValue={data.room.floor}
            onChange={(e) => setUpdate({ ...update, floor: +e.target.value })}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="for_stuff">Ustoz uchunmi?</label>
          <select
            className="custom-select ms-2"
            id="for_stuff"
            onChange={(e) => setForStuff(e.target.value)}
            defaultValue={data.room.for_stuff.toString()}
            name="for_stuff"
          >
            <option value="true">Xa</option>
            <option value="false">Yo'q</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
}

export default RoomUpdate;
