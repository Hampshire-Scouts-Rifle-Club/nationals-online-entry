import React from 'react';
import { Typography, Box } from '@material-ui/core'

class HeadedSection extends React.Component {
    render() {
        return (
           <>
                <Typography variant='h5'>
                { this.props.title }
                </Typography>
                <Box 
                    display="flex" 
                    borderColor="grey.500"
                    borderRadius="borderRadius"
                    bgcolor="background.paper"
                    border={1}
                    padding={1}
                    marginBottom={2}>
                    { this.props.children }
                </Box>
            </>
        );
    }
}

export default HeadedSection;
