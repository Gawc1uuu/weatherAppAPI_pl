const form = document.querySelector("#weatherForm");
const city = document.querySelector('.cityName');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const humidity = document.querySelector('.humidity');
const date = document.querySelector('.date');
const icon = document.querySelector('.icon');

window.addEventListener('load', async (e) => {
    try{
    const cityName = 'Lisbon';
    // const apiID = '69020ee5934952d9bfbd838ef3f6b3f9'
    const config = {params: {q: cityName, appid:'69020ee5934952d9bfbd838ef3f6b3f9', units: 'metric',lang: 'pl' }};
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`,config);
    setValues(res);
    addIcon(res);
    form.elements.q.value='';
    }catch(e){
        console.log("ERROR!",e)
    }
})

form.addEventListener('submit', async (e) =>{
    try{
    e.preventDefault();
    icon.firstChild.remove();
    const cityName = form.elements.q.value;
    const config = {params: {q: cityName, appid:'69020ee5934952d9bfbd838ef3f6b3f9', units: 'metric',lang: 'pl' }};
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`,config);
    setValues(res);
    addIcon(res);
    form.elements.q.value='';
    }catch(e){
        console.log("ERROR!",e);
    }
})

const getDate = () =>{
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth()+1;
    if(day<10 && month<10){
        return `${year}-0${month}-0${day}`
    }else if(day<10){
        return `${year}-${month}-0${day}`;
    }else if(month<10){
        return `${year}-${month}-0${day}`;
    }else {
        return `${year}-${month}-${day}`;
    }
}

const setValues = (data) =>{
    city.innerText=data.data.name;
    temp.innerText=Math.floor(data.data.main.temp);
    desc.innerText=data.data.weather[0].description;
    humidity.innerText=data.data.main.humidity;
    date.innerText = getDate();
}

const addIcon = (res) =>{
    const newIcon = document.createElement('IMG');
    const iconCode=res.data.weather[0].icon;
    newIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.append(newIcon);    
}