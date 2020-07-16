import React from 'react';
import { Typography, Box } from '@material-ui/core'

type HeadedSectionProps = {
    title: string;
  };

class HeadedSection extends React.Component<HeadedSectionProps> {

    render() {
        return (
           <div>
                <Typography variant='h5'>
                { this.props.title }
                </Typography>
                <Box 
                    borderColor="grey.500"
                    borderRadius="borderRadius"
                    bgcolor="background.paper"
                    border={1}
                    padding={1}
                    marginBottom={2}
                    >
                    { this.props.children }
                </Box>
            </div>
        );
    }
}

export default HeadedSection;
