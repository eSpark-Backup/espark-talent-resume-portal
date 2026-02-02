import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { TextField, Typography, Stack, Tooltip, Box } from '@mui/material';
import { NumericFormat } from 'react-number-format'; // Assuming NumericFormat is correctly imported
import InfoIcon from '@mui/icons-material/Info';

const CustomInput = ({ required, label, type, name, onChange, placeholder, maxLength, disabled, phone, tooltip }) => {
    const handlePhoneChange = (value, country, e, formattedValue) => {
        onChange(name, formattedValue); // Assuming you want to pass the formatted phone number
    };

    const handleNumberChange = (values) => {
        onChange(name, values.value);
    };

    return (
        type === "tel" ? (
            <Stack>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                    <Tooltip placement="top-start" title={tooltip}>
                        <InfoIcon
                            style={{
                                marginLeft: "5px",
                                color: "rgb(97, 192, 224)",
                                fontSize: "13px",
                                marginBottom: "12px",
                            }}
                        />
                    </Tooltip>
                </Box>
                <PhoneInput
                    country={'pk'}
                    disableDropdown={true}
                    inputStyle={{ color: "black" }}
                    countryCodeEditable={false}
                    onChange={handlePhoneChange}
                    value={phone}
                    onlyCountries={['pk']}
                />
            </Stack>
        ) : name === "salary_expection" ? (
            <Stack direction="column">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                    <Tooltip placement="top-start" title={tooltip}>
                        <InfoIcon
                            style={{
                                marginLeft: "5px",
                                color: "rgb(97, 192, 224)",
                                fontSize: "13px",
                                marginBottom: "12px",
                            }}
                        />
                    </Tooltip>


                </Box>

                <NumericFormat
                    allowNegative={false}
                    min={10}
                    placeholder={placeholder}
                    name={name}
                    allowLeadingZeros
                    thousandSeparator=","
                    onChange={(e) => onChange(name, e.target.value)}
                    style={{ height: "56px", backgroundColor: "white", color: "black" }}
                />
            </Stack>
        ) : (
            <Stack direction="column">
                {
                    !(name === "cv") && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                            {tooltip && <Tooltip placement="top-start" title={tooltip}>
                                <InfoIcon
                                    style={{
                                        marginLeft: "5px",
                                        color: "rgb(97, 192, 224)",
                                        fontSize: "13px",
                                        marginBottom: "12px",
                                    }}
                                />
                            </Tooltip>}

                        </Box>
                    )
                }


                <TextField
                    disabled={disabled}
                    name={name}
                    onChange={(e) => onChange(name, type === "file" ? e.target.files[0] : e.target.value)}
                    type={type ? type : "text"}
                    placeholder={placeholder}
                    required={required}
                    {...(maxLength && { onInput: (e) => e.target.value = e.target.value.slice(0, maxLength) })}
                    
                />
            </Stack>
        )
    );
}

export default CustomInput;