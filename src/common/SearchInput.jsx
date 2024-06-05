import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

const SearchInput = ({setSearch, search, placeholder}) => {
    return (
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel 
                htmlFor="search"
                sx={{
                    color: 'inherit',  // Maintain the original color
                    '&.Mui-focused': {
                        color: 'inherit',  // Prevent color change on focus
                    },
                }}
            >
                Search Candidate
            </InputLabel>
            <Input
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    input: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                    '&:before, &:after': {
                        display: 'none',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        display: 'none',
                    },
                    '& .MuiInputAdornment-root': {
                        marginRight: '8px',
                    },
                }}
                id="search"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default SearchInput
