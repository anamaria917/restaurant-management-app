import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const FilledActionButton = styled(Button)`
  cursor: pointer;
  width: ${(props) => props.width || "88px"};
  min-width: ${(props) => props.width || "88px"};
  background-color: ${(props) => props.bg || "#323cf0"};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.textColor || "white"};
  height: 44px !important;
  border-radius: 0px;
  &:hover {
    opacity: 0.6;
    background-color: ${(props) => props.bg || "#323cf0"};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default FilledActionButton;
