const Course = ({ course }) => {

    const Header = ({ course }) => <h1>{course}</h1>
  
    const Total = ({ sum }) => {
  
      const total = sum.map(num => num.exercises).reduce((s, p) => s + p)
      return (
        <p>total of exercises {total}</p>
      )
    }
  
    const Part = ({ part }) =>
      <p>
        {part.name} {part.exercises}
      </p>
  
    const Content = ({ parts }) => {
      
      return (
        <li>
          <Part
            part={parts}
          />
  
        </li>
      )
    }
    console.log("course", course)
    return (
      <div>
        <Header course={course.name} />
        <ul>
          {course.parts.map(part =>
            <Content key={part.id} parts={part} />
          )}
        </ul>
        <Total sum={course.parts} />
      </div>
    )
  }

export default Course