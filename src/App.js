import React, { useState, useEffect } from 'react';
import './App.css';
import Student from './component/Student';


function App() {
  /**
   * Updates the tags of a student with the associated id.
   * 
   * @param {String} tagValue 
   * @param {Int} id
   */
  const updateTags = (tagValue, id) => {
    let updatedList = listOfStudents.map(student => {
      if (student.id === id) {
        return { ...student, tags: tagValue };
      } else {
        return student;
      }
    });
    setListOfStudents(updatedList);
  }

  /**
   * Returns whether nameFilter is in student's full name.
   * 
   * @param {String} fullName 
   * @returns true if value of name filter value is in student's full name. false otherwise
   */
  const filterName = (fullName) => {
    return fullName.toUpperCase().includes(nameFilter.toUpperCase()) || nameFilter.trim() === '';
  }

  /**
   * Returns whether tagFilter is in the list of student's associated tags.
   * 
   * @param {Array} listOfTags 
   * @returns true if tagFilter is in list of student's tags. false otherwise
   */
  const filterTags = (listOfTags) => {
    if (listOfTags !== undefined) {
      for (let i = 0; i < listOfTags.length; i++) {
        if (listOfTags[i].includes(tagFilter)) {
          return true;
        }
      }
      return false;
    }
  }

  const [listOfStudents, setListOfStudents] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  /**
   * Get student info from endpoint and add the tags.
   */
  useEffect(() => {
    fetch('redacted')
      .then(response => response.json())
      .then(data => data.students.map(student => { return { ...student, tags: [] } }))
      .then(data => setListOfStudents(data));
  }, []);

  return (
    <div className="app-container">
      <input id="filter-name" type="text" placeholder="Search by name" onChange={event => setNameFilter(event.target.value)} />
      <input id="filter-tag" type="text" placeholder="Search by tag" onChange={event => setTagFilter(event.target.value)} />
      <div className="container">
        {listOfStudents
          .filter(student => filterName(`${student.firstName} ${student.lastName}`)).filter(student => filterTags(student.tags) || tagFilter.trim() === '')
          .map(student => <Student {...student} key={student.id} updateTags={updateTags} />)
        }
      </div>
    </div>
  );
}

export default App;
