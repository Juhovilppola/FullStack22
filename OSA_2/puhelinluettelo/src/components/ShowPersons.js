const ShowPersons = (person) => {
  console.log(person)
    return (
      <li>
        {person.person.name} {person.person.number} {person.button}
        

      </li>
    )
  
}
export default ShowPersons