const Header = ({name}) =>{
    return(
      <h1>{name}</h1>
    )
  }
  
  const Total = ({parts}) =>{
  
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
      <p><b>Total of {total} exercises</b></p>
    )
  }
  
  const Part = ({name, exercises}) =>{
    return(
      <li>{name} {exercises}</li>
    )
  }
  
  const Content = ({parts}) =>{
    return(
        <ul>
          {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        </ul>
    )
  }
  
  const Course = ({course}) =>{  
    return(
      <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course