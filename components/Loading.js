import styled from "styled-components";
import { Circle } from "better-react-spinkit";

//
const Loading = () => {
  return (
    <Center>
      <div>
        <Circle color="limegreen" size={60} />
      </div>
    </Center>
  );
};

export default Loading;

const Center = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
