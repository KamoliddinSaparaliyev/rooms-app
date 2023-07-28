import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_ROOM = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function RoomCreate() {
  const [name, setName] = useState("");
  const [floor, setFloor] = useState(1);
  const [forStuff, setForStuff] = useState(false);
  const [addRoom, { loading, error }] = useMutation(ADD_ROOM);
  const navigate = useNavigate();

  const disabled = !name || !floor || isNaN(parseInt(floor));

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    addRoom({
      variables: {
        input: { name, floor: parseInt(floor), for_stuff: Boolean(forStuff) },
      },
    }).then(({ data }) => {
      navigate(`/rooms/${data.createRoom.id}`);
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Nomi</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Qavat</label>
          <input
            className="form-control"
            type="number"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="for_stuff">Ustoz uchunmi?</label>
          <select
            className="custom-select ms-2"
            id="for_stuff"
            onChange={(e) => setForStuff(e.target.value === "true")}
            value={forStuff.toString()}
            name="for_stuff"
          >
            <option value="true">Xa</option>
            <option value="false">Yo'q</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={disabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RoomCreate;
