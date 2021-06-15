import React, { useState } from 'react';

const Student = (props) => {
    /**
     * Returns the average test grade.
     * 
     * @param {Array} grades 
     * @returns the average test grade as a percentage
     */
    const getAverageGrade = (grades) => {
        grades = grades.map(grade => parseInt(grade));
        let sumOfGrades = grades.reduce((a, b) => a + b, 0);
        return sumOfGrades / grades.length;
    }

    /**
     * Sets the state of showGrade.
     */
    const toggleGrades = () => {
        setShowGrades(!showGrades);
    }

    /**
     * Handles associating a tag to a student when the enter key is pressed.
     * 
     * @param {Event} event
     */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            let tagValue = event.target.value;

            if (tags.indexOf(tagValue) === -1) {
                setDisplayTagError(false);
                setTags(oldArray => [...oldArray, tagValue]);
                props.updateTags([...tags, tagValue], id);
                event.target.value = '';

            } else {
                setDisplayTagError(true);
            }
        }
    }

    let company = props.company;
    let email = props.email;
    let firstName = props.firstName;
    let grades = props.grades;
    let lastName = props.lastName;
    let pic = props.pic;
    let skill = props.skill;
    let id = props.id;
    let testNumber = 1;
    
    const [showGrades, setShowGrades] = useState(false);
    const [displayTagError, setDisplayTagError] = useState(false);
    const [tags, setTags] = useState(props.tags);

    return(
        <div className='student-container'>
            <img className='profile-picture' src={pic} alt='Student Profile' />
            <button className='display-grade-button' onClick={toggleGrades}>{showGrades ? '-' : '+'}</button>
            
            <div className='student-info'>
                <h1 className="student-name">{firstName.toUpperCase()} {lastName.toUpperCase()}</h1>
                <div className='secondary-info'>
                    <p>Email: {email}</p>
                    <p>Company: {company}</p>
                    <p>Skill: {skill}</p>
                    <p>Average: {getAverageGrade(grades)}%</p>
                    <ul style={{display: showGrades ? 'block' : 'none'}}>
                        {grades.map(grade => <li key={`test-${testNumber}-${id}`}>Test {testNumber++}: &nbsp;&nbsp;&nbsp;{grade}%</li>)}
                    </ul>
                    <div id={`tag-container-${id}`}>
                        {tags.map(tag => <div key={`${tag}-${id}`} className="tag">{tag}</div>)}
                    </div>
                    <input className='tag-input' placeholder='Add a tag' onKeyPress={handleKeyPress}/>
                    <p style={{color: "red", fontWeight: 800, display: displayTagError ? 'block' : 'none'}}>Tag already exists</p>
                </div>
            </div>
        </div>
    );
}

export default Student;