import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {authentication} from './firebase'
import {RecaptchaVerifier ,signInWithPhoneNumber } from "firebase/auth";
import {useStateValue} from './StateProvider'
import "./App.css";
import "./login.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mobile,setMobile] = useState("");
  const [otp,setOtp] = useState();
  const [usr,setUser] = useState(0);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

const generateRecaptcha=()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      }, authentication);
}

  const requestOTP = (e)=>{
      e.preventDefault();
      if(mobile)
      {
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, mobile, appVerifier).then(confirmationResult=>{
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            // Error; SMS not sent
            console.log(error);
            // ...
        });
      }
  }

  const verifyOTP =(e)=>{
    let pass=otp;
    e.preventDefault();
    if(pass.length === 6)
    {
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(pass).then((result) => {
            // User signed in successfully.
           const user=result.user;
           console.log(user);
           setUser(user.uid);
            console.log(usr);
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
    }
  }

  return (
      <div>
   {!usr?(<div>
        <Router>
            <Routes>
                <Route path="/" element={<div className="wrapper fadeInDown">
                <h2 className="title">Login</h2>
                    <div id='formContent'>
                    <form onSubmit={requestOTP}>
                        <div id="sign-in-button"></div>
                        <input type="text" id="login" className="fadeIn second" name="number" placeholder="Mobile No." onChange={e=>setMobile(e.target.value)}/>
                        <input type="submit" className="fadeIn fourth" value="Send OTP"/>
                    </form>
                    <form onSubmit={verifyOTP}>
                    <input type="text" id="password" className="fadeIn third" name="otp" placeholder="OTP" onChange={e=>setOtp(e.target.value)}/>
                    <input type="submit" className="fadeIn fourth" value="Verify"/>
                    </form>
                    </div>
                </div>}/>
            </Routes>
        </Router>
    </div>):(<div key={usr}><Router>
            <Routes>
                <Route path="/" element={<div className="app"><div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
        
        {/* <Router>
         <Routes>
         <Route path="/cases" element={ */}
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          
          {/* <Route path="/cases" element={ */}
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />

          {/* <Route path="/deaths" element={ */}
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
          {/* </Routes>
        </Router> */}
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card></div>}/>
            </Routes>
        </Router> </div>)}
      </div>
    
  );
};

export default App;
