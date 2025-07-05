import React, { useState, useEffect } from 'react'
export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');

    const addStudent = () => {
        if (name.trim()) {
            setStudents([...students, name]);
            setName('');
        }
    };

    const removeStudent = (index) => {
        const newList = students.filter((_, i) => i !== index);
        setStudents(newList);
    };

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={addStudent}>เพิ่ม</button>
            <ul>
                {students.map((s, i) => (
                    <li key={i}>
                        {s} <button onClick={() => removeStudent(i)}>ลบ</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
