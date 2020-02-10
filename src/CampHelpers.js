import React from 'react';
import './CampHelpers.css';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

class CampHelpers extends React.Component {
    render() {
        return (
            <HeadedSection title="Camp Helpers (not shooting)">
                <AddButton>Add Camp Helper</AddButton>
            </HeadedSection>
        );
    }
}

export default CampHelpers;
