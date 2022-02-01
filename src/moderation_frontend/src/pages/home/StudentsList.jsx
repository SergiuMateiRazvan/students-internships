import {Table} from 'react-bootstrap';

export const TableHeader = () => (
  <tr>
    <td>#</td>
    <td>Student mail</td>
    <td>Profanity description</td>
  </tr>
)

const Student = ({student, onClick, index}) => {
  const student_mail = student.student;
  return (
    <>
      {student?.descriptions?.map(description =>
        <tr onClick={() => onClick(student_mail, description)}>
          <td>{++index}</td>
          <td>{student_mail}</td>
          <td>{description}</td>
        </tr>,
      )}
    </>);
};

export const StudentsList = ({studentsList, onDeleteDescription}) => {
  let index = 0
  if (studentsList && studentsList.length){
    index = 0 - studentsList[0]?.descriptions?.length;
  }
  return (
    <Table variant={'dark'} bordered hover>
      <thead>
      <TableHeader/>
      </thead>
      <tbody>
      {studentsList && studentsList.map((student) =>
        <Student
          student={student}
          onClick={onDeleteDescription}
          index={index+=student?.descriptions?.length}
        />,
      )}
      </tbody>
    </Table>
  );
};
