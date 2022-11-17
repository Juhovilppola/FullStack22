const ShowCountries = (props) => {
    console.log(props)
    console.log(props.countries.length)
    
    if(props.countries.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(props.countries.length > 1 && props.countries.length < 10){
        return(
        <ul>
            {props.countries.map(country=>
            <OneToTenCountries key={country.name.common} country={country} setFilter={props.setFilter}/>
            )}
        </ul>
        )
    } else if(props.countries.length === 1){
        
          
         let array = []
         for(const i in props.countries[0].languages){
            array.push(props.countries[0].languages[i])
         }
         console.log(array)
         console.log(props.countries[0].flags.png)
        
        return(
        <div>
            <h2>{props.countries[0].name.common}</h2>
            <p>Capital: {props.countries[0].capital}</p>
            <p>Area: {props.countries[0].area}</p>
            <h3>Languages:</h3>
            <ul>
                {array.map(language=>
                    <GetLanguages key={language} language={language}/>
                    )}
            </ul>

           <img src={props.countries[0].flags.png}/>
        </div>
        )

    }
    return (
      <li>
        

      </li>
    )
  
}
const OneToTenCountries = (props) => {
    console.log(props)
    return(
        <li>
           {props.country.name.common} <button onClick={props.setFilter=props.country.name.common} text='show'/>
        </li>
    )
}
const GetLanguages = (language) => {
    console.log(language)
    return(
        <li>
            {language.language}
        </li>
    )
}
export default ShowCountries