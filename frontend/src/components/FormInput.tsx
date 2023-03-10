import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        fontWeight: 500,
    },
});

type FormInputProps = {
    name: string;
} & TextFieldProps;

export const FormInput = ({ name, ...otherProps }: FormInputProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=''
            render={({ field }) => (
                <CssTextField
                    {...field}
                    {...otherProps}
                    variant='outlined'
                    sx={{ marginBottom: '1.5rem' }}
                    error={!!errors[name]}
                    helperText={
                        errors[name] ? (errors[name]?.message as unknown as string) : ''
                    }
                />
            )}
        />
    );
};