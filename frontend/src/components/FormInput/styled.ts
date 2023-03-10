import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        fontWeight: 500,
    },
});