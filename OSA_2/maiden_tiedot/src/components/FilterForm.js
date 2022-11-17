
const FilterForm = (props) => {
    return (
      
        <div>
          Find countries <input
            value={props.newFilter}
            onChange={props.handleFilterChange}
          />
          </div>
  
      
    )
  
  }

  export default FilterForm