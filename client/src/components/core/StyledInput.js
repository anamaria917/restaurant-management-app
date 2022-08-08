import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)`
  flex: 1;
  height: 44px;
  border-color: #848484;
  &:focus {
  }
  &:active {
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .MuiTextField-root {
    height: 44px !important;
  }
  MuiInputBase-root {
    height: 44px !important;
  }
`;

export default StyledInput;
