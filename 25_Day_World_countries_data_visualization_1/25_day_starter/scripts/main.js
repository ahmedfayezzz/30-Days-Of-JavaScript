let searchCon=document.querySelector('.cards-list')
// "name", "capital", "languages", 
// "population", "flag", "currency"

//sort data by country population
document.querySelector('.subtitle').innerHTML=`Currently, we have ${countries.length} countries`
countries.sort((a,b)=>{
  let keyA=a.population,
    keyB=b.population;
  if(keyA<keyB)
    return -1
  if(keyA>keyB)
    return 1
  return 0
})
countries.reverse()
let allLangs=[]
let langCounts=[]
countries.forEach((country,i)=>allLangs.push(...country.languages))
allLangs.forEach((lang)=>{
  let isThere=false
  for(let a of langCounts){
    if(a.language===lang){
      isThere=true
      a.count++;
      break
    }
  }
  if(!isThere){
    langCounts.push({
      language:lang,
      count:1
    })
  }  
})

langCounts.sort((a,b)=>{
  let keyA=a.count,
  keyB=b.count;
  if(keyA<keyB)
  return -1
  if(keyA>keyB)
  return 1
  return 0
})
langCounts.reverse()

// functions that fill the data and appends it to DOM
fillDataPopulation=()=>{
  let totalPop=countries.reduce((prev,curr)=>prev+curr.population,0)
  document.querySelector('.world-pop').innerHTML=`World population is ${totalPop.toLocaleString()}`

  countries.forEach((country,i)=>{
    if(i>9){
      return
    }
    let li = document.createElement('li')//list item for name
    li.innerHTML=country.name
    
    document.querySelector('.names').appendChild(li)

    li = document.createElement('li')//list item for bar
    li.style.width=`${country.population/countries[0].population*100}%`
    document.querySelector('.bars').appendChild(li)

    li = document.createElement('li')//list item for numbers
    li.innerHTML=country.population.toLocaleString()
    document.querySelector('.numbers').appendChild(li)
  })
}
fillDataLangs=()=>{
  langCounts.forEach((lang,i)=>{
    if(i>9){
      return
    }
    let li = document.createElement('li')//list item for name
    li.innerHTML=lang.language
    
    document.querySelector('.names').appendChild(li)

    li = document.createElement('li')//list item for bar
    li.style.width=`${lang.count/langCounts[0].count*100}%`
    document.querySelector('.bars').appendChild(li)

    li = document.createElement('li')//list item for numbers
    li.innerHTML=lang.count
    document.querySelector('.numbers').appendChild(li)
  })
}
displayCountries=list=>
{
  list.forEach((country,i)=>{
    let li = document.createElement('li')
    li.className='country-card'
    searchCon.appendChild(li)

    let ul = document.createElement('ul')
    ul.className='country-card-ul'
    li.appendChild(ul)

    li=document.createElement('li')
    li.className='flag'
    ul.appendChild(li)
    let img=document.createElement('img')
    img.src=country.flag
    li.appendChild(img)

    li=document.createElement('li')
    li.className='name'
    li.innerHTML=country.name
    ul.appendChild(li)
    
    li=document.createElement('li')
    li.className='capital'
    li.innerHTML='Capital: '+country.capital
    ul.appendChild(li)

    li=document.createElement('li')
    li.className='language'
    li.innerHTML=`Languages: ${country.languages.join(', ')}`
    ul.appendChild(li)

    li=document.createElement('li')
    li.className='population'
    li.innerHTML='Population: '+country.population.toLocaleString()
    ul.appendChild(li)
  })

}
//handle button click 
handleClick=(e)=>{
  const uls = document.querySelectorAll('ul')
  document.querySelector('.world-pop').innerHTML=''
  uls.forEach((ul)=>ul.innerHTML='')
  if(e.className==='population'){
    document.querySelector('.graph-title').innerHTML="10 most populated countries in the world"
    fillDataPopulation()
  }
  else{
    
    document.querySelector('.graph-title').innerHTML="10 most spoken languages in the world"    
    isPulation=false
    isPulation=true
    fillDataLangs()
  }
}
const searchBar=document.querySelector('#search-bar')
searchBar.addEventListener('input',(e)=>{
  searchCon.innerHTML=''
  if(e.target.value!==''){
    let results = search(e.target.value)
    displayCountries(results)
  }
  else{
    displayCountries(countries)
  }
}) 
search=(value)=>{
  let results=[]
  countries.forEach((country,i)=>{
    if(country.name.toLowerCase().includes(value.toLowerCase())){
      results.push(country)
    }
  })
  return results;
}
displayCountries(countries)

handleSelect=()=>{
  const e=document.getElementById('sort')
  switch(e.value){
    case 'language':
      console.log('language')
      break
    case 'capital':
      console.log('capital')
      break
    case 'currency':
      console.log('currency')
      break
  }
  // console.log(e.selectedIndex)
}
handleSelect()
