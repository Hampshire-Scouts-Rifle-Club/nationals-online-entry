import React from 'react';
import './CampHelpers.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

class CampHelpers extends React.Component {
    render() {
        return (
            <HeadedSection title="Camp Helpers (not shooting)">
                <AddButton onClick={() => this.handleClickOpen()}>Add Camp Helper</AddButton>
            </HeadedSection>
        );
    }

    handleClickOpen() {
    }
}

export default CampHelpers;
